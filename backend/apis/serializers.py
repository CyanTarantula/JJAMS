from rest_framework import serializers
from management.models import *
from entrylog.models import *
from facilities.models import *

class StudentSerializers(serializers.ModelSerializer):
    class Meta:
        model = student_db
        fields = '__all__'
    
    def create(self, validated_data):
        """
        Create and return a new `student_db` instance, given the validated data.
        """
        try:
            hostel_fk = hostel_db.objects.get(hostel_name=validated_data['hostel_name'])
            validated_data['hostel_name'] = hostel_fk
            student_instance = student_db.objects.create(**validated_data)
            return student_instance
        except:
            raise serializers.ValidationError("Hostel does not exist")

class PasswordSerializers(serializers.ModelSerializer):
    class Meta:
        model = password_db
        fields = '__all__'
    
    def create(self, validated_data):
        """
        Create and return a new `student_db` instance, given the validated data.
        """
        print(validated_data)
        try:
            roll_no_fk = student_db.objects.get(roll_no=validated_data['roll_no'])
            validated_data['roll_no'] = roll_no_fk
            pswd_instance = password_db.objects.create(**validated_data)
            return pswd_instance
        except:
            raise serializers.ValidationError("Student Instance does not exist")

class WardenSerializers(serializers.ModelSerializer):
    class Meta:
        model = warden_db
        fields = '__all__'

class HostelSerializers(serializers.ModelSerializer):
    class Meta:
        model = hostel_db
        fields = ['hostel_name', 'no_of_rooms', 'empty_rooms', 'caretaker_contact', 'warden_id']

class EntryLogSerializers(serializers.ModelSerializer):
    class Meta:
        model = EntryLog
        fields = '__all__'
    
    def create(self, validated_data):
        """
        Create and return a new `EntryLog` instance, given the validated data.
        """
        print(validated_data)
        try:
            roll_no_fk = student_db.objects.get(roll_no=validated_data['roll_no'])
            validated_data['roll_no'] = roll_no_fk
            # guard_id_fk = Guard_Detail.objects.get(Guard_Id=validated_data['guard_id'])
            # validated_data['guard_id'] = guard_id_fk
            return EntryLog.objects.create(**validated_data)
        except Exception as e:
            print(e.__str__())
            raise serializers.ValidationError("Error Occured")

class GuardDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = Guard_Detail
        fields = '__all__'
    
    def create(self, validated_data):
        """
        Create and return a new `student_db` instance, given the validated data.
        """
        try:
            return Guard_Detail.objects.create(**validated_data)
        except:
            raise serializers.ValidationError("Error Occured !!")

class DefaulterSerializers(serializers.ModelSerializer):
    class Meta:
        model = Defaulters
        fields = '__all__'

class ComplaintSerializers(serializers.ModelSerializer):
    class Meta:
        model = complaints_db
        fields = '__all__'
    
    def create(self, validated_data):
        """
        Create and return a new `complaints_db` instance, given the validated data.
        """
        print(validated_data)
        try:
            roll_no_fk = student_db.objects.get(roll_no=validated_data['roll_no'])
            validated_data['roll_no'] = roll_no_fk
            return complaints_db.objects.create(**validated_data)
        except:
            raise serializers.ValidationError("Invalid Roll Number")
    

class LeaveApplicationSerializers(serializers.ModelSerializer):
    class Meta:
        model = leave_application_db
        fields = '__all__'
    
    def create(self, validated_data):
        """
        Create and return a new `student_db` instance, given the validated data.
        """
        print(validated_data)
        try:
            roll_no_fk = student_db.objects.get(roll_no=validated_data['roll_no'])
            validated_data['roll_no'] = roll_no_fk
            return leave_application_db.objects.create(**validated_data)
        except ValueError:
            raise serializers.ValidationError("Start date cant be before end date")
        except:
            raise serializers.ValidationError("Invalid Roll Number")
