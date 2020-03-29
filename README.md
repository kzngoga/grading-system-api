# Grading System API

## INSTALLATION

### Installing Dependencies

Run
`npm i`

### .env
Create a .env file in the root directory and paste in this

```
MONGO_URI = 
JWT_SECRET=
SMTP_HOST=
SMTP_PORT=
SENDGRID_USER=
SENDGRID_PASS=
SPNAME=
SPPASS=
GRADING_WEB=
```

## Routes List

### User
- [Get All Users](#1-get-all-users-get-request)
- [Add User](#2-add-user-post-request)
- [Log In](#3-log-in-post-request)
- [Change Password](#4-change-password-patch-request)
- [Update User](#5-update-user-patch-request)
- [Deactivate User](#6-deactivate-user-patch-request)
- [Activate User](#7-activate-user-patch-request)

### Search
- [Search User](#8-search-get-request)

### Department
- [Get All Departments](#9-get-departments-get-request)
- [Add Department](#10-add-department-post-request)
- [Update Department](#11-update-department-patch-request)
- [Deactivate Department](#12-deactivate-department-patch-request)
- [Activate Department](#13-activate-department-patch-request)

### Teacher
- [Add Teacher](#14-add-teacher-post-request)
- [Login Teacher](#15-login-teacher-post-request)
- [Get All Teachers](#16-get-all-teachers-get-request) 
- [Get Single Teacher](#17-get-single-teacher-get-request)
- [Update Teacher](#18-update-teacher-patch-request)
- [Deactivate Teacher](#19-deactivate-teacher-patch-request)
- [Activate Teacher](#20-activate-teacher-patch-request)

### Course
- [Add Course](#21-add-course-post-request)
- [Get All Courses](#22-get-all-courses-get-request)
- [Get Single Course](#23-get-single-course-get-request)
- [Update Course](#24-update-course-patch-request)
- [Deactivate Course](#25-deactivate-course-patch-request)
- [Activate Course](#26-activate-course-patch-request)

### Student
- [Add Student](#27-add-student-post-request)
- [Get All Students](#28-get-all-students-get-request)
- [Get Single Student](#29-get-single-student-get-request)
- [Update Student](#30-update-student-patch-request)
- [Deactivate Student](#31-deactivate-student-patch-request)

### Marks
- [Add Marks](#32-add-marks-post-request)
- [Get Marks](#33-get-marks-get-request)

## All Routes

### 1. Get All Users: GET Request

Endpoint:

```
/api/v1/user
```

Response:
```json
{
    "status": 200,
    "message": "Users retrieved",
    "data": [
        {
            "status": "ON",
            "_id": "5e70f8db6b740b10b448d55b",
            "firstname": "Kenny",
            "lastname": "Ruzindana",
            "gender": "M",
            "email": "kennyruzindana10@gmail.com",
            "address": "Gikondo",
            "role": "Admin",
            "mobileNo": "0780199446"
        },
        {
            "status": "ON",
            "_id": "5e7104d050010e198064ac59",
            "firstname": "Jovite",
            "lastname": "Ngoga Kwizera",
            "gender": "M",
            "email": "kzngoga19@gmail.com",
            "address": "Kamonyi",
            "role": "DOS",
            "mobileNo": "0782815204"
        }
    ]
}
```

### 2. Add User: POST Request

Endpoint:
```
/api/v1/user/new
```

Body:
```json
{
	"firstname": "David",
	"lastname": "Mugisha",
	"gender": "M",
	"email": "mugidavi345274950@gmail.com",
	"address": "Gasabo",
	"role": "DOS",
	"mobileNo": "078000000"
}
```

Response:
```json
{
    "status": 201,
    "message": "Registered successfully",
    "data": {
        "status": "ON",
        "_id": "5e728acb10128f37443262ec",
        "firstname": "David",
        "lastname": "Mugisha",
        "gender": "M",
        "email": "mugidavi345274950@gmail.com",
        "address": "Gasabo",
        "role": "DOS",
        "mobileNo": "078000000"
    }
}
```

### 3. Log In: POST Request

Endpoint:
```
/api/v1/user/login
```

Body:
```json
{
	"email": "kennyruzindana10@gmail.com",
	"password": "ucaito" 
}
```

Response:
```json
{
    "status": 200,
    "message": "Logged in successfully",
    "data": {
        "status": "ON",
        "_id": "5e70f8db6b740b10b448d55b",
        "firstname": "Kenny",
        "lastname": "Ruzindana",
        "gender": "M",
        "email": "kennyruzindana10@gmail.com",
        "address": "Gikondo",
        "role": "Admin",
        "mobileNo": "0780199446",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtlbm55cnV6aW5kYW5hMTBAZ21haWwuY29tIiwiaWQiOiI1ZTcwZjhkYjZiNzQwYjEwYjQ0OGQ1NWIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1ODQ1NjUxMjZ9.6GKPvwKZLD6WauTq0A9oHWnORaHvcpa43bCGSTX-FpY"
    }
}
```

### 4. Change Password: PATCH Request

Endpoint:
```
/api/v1/user/change-password
```

Body:
```json
{
	"oldPassword": "castillo",
	"newPassword": "zonda250"
}
```

Response:
```json
{
    "status": 200,
    "message": "Password Changed Successfully",
    "data": {
        "status": "ON",
        "_id": "5e7104d050010e198064ac59",
        "firstname": "Jovite",
        "lastname": "Ngoga Kwizera",
        "gender": "M",
        "email": "kzngoga19@gmail.com",
        "address": "Kamonyi",
        "role": "DOS",
        "mobileNo": "0782815204"
    }
}
```

### 5. Update User: PATCH Request

Endpoint:
```
/api/v1/user/update
```

Body:
```json
{
	"address": "Gikondo"
}
```

Response:
```json
{
    "status": 200,
    "message": "Profile Updated Successfully",
    "data": {
        "status": "ON",
        "_id": "5e70f8db6b740b10b448d55b",
        "firstname": "Kenny",
        "lastname": "Ruzindana",
        "gender": "M",
        "email": "kennyruzindana10@gmail.com",
        "address": "Gikondo",
        "role": "Admin",
        "mobileNo": "0780000000"
    }
}
```

### 6. Deactivate User: PATCH Request

Endpoint:
```
/api/v1/user/deactivate
```
Body:
```json
{
	"users": "5e73a20731e49931e0199868"
}
```

Response:
```json
{
    "status": 200,
    "message": "User Deactivated",
    "data": {
        "status": "OFF",
        "_id": "5e73a20731e49931e0199868",
        "firstname": "David",
        "lastname": "Mugisha",
        "gender": "M",
        "email": "kennylazer10@gmail.com",
        "address": "Gasabo",
        "role": "DOS",
        "mobileNo": "078000000"
    }
}
```

### 7. Activate User: PATCH Request

Endpoint:
```
/api/v1/user/activate
```
Body:
```json
{
	"users": "5e73a20731e49931e0199868"
}
```

Response:
```json
{
    "status": 200,
    "message": "User Activated",
    "data": {
        "status": "ON",
        "_id": "5e73a20731e49931e0199868",
        "firstname": "David",
        "lastname": "Mugisha",
        "gender": "M",
        "email": "kennylazer10@gmail.com",
        "address": "Gasabo",
        "role": "DOS",
        "mobileNo": "078000000"
    }
}
```

### 8. Search: GET Request

End Point:
```
/api/v1/search/users/?[parameters]
```
Parameters:
- `q` : the payload to search by.
- `limit` : number of records to query
- `page` : page number

*Example search query: `/api/v1/search/users?q=kwi&page=1&limit=10`*

Response:
```json
{
    "status": 200,
    "message": "Results retrieved",
    "data": [
        {
            "status": "ON",
            "_id": "5e7104d050010e198064ac59",
            "firstname": "Jovite",
            "lastname": "Ngoga Kwizera",
            "gender": "M",
            "email": "kzngoga19@gmail.com",
            "address": "Kamonyi",
            "role": "DOS",
            "mobileNo": "0780000000"
        }
    ]
}
```

### 9. Get Departments: GET Request

End Point
```
/api/v1/department
```

Response:
```json
{
    "status": 200,
    "message": "Departments retrieved",
    "data": [
        {
            "_id": "5e73e2aa5aaaaf0f4013e9fb",
            "name": "Graphic Design"
        },
        {
            "_id": "5e73e34fb400e72344a5cf04",
            "name": "Software"
        }
    ]
}
```

### 10. Add Department: POST Request

End Point
```
/api/v1/department/new
```

Body:
```json
{
	"name": "Software"
}
```

Response:
```json
{
    "status": 201,
    "message": "Registered Successfully",
    "data": {
        "_id": "5e73e34fb400e72344a5cf04",
        "name": "Software"
    }
}
```

### 11. Update Department: PATCH Request

End Point
```
/api/v1/department/update
```

Body:
```json
{
	"department": "5e73e34fb400e72344a5cf04",
	"name": "Software Engineering"
}
```

Response:
```json
{
    "status": 200,
    "message": "Department Updated",
    "data": {
        "_id": "5e73e34fb400e72344a5cf04",
        "name": "Software Engineering"
    }
}
```

### 12. Deactivate Department: PATCH Request

End Point
```
/api/v1/department/deactivate
```

Body:
```json
{
	"department": "5e73e2aa5aaaaf0f4013e9fb"
}
```

Response:
```json
{
    "status": 200,
    "message": "Department Deactivated",
    "data": {
        "status": "OFF",
        "_id": "5e73e2aa5aaaaf0f4013e9fb",
        "name": "Graphic Design"
    }
}
```

### 13. Activate Department: PATCH Request

End Point
```
/api/v1/department/activate
```

Body:
```json
{
	"department": "5e73e2aa5aaaaf0f4013e9fb"
}
```

Response:
```json
{
    "status": 200,
    "message": "Department activated",
    "data": {
        "status": "ON",
        "_id": "5e73e2aa5aaaaf0f4013e9fb",
        "name": "Graphic Design"
    }
}
```

### 14. Add Teacher: POST Request

End Point
```
/api/v1/teacher/new
```

Body:
```json
{
	"firstname": "Jean Napoleon",
	"lastname": "Ndakaza",
	"email": "urrte37489@gmail.com",
	"gender": "F",
	"address": "Nyarugenge",
	"mobileNo": "+250780000000",
	"department": "5e73e2aa5aaaaf0f4013e9fb"
}
```

Response:
```json
{
    "status": 201,
    "message": "Registered successfully",
    "data": {
        "status": "ON",
        "_id": "5e78f2e106dd303f00cfa73b",
        "firstname": "Jean Napoleon",
        "lastname": "Ndakaza",
        "email": "urrte37489@gmail.com",
        "gender": "F",
        "address": "Nyarugenge",
        "mobileNo": "+250780000000",
        "department": "5e73e2aa5aaaaf0f4013e9fb"
    }
}
```

### 15. Login Teacher: POST Request

End Point
```
/api/v1/teacher/login
```

Body: 
```json
{
	"email": "olivauw@gmail.com",
	"password": "dkdshn"
}
```

Response:
```json
{
    "status": 200,
    "message": "Logged In Successfully",
    "data": {
        "status": "ON",
        "_id": "5e78f8e87cf9250b608401c8",
        "firstname": "Oliva",
        "lastname": "Uwera",
        "email": "olivauw@gmail.com",
        "gender": "F",
        "address": "Nyarugenge",
        "mobileNo": "+250780000000",
        "department": "5e73e2aa5aaaaf0f4013e9fb",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtlbm55cnV6aW5kYW5hMTBAZ21haWwuY29tIiwiaWQiOiI1ZTc4ZjhlODdjZjkyNTBiNjA4NDAxYzgiLCJzdGF0dXMiOiJPTiIsImlhdCI6MTU4NDk4NjU3OX0.EB-LVOgt34qQpa-z-ww01FzSTw4JZs3XQCKJsRR6cUw"
    }
}
```

### 16. Get All Teachers: GET Request

End Point:
```
/api/v1/teacher
```

Response:
```json
{
    "status": 200,
    "message": "Teachers Retrieved",
    "data": [
        {
            "status": "ON",
            "_id": "5e7748c3ab1db61ebc9e4afa",
            "firstname": "Alphonse",
            "lastname": "Mbarushimana",
            "email": "dhdhdh@gmail.com",
            "gender": "F",
            "address": "Nyarugenge",
            "mobileNo": "+250780000000",
            "department": "5e73e34fb400e72344a5cf04"
        },
        {
            "status": "ON",
            "_id": "5e78f8e87cf9250b608401c8",
            "firstname": "Oliva",
            "lastname": "Uwera",
            "email": "iirirri@gmail.com",
            "gender": "F",
            "address": "Nyarugenge",
            "mobileNo": "+250780000000",
            "department": "5e73e2aa5aaaaf0f4013e9fb"
        }
    ]
}
```

### 17. Get single Teacher: GET Request

End Point
```
/api/v1/teacher/:id
```

Response
```json
{
    "status": 200,
    "message": "Teacher Found",
    "data": {
        "status": "ON",
        "_id": "5e78f8e87cf9250b608401c8",
        "firstname": "Oliva",
        "lastname": "Uwera",
        "email": "olivauw@gmail.com",
        "gender": "F",
        "address": "Nyarugenge",
        "mobileNo": "+250780000000",
        "department": "5e73e2aa5aaaaf0f4013e9fb"
    }
}
```

### 18. Update Teacher: PATCH Request

Endpoint
```
/api/v1/teacher/update
```

Body:
```json
{
	"teacher": "5e7748c3ab1db61ebc9e4afa",
	"firstname": "Alphonse",
	"lastname": "Mbarushimana",
	"department": "5e73e34fb400e72344a5cf04"
}
```

Response:
```json
{
    "status": 200,
    "message": "Teacher Updated",
    "data": {
        "status": "ON",
        "_id": "5e7748c3ab1db61ebc9e4afa",
        "firstname": "Alphonse",
        "lastname": "Mbarushimana",
        "email": "mbar9@gmail.com",
        "gender": "F",
        "address": "Nyarugenge",
        "mobileNo": "+250780000000",
        "department": "5e73e34fb400e72344a5cf04"
    }
}
```

### 19. Deactivate Teacher: PATCH Request

End Point:
```
/api/v1/teacher/deactivate
```

Body:
```json
{
	"teacher": "5e7748c3ab1db61ebc9e4afa"
}
```

Response:
```json
{
    "status": 200,
    "message": "Teacher Deactivated",
    "data": {
        "status": "OFF",
        "_id": "5e7748c3ab1db61ebc9e4afa",
        "firstname": "Alphonse",
        "lastname": "Mbarushimana",
        "email": "mbar9@gmail.com",
        "gender": "F",
        "address": "Nyarugenge",
        "mobileNo": "+250780000000",
        "department": "5e73e34fb400e72344a5cf04"
    }
}
```

### 20. Activate Teacher: PATCH Request

End Point
```
/api/v1/teacher/activate
```

Body:
```json
{
	"teacher": "5e7748c3ab1db61ebc9e4afa"
}
```

Response:
```json
{
    "status": 200,
    "message": "Teacher Activated",
    "data": {
        "status": "ON",
        "_id": "5e7748c3ab1db61ebc9e4afa",
        "firstname": "Alphonse",
        "lastname": "Mbarushimana",
        "email": "kzngoga19@gmail.com",
        "gender": "F",
        "address": "Nyarugenge",
        "mobileNo": "+250780000000",
        "department": "5e73e34fb400e72344a5cf04"
    }
}
```

### 21. Add Course: POST Request

End Point
```
/api/v1/course/new
```

Body: 
```json
{
	"name": "Photoshop",
	"totalMarks": "50",
	"department": "5e73e2aa5aaaaf0f4013e9fb"
}
```

Response: 
```json
{
    "status": 201,
    "message": "Registered Successfully",
    "data": {
        "status": "ON",
        "_id": "5e7a5983546c2b2d6c804acf",
        "name": "Photoshop",
        "totalMarks": "50",
        "department": "5e73e2aa5aaaaf0f4013e9fb"
    }
}
```

### 22. Get All Courses: GET Request

End Point
```
/api/v1/course
```

Response:
```json
{
    "status": 200,
    "message": "Courses Retrieved",
    "data": [
        {
            "status": "ON",
            "_id": "5e7a58d39fa95213d86c2aba",
            "name": "Algorithm",
            "totalMarks": "100",
            "department": "5e73e34fb400e72344a5cf04"
        },
        {
            "status": "ON",
            "_id": "5e7a5983546c2b2d6c804acf",
            "name": "Photoshop",
            "totalMarks": "50",
            "department": "5e73e2aa5aaaaf0f4013e9fb"
        }
    ]
}
```

### 23. Get Single Course: GET Request

End Point
```
/api/v1/course/:id
```

Response
```json
{
    "status": 200,
    "message": "Course Found",
    "data": {
        "status": "ON",
        "_id": "5e7a58d39fa95213d86c2aba",
        "name": "Algorithm",
        "totalMarks": "100",
        "department": "5e73e34fb400e72344a5cf04"
    }
}
```

### 24. Update Course: PATCH Request

End Point
```
/api/v1/course/update
```

Body
```json
{
	"course": "5e7a5983546c2b2d6c804acf",
	"totalMarks": "70"
}
```

Response
```json
{
    "status": 200,
    "message": "Course Updated",
    "data": {
        "status": "ON",
        "_id": "5e7a5983546c2b2d6c804acf",
        "name": "Photoshop",
        "totalMarks": "70",
        "department": "5e73e2aa5aaaaf0f4013e9fb"
    }
}
```

### 25. Deactivate Course: PATCH Request

End Point
```
/api/v1/course/deactivate
```

Body: 
```json
{
	"course": "5e7a5983546c2b2d6c804acf"
}
```

Response:
```json
{
    "status": 200,
    "message": "Course Deactivated",
    "data": {
        "status": "OFF",
        "_id": "5e7a5983546c2b2d6c804acf",
        "name": "Photoshop",
        "totalMarks": "70",
        "department": "5e73e2aa5aaaaf0f4013e9fb"
    }
}
```

### 26. Activate Course: PATCH Request

End Point
```
/api/v1/course/activate
```

Body: 
```json
{
	"course": "5e7a5983546c2b2d6c804acf"
}
```

Response:
```json
{
    "status": 200,
    "message": "Course Activated",
    "data": {
        "status": "ON",
        "_id": "5e7a5983546c2b2d6c804acf",
        "name": "Photoshop",
        "totalMarks": "70",
        "department": "5e73e2aa5aaaaf0f4013e9fb"
    }
}
```

### 27. Add Student: POST Request
End Point
```
/api/v1/student/new
```
Body:
```json
{
	"firstname": "Kenny",
	"lastname": "Lazer",
	"email": "kennylazer10@gmail.com",
	"gender": "M",
	"address": "Kicukiro",
	"mobileNo": "078000000",
	"intake": "September Intake",
	"department": "5e73e34fb400e72344a5cf04",
	"shift": "09:00-11:00"
}
```

Response:
```json
{
    "status": 201,
    "message": "Registered successfully",
    "data": {
        "status": "ON",
        "_id": "5e7fa0ac70e42c05947df5bd",
        "firstname": "Kenny",
        "lastname": "Lazer",
        "email": "kennylazer10@gmail.com",
        "gender": "M",
        "address": "Kicukiro",
        "mobileNo": "078000000",
        "intake": "September Intake",
        "department": "5e73e34fb400e72344a5cf04",
        "shift": "09:00-11:00",
        "startMonth": "9",
        "regNum": "GRAD0003V/SEP2020",
        "__v": 0
    }
}
```

### 28. Get All Students: GET Request
End point
```
/api/v1/student
```

Response: 
```json
{
    "status": 200,
    "message": "Student(s) Found",
    "data": [
        {
            "status": "ON",
            "_id": "5e7f9fd971b94c0628a8a92a",
            "firstname": "Kenny",
            "lastname": "Lazer",
            "email": "kennylazer10@gmail.com",
            "gender": "M",
            "address": "Kicukiro",
            "mobileNo": "078000000",
            "intake": "March Intake",
            "department": "5e73e34fb400e72344a5cf04",
            "shift": "09:00-11:00",
            "startMonth": "3",
            "regNum": "GRAD0001V/MAR2020"
        },
        {
            "status": "ON",
            "_id": "5e7fa09470e42c05947df5bc",
            "firstname": "Kenny",
            "lastname": "Lazer",
            "email": "kennylazer10@gmail.com",
            "gender": "M",
            "address": "Kicukiro",
            "mobileNo": "078000000",
            "intake": "March Intake",
            "department": "5e73e34fb400e72344a5cf04",
            "shift": "09:00-11:00",
            "startMonth": "3",
            "regNum": "GRAD0002V/MAR2020"
        },
        {
            "status": "ON",
            "_id": "5e7fa0ac70e42c05947df5bd",
            "firstname": "Kenny",
            "lastname": "Lazer",
            "email": "kennylazer10@gmail.com",
            "gender": "M",
            "address": "Kicukiro",
            "mobileNo": "078000000",
            "intake": "September Intake",
            "department": "5e73e34fb400e72344a5cf04",
            "shift": "09:00-11:00",
            "startMonth": "9",
            "regNum": "GRAD0003V/SEP2020"
        }
    ]
}
```

### 29. Get Single Student: GET request
End Point
```
/api/v1/student/:id
```

Response:
```json
{
    "status": 200,
    "message": "Student Found",
    "data": {
        "status": "ON",
        "_id": "5e7f9fd971b94c0628a8a92a",
        "firstname": "Kenny",
        "lastname": "Lazer",
        "email": "kennylazer10@gmail.com",
        "gender": "M",
        "address": "Kicukiro",
        "mobileNo": "078000000",
        "intake": "March Intake",
        "department": "5e73e34fb400e72344a5cf04",
        "shift": "09:00-11:00",
        "startMonth": "3",
        "regNum": "GRAD0001V/MAR2020"
    }
}
```

### 30. Update Student: PATCH Request
End Point
```
/api/v1/student/update
```
Body:
```json
{
	"student": "5e7f9fd971b94c0628a8a92a",
	"address": "Kabuga"
}
```

Response: 
```json
{
    "status": 200,
    "message": "Student Updated",
    "data": {
        "status": "ON",
        "_id": "5e7f9fd971b94c0628a8a92a",
        "firstname": "Kenny",
        "lastname": "Lazer",
        "email": "kennylazer10@gmail.com",
        "gender": "M",
        "address": "Kabuga",
        "mobileNo": "078000000",
        "intake": "March Intake",
        "department": "5e73e34fb400e72344a5cf04",
        "shift": "09:00-11:00",
        "startMonth": "3",
        "regNum": "GRAD0001V/MAR2020",
        "__v": 0
    }
}
```

### 31. Deactivate Student: PATCH Request
End Point:
```
/api/v1/student/deactivate
```

Body:
```json
{
	"student": "5e7f9fd971b94c0628a8a92a",
	"month": "9"
}
```

Response:
```json
{
    "status": 200,
    "message": "Student Deactivated",
    "data": {
        "status": "OFF",
        "_id": "5e7f9fd971b94c0628a8a92a",
        "firstname": "Kenny",
        "lastname": "Lazer",
        "email": "kennylazer10@gmail.com",
        "gender": "M",
        "address": "Kabuga",
        "mobileNo": "078000000",
        "intake": "March Intake",
        "department": "5e73e34fb400e72344a5cf04",
        "shift": "09:00-11:00",
        "startMonth": "3",
        "regNum": "GRAD0001V/MAR2020",
        "__v": 0
    }
}
```

### 32. Add Marks: POST Request

End Point
```
/api/v1/marks/new
```

Body
```json
{
	"student": "5e7f9fd971b94c0628a8a92a",
	"course": "5e7a58d39fa95213d86c2aba",
	"marksTest": "90",
	"marksExam": "80",
	"verdict": "Pass"
}
```

Response
```json
{
    "status": 201,
    "message": "Marks Registered!!!",
    "data": {
        "_id": "5e80ef051010911dd80e6a1e",
        "student": "5e7f9fd971b94c0628a8a92a",
        "course": "5e7a58d39fa95213d86c2aba",
        "marksTest": 90,
        "marksExam": 80,
        "verdict": "Pass",
        "total": 170,
        "__v": 0
    }
}
```

### 33. Get Marks: GET Request

End Point
```
/api/v1/marks
```

Response
```json
{
    "status": 200,
    "message": "Marks Retrieved",
    "data": [
        {
            "_id": "5e80ef051010911dd80e6a1e",
            "student": "5e7f9fd971b94c0628a8a92a",
            "course": "5e7a58d39fa95213d86c2aba",
            "marksTest": 90,
            "marksExam": 80,
            "verdict": "Pass",
            "total": 170
        }
    ]
}
```

## Contributors

- Kenny Ruzindana
- Jovite Ngoga Kwizera


