from django.db import models

# Create your models here.
from django.db import models


class Service(models.Model):
    title = models.CharField("عنوان", max_length=100)
    slug = models.SlugField("نشانی انگلیسی", max_length=50, unique=True)
    short = models.CharField("توضیح کوتاه", max_length=200, blank=True)
    intro = models.TextField("توضیح کامل", blank=True)
    duration = models.CharField("زمان تقریبی صدور", max_length=100, blank=True)
    is_active = models.BooleanField("فعال", default=True)

    class Meta:
        verbose_name = "خدمت"
        verbose_name_plural = "خدمات"

    def __str__(self):
        return self.title


class Country(models.Model):
    name = models.CharField("نام کشور", max_length=60)
    name_en = models.CharField("نام انگلیسی", max_length=60)
    slug = models.SlugField("نشانی انگلیسی", max_length=60, unique=True)
    summary = models.TextField("توضیح", blank=True)
    image = models.ImageField("عکس", upload_to="countries/", blank=True)
    services = models.ManyToManyField(
        Service, verbose_name="نوع ویزاها", related_name="countries", blank=True
    )
    featured = models.BooleanField("نمایش در صفحه اصلی", default=False)
    is_active = models.BooleanField("فعال", default=True)

    class Meta:
        verbose_name = "کشور"
        verbose_name_plural = "کشورها"

    def __str__(self):
        return self.name
    

class Tour(models.Model):
    title = models.CharField("نام تور", max_length=150)
    country = models.ForeignKey(
        Country,
        verbose_name="کشور",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tours",
    )
    route = models.CharField("مسیر", max_length=200, blank=True)
    nights = models.PositiveIntegerField("تعداد شب", null=True, blank=True)
    departure = models.DateField("تاریخ حرکت", null=True, blank=True)
    price = models.PositiveBigIntegerField("قیمت به تومان", null=True, blank=True)
    is_active = models.BooleanField("فعال", default=True)

    class Meta:
        verbose_name = "تور"
        verbose_name_plural = "تورها"

    def __str__(self):
        return self.title    
    
class ConsultRequest(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = "submitted", "ثبت شد"
        DOCUMENTS = "documents", "بررسی مدارک"
        APPOINTMENT = "appointment", "وقت سفارت"
        ISSUED = "issued", "ویزا صادر شد"
        REJECTED = "rejected", "رد شد"

    user = models.ForeignKey(
        "account.User",
        verbose_name="کاربر",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="requests",
    )
    full_name = models.CharField("نام و نام خانوادگی", max_length=100)
    phone = models.CharField("شماره موبایل", max_length=11)
    service = models.ForeignKey(
        Service,
        verbose_name="نوع درخواست",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="requests",
    )
    country = models.ForeignKey(
        Country,
        verbose_name="کشور مقصد",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="requests",
    )
    message = models.TextField("توضیحات کاربر", blank=True)
    status = models.CharField(
        "وضعیت", max_length=20, choices=Status.choices, default=Status.SUBMITTED
    )
    step = models.PositiveSmallIntegerField("قدم از چهار", default=1)
    agent_note = models.TextField("یادداشت کارشناس", blank=True)
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)
    updated_at = models.DateTimeField("آخرین تغییر", auto_now=True)

    class Meta:
        verbose_name = "درخواست مشاوره"
        verbose_name_plural = "درخواست‌های مشاوره"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.full_name} - {self.phone}"

    @property
    def code(self):
        return f"VV-{self.pk:05d}"