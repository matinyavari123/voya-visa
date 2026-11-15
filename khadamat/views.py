

# Create your views here.
from rest_framework import generics, permissions

from .models import ConsultRequest, Service
from .serializers import ConsultRequestSerializer, ServiceSerializer


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer


class ConsultRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = ConsultRequestSerializer

    def get_permissions(self):
        # هر کسی می‌تواند درخواست بفرستد، ولی فقط کاربر واردشده لیست را می‌بیند
        if self.request.method == "POST":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        return ConsultRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)