from django.contrib import admin

from .models import Country, Service, Tour

from .models import ConsultRequest, Country, Service, Tour

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_active")


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name", "name_en", "featured", "is_active")
    search_fields = ("name", "name_en")
    filter_horizontal = ("services",)


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ("title", "country", "departure", "price", "is_active")
    list_filter = ("is_active", "country")
    search_fields = ("title", "route")

@admin.register(ConsultRequest)
class ConsultRequestAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone", "service", "country", "status", "created_at")
    list_filter = ("status", "service", "country")
    search_fields = ("full_name", "phone")
    readonly_fields = ("created_at", "updated_at")