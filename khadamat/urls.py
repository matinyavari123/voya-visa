from django.urls import path

from .views import ConsultRequestListCreateView, ServiceListView

urlpatterns = [
    path("services/", ServiceListView.as_view(), name="service-list"),
    path("requests/", ConsultRequestListCreateView.as_view(), name="request-list"),
]