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
      "address": "String",
      "email": "String",
      "photo1": "String",
      "photo2": "String",
      "photo3": "String",
      "latitude": "String",
      "longitude": "String",
      "name": "String",
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
  "hospitals": {
      "id": "1",
      "address": "String",
      "email": "String",
      "photo1": "String",
      "photo2": "String",
      "photo3": "String",
      "latitude": "String",
      "longitude": "String",
      "name": "String",
      "phoneNum": 628161913838,
      "telephoneNum": 217410808
  }
}
```


### /api/v1/hospitals/:id/schedules
GET: Return all list of Schedules by hospital id
```json
{
  "schedules": [
    {
      "doctorId": "1",
      "polyId": 1,
      "imgURL": "String",
      "doctorName": "String",
      "schedule1": "Senin, 10:00-12:00",
      "schedule2": "Selasa, 10:00-12:00",
      "schedule3": "Kamis, 10:00-12:00",
      "schedule4": "Jumat, 12:30-14:00"
    },
    {
      "doctorId": "1",
      "polyId": 1,
      "imgURL": "String",
      "doctorName": "String",
      "schedule1": "Senin, 10:00-12:00",
      "schedule2": "Selasa, 10:00-12:00",
      "schedule3": "Kamis, 10:00-12:00",
      "schedule4": "Jumat, 12:30-14:00"
    }
  ]
}
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
      "date": "String",
      "postTitle": "String",
      "postContent": "String",
      "imgURL": "String"
    },
    {
      "id": "String",
      "date": "String",
      "postTitle": "String",
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


### /api/v1/post/:id  

GET: Return a post by id.  
Return: 
```json
  {
    "id": "String",
    "postTitle": "String",
    "postContent": "String",
    "imgURL": "String",
    "date": "String",
  }
```


### /api/v1/hospitals/:id/polyclinics/:polyId/queues/
POST: Add a new Queue  
*Required*
```json
{
    "userId": "String",
    "scheduledDay": 1,
    "scheduledHour": 10,
    "scheduledMinute": 30
}
```
Return :
```json
{
  "queueId": "String",
  "polyId": 1,
  "userId": "String",
  "scheduledDay": 1,
  "scheduledHour": 10,
  "scheduledMinute": 30,
  "number": 3,
  "status": "OnGoing",
  "date": {
    "_seconds": 1623069737,
    "_nanoseconds": 941000000
  },
  "estimatedTime": 2.608834743499756
}
```

### /api/v1/hospitals/:id/polyclinics/:polyId/queues/:queueId
GET: Return the details of specified queue
```json
{
  "polyId": 1,
  "date": {
    "_seconds": 1623069737,
    "_nanoseconds": 941000000
  },
  "status": "OnGoing",
  "estimatedTime": 2.608834743499756,
  "userId": "Test Antrian",
  "scheduledDay": 1,
  "scheduledHour": 10,
  "number": 3,
  "scheduledMinute": 30
}
```

### /api/v1/hospitals/:id/polyclinics/:polyId/queues/user/:userId
GET: Return the queues by userId
```json
{
  "queues": [
    {
      "queueId": "1NPPMQFKRXaMCVGFdr54",
      "scheduledDay": 1,
      "status": "OnGoing",
      "scheduledHour": 10,
      "date": {
        "_seconds": 1623069737,
        "_nanoseconds": 941000000
      },
      "userId": "Test Antrian",
      "number": 3,
      "scheduledMinute": 30,
      "estimatedTime": 2.608834743499756
    },
    {
      "queueId": "SKOSwfF6D5dGvlgi1zDI",
      "scheduledDay": 1,
      "scheduledMinute": 30,
      "estimatedTime": 0,
      "userId": "Test Antrian",
      "scheduledHour": 10,
      "date": {
        "_seconds": 1623065098,
        "_nanoseconds": 284000000
      },
      "status": "OnGoing",
      "number": 1
    },
  ]
}
```


### /api/v1/hospitals/:id/polyclinics/:polyId/currentNumber
GET: Return the currentNumber of queue in specified polyId
```json
{
  "polyId": "1",
  "currentNumber": 3
}
```