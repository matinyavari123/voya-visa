from rest_framework import serializers

from .models import ConsultRequest, Country, Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "title", "slug", "short", "intro", "duration")


class ConsultRequestSerializer(serializers.ModelSerializer):
    code = serializers.CharField(read_only=True)
    service = serializers.SlugRelatedField(
        slug_field="slug", queryset=Service.objects.all(), required=False, allow_null=True
    )
    service_title = serializers.CharField(source="service.title", read_only=True)
    country = serializers.SlugRelatedField(
        slug_field="slug", queryset=Country.objects.all(), required=False, allow_null=True
    )
    country_name = serializers.CharField(source="country.name", read_only=True)
    status_label = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = ConsultRequest
        fields = (
            "id",
            "code",
            "full_name",
            "phone",
            "service",
            "service_title",
            "country",
            "country_name",
            "message",
            "status",
            "status_label",
            "step",
            "agent_note",
            "created_at",
        )
        read_only_fields = ("status", "step", "agent_note", "created_at")