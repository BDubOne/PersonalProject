from django.utils import timezone
from django.db import IntegrityError

from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token

from .serializers import Student
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
from .utilities import HttpOnlyTokenAuthentication
from datetime import datetime, timedelta


class SignUp(APIView):
    def post(self, request):
        try:
            request.data["username"] = request.data["email"]
            student = Student.objects.create_user(**request.data)

            # Create a token and set it in an HTTP-only cookie
            token = Token.objects.create(user=student)
            life_time = datetime.now() + timedelta(days=7)
            format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
            response = Response({"student": student.email}, status=HTTP_201_CREATED)
            response.set_cookie(key="token", value=token.key, httponly=True, secure=True, samesite="Lax", expires=format_life_time)

            return response

        except IntegrityError:
            return Response("User with this email already exists", status=HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e.detail, status=HTTP_400_BAD_REQUEST)

class LogIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not all([email, password]):
            return Response("Both email and password are required", status=HTTP_400_BAD_REQUEST)

        student = authenticate(username=email, password=password)

        if student:
            token, created = Token.objects.get_or_create(user=student)
            life_time = datetime.now() + timedelta(days=7)
            format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
            response = Response({"student": {"email": student.email}})
            response.set_cookie(key="token", value=token.key, httponly=True, secure=True, samesite="Lax", expires=format_life_time)
            return response
        else:
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

class LogOut(APIView):
    authentication_classes = [HttpOnlyTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
   
    def post(self, request):
        request.user.auth_token.delete()
        response = Response(status=HTTP_204_NO_CONTENT)
        response.delete_cookie("token")
        return response

class Info(APIView):
    authentication_classes = [HttpOnlyTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.student.email})
    
class MasterSignUp(APIView):
    def post(self, request):
        try:
            request.data["username"] = request.data["email"]
            master_student = Student.objects.create_user(**request.data)
            master_student.is_staff = True
            master_student.is_superuser = True
            master_student.save()
            token = Token.objects.create(user=master_student)
            return Response({"master_student": master_student.email, "token": token.key}, status=HTTP_201_CREATED)
        except IntegrityError:
            return Response("Master student with this email already exists", status=HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e.detail, status=HTTP_400_BAD_REQUEST)
