# FasTre-API  
FasTre's API for viewing hospitals data and news  

# API Usage  

## /api/v1/hospitals  
GET: Return all list of hospitals.  
Return:
```json
[
{
  "hospital": {
    "id": 1,
    "address": "String",
    "email": "String",
    "photo1": "String",
    "photo2": "String",
    "photo3": "String",
    "latitude": "-6.325234113918052",
    "longitude": "106.74437070716637",
    "name": "RS Sari Asih Ciputat",
    "phoneNum": 628161913838,
    "telephoneNum": 217410808
  }
}
]
```

### /api/v1/hospitals/:id

GET: Return a hospital by id.  
Return:
```json
{
  "id": 1,
  "address": "String",
  "email": "String",
  "imgURL": ["String"],
  "location": {
      "_latitude": 0,
      "_longitude": 0
  },
  "name": "String",
  "phoneNum": 1234567890,
  "telephoneNum": 1234567890
}
```


### /api/v1/hospitals/:id/schedules
GET: Return all list of Schedules by hospital id
```json
[
  {
    "doctorId": 1,
    "doctorName": "String",
    "polyId": 1,
    "schedule": {
      "kamis": "10:00-13:00",
      "sabtu": "12:30-15:00",
      "selasa": "9:00-12:00",
      "senin": "10:00-13:30"
    }
  }
]
```

### /api/v1/hospitals/:id/polyclinics
GET: Return all list of Polyclinics by hospital id
```json
[
  {
    "id": 1,
    "polyName": "String"
  },
  {
    "id": 2,
    "polyName": "String"
  },
  {
    "id": 3,
    "polyName": "String"
  }
]
```

### /api/v1/hospitals/:id/polyclinics/:polyId
GET: Return polyclinics by ID
```json
{
    "id": 1,
    "polyName": "String"
}
```



## /api/v1/posts  

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