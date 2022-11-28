from django.urls import path,include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register("students",StudentViewSet)

router.register("login/password",PasswordViewSet)

router.register("wardens",WardenViewSet)

router.register("hostels",HostelViewSet)

router.register("entrylog",EntryLogViewSet)

router.register("guards",GuardDetailViewSet)

router.register("defulters",DefaulterViewSet)

router.register("complaints",ComplaintViewSet)

router.register("leave-applications",LeaveApplicationViewSet)


urlpatterns=[
    path(r'',include(router.urls)), 
]