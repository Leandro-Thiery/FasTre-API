# FasTre-API  
FasTre's API for viewing hospitals data and news  

# API Usage  

## /api/v1/hospitals  
GET: Return all list of hospitals.  
Return:
```json
{
  "hospitals": [
    {
      "id": "1",
      "address": "Jl. Otista Sasak Tinggi No. 3, Ciputat, Kota Tangerang Selatan, Banten",
      "email": "sariasihciputat@gmail.com",
      "photo1": "https://firebasestorage.googleapis.com/v0/b/fastre.appspot.com/o/img%2Fhospital_img%2Frs-sari-asih-1.jpg?alt=media&token=f6926c05-8223-472a-bce5-2c243c91cc7b",
      "photo2": "https://firebasestorage.googleapis.com/v0/b/fastre.appspot.com/o/img%2Fhospital_img%2Frs-sari-asih-2.jpg?alt=media&token=12c1b132-b88b-454f-b35a-80a26b8d604a",
      "photo3": "https://firebasestorage.googleapis.com/v0/b/fastre.appspot.com/o/img%2Fhospital_img%2Frs-sari-asih-3.jpg?alt=media&token=2b16820b-d15d-4795-82a7-7e6f4cb5e3a0",
      "latitude": "-6.325234113918052",
      "longitude": "106.74437070716637",
      "name": "RS Sari Asih Ciputat",
      "phoneNum": 628161913838,
      "telephoneNum": 217410808
    }
  ]
}
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
{
  "polyclinics": [
    {
      "id": 1,
      "polyName": "Ortopedi"
    },
    {
      "id": 2,
      "polyName": "Penyakit Dalam"
    },
    {
      "id": 3,
      "polyName": "THT"
    }
  ]
}
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
{
  "posts": [
    {
      "id": "String",
      "date": {
        "_seconds": 1622467753,
        "_nanoseconds": 667000000
      },
      "postTitle": "String",
      "postContent": "String",
      "imgURL": "String"
    },
    {
      "id": "String",
      "date": {
        "_seconds": 1622467753,
        "_nanoseconds": 667000000
      },
      "postTitle": "Test post baru",
      "postContent": "String",
      "imgURL": "String"
    }
  ]
}
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
  "post": {
    "id": "String",
    "date": {
      "_seconds": 1622467753,
      "_nanoseconds": 667000000
    },
    "postTitle": "String",
    "postContent": "String",
    "imgURL": "String"
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