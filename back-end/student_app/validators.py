from email_validator import validate_email, EmailNotValidError
from django.core.exceptions import ValidationError

def validate_student_email(value):
    try:
        # Validate.
        validate_email(value, check_deliverability=True)
    except EmailNotValidError as e:
        # Email is not valid, raise error message.
        raise ValidationError(str(e))