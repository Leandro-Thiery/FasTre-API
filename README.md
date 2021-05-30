# FasTre-API  
FasTre's API for viewing hospitals data and news  

# API Usage  

## /api/v1/hospital  
GET: Return all list of hospitals.  
Return:
```json
[
  {
    "id": "String",
    "address": "String",
    "email": "String",
    "location": {
        "_latitude": 0,
        "_longitude": 0
    },
    "name": "String",
    "phoneNum": 1234567890,
    "telephoneNum": 1234567890
  }
]
```

### /api/v1/hospital/:id  

GET: Return a hospital by id.  
Return:
```json
{
    "id": "String",
    "address": "String",
    "email": "String",
    "location": {
        "_latitude": 0,
        "_longitude": 0
    },
    "name": "String",
    "phoneNum": 1234567890,
    "telephoneNum": 1234567890
}
```


### /api/v1/hospital/:id/polyclinic
GET: Return all list of Polyclinics by hospital id
```json
{
  "id": "String",
  "doctorName": "String",
  "polyType": "String",
  "schedule": {
    "sabtu": "12:30-14:00",
    "kamis": "10:00-12:00",
    "selasa": "8:00-12:00",
    "senin": "10:00-12:00"
  }
}
```

## /api/v1/post  

GET: Return all list of posts  
Return:
```json
[
  {
    "id": "String",
    "postTitle": "String",
    "postContent": "String",
    "imgURL": "String",
    "date": {
      "_seconds": 0,
      "_nanoseconds": 0
    }
  }
]
```




POST: Add a new post
Request body:
```json
{
  "postTitle": "String",
  "postContent": "String",
  "imgURL": "String"
}
```

Return: 
```json
  {
    "id": "String",
    "postTitle": "String",
    "postContent": "String",
    "imgURL": "String",
    "date": {
      "_seconds": 0,
      "_nanoseconds": 0
    }
  }
```
### /api/v1/post/:id  

GET: Return a post by id.  
