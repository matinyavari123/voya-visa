from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

# Create your models here.

def phone_validator(value):
    if not value.isdigit():
        raise ValidationError("شماره موبایل فقط باید رقم باشد.")
    if not value.startswith("09"):
        raise ValidationError("شماره موبایل باید با ۰۹ شروع شود.")
    if len(value) != 11:
        raise ValidationError("شماره موبایل باید ۱۱ رقم باشد.")

class UserManager(BaseUserManager):
    
      def create_user(self, phone, password=None, **kwargs):
            if not phone:
                  raise ValueError('لطفا شماره را درست وارد کنید')
            
            user = self.model(phone=phone, **kwargs)
            user.set_password(password)
            user.save(using=self._db)
            return user



      def create_superuser(self, phone, password=None, **kwargs):
            kwargs["is_staff"] = True
            kwargs["is_superuser"] = True
            return self.create_user(phone, password, **kwargs)
      


class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(
        max_length=11, unique=True, validators=[phone_validator]
    )
    full_name = models.CharField( max_length=100, blank=True)
    email = models.EmailField( blank=True)
    is_active = models.BooleanField( default=True)
    is_staff = models.BooleanField( default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "phone"   
    REQUIRED_FIELDS = []        


def __str__(self):
        return f"{self.full_name or 'بدون نام'} ({self.phone})"