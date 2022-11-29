from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import *
from management.models import *
from facilities.models import *
from entrylog.models import *

class StudentViewSet(viewsets.ModelViewSet):
    queryset = student_db.objects.all()
    serializer_class = StudentSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['roll_no']
    permission_classes = [AllowAny]

class PasswordViewSet(viewsets.ModelViewSet):
    queryset = password_db.objects.all()
    serializer_class = PasswordSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['roll_no']
    permission_classes = [AllowAny]

class WardenViewSet(viewsets.ModelViewSet):
    queryset = warden_db.objects.all()
    serializer_class = WardenSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['warden_id']

class HostelViewSet(viewsets.ModelViewSet):
    queryset = hostel_db.objects.all()
    serializer_class = HostelSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['hostel_name']

class EntryLogViewSet(viewsets.ModelViewSet):
    queryset = EntryLog.objects.all()
    serializer_class = EntryLogSerializers

class GuardDetailViewSet(viewsets.ModelViewSet):
    queryset = Guard_Detail.objects.all()
    serializer_class = GuardDetailSerializers

class DefaulterViewSet(viewsets.ModelViewSet):
    queryset = Defaulters.objects.all()
    serializer_class = DefaulterSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student']

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = complaints_db.objects.all()
    serializer_class = ComplaintSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['roll_no']

class LeaveApplicationViewSet(viewsets.ModelViewSet):
    queryset = leave_application_db.objects.all()
    serializer_class = LeaveApplicationSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['roll_no']

# Create your views here.