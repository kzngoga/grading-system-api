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
```

## Routes List

### User
- [Get All Users](#1-get-all-users-get-request)
- [Add User](#2-add-user-post-request)
- [Log In](#3-log-in-post-request)
- [Change Password](#4-change-password-patch-request)
- [Update User](#5-update-user-patch-request)
- [Delete User](#6-delete-user-delete-request)

### Search
- [Search User](#7-search-get-request)

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

### 6. Delete User: PATCH Request

Endpoint:
```
/api/v1/user/delete
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
    "message": "User Deleted",
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

### 7. Search: GET Request

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


## Contributors

- Kenny Ruzindana
- Jovite Ngoga Kwizera


