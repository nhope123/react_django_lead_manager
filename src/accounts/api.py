from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from leads.serializers import LeadSerializer

from django.contrib.auth.models import User
from leads.models import  Lead

# Register Api 
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login Api
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User Api
class UserAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer
    lookup_field = ''

    def get_queryset(self):
        return self.request.user.leads.all()

    def get(self,request):
        return Response({
            'user': UserSerializer(self.request.user,context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(self.request.user)[1],
            'leads': LeadSerializer(self.get_queryset(), many=True).data
        })
