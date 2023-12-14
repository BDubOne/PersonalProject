from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from .serializers import Student, StudentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django_ratelimit.decorators import ratelimit
from django_ratelimit.core import get_usage, is_ratelimited

# Create your views here.
class SignUp(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        student = Student.objects.create_user(**request.data)
        token = Token.objects.create(user=student)
        print(token)

        return Response({"student": student.email, "token": token.key}, status=HTTP_201_CREATED)


class LogIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            student = Student.objects.get(email=email)
            student.reset_attempts_if_needed()
            if student.lockout_until and timezone.now() < student.lockout_until:
                return Response("Account is temporarily locked.", status=HTTP_403_FORBIDDEN)

            if authenticate(username=email, password=password):
                token, created = Token.objects.get_or_create(user=student)
                student.failed_login_attempts = 0  # Reset on successful login
                student.save()
                return Response({"token": token.key, "student": student.email})
            else:
                student.failed_login_attempts += 1
                if student.failed_login_attempts >= 3:  # Define MAX_ATTEMPTS
                    student.lock_account()  # Lock the account
                else:
                    student.save()
                return Response("No student matching credentials", status=HTTP_404_NOT_FOUND)
        except Student.DoesNotExist:
            return Response("No student matching credentials", status=HTTP_404_NOT_FOUND)

class LogOut(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    @ratelimit(key='user', method='POST', rate='5/m')
    @ratelimit(key='user', method='POST', rate='30/h')
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})
    
class MasterSignUp(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        master_student = Student.objects.create_user(**request.data)
        master_student.is_staff = True
        master_student.is_superuser = True
        master_student.save()
        token = Token.objects.create(user=master_student)
        return Response(
            {"master_student": master_student.email, "token": token.key}, status=HTTP_201_CREATED
        )