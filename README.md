# FasTre-API  
FasTre's API for viewing hospitals data and news

# Setup
* Clone the repository
* Run `npm install` in directory to install dependencies
* Upload your own Firestore Service Account to connect to your own Firestore Database
* Rename the serviceAccount file on db.js to your own file
* Run the application with `node index.js`
* Application should be running on localhost with PORT or 8000 as port

# Deployment in Google Cloud
GCP is also used to connect the mobile app (code is provided in [this repository](https://github.com/Leonardus028/FasTre )) with the data analysis model. To do so, the project is supported by Compute Engine VM Instances to run the API that is stored in this separate repository. The instances are set up using Cron Job to run the application during restart or booting.
* Deployed an instance in Compute Engine and enable HTTP traffic
* Clone code from repository
* Setup a cronjob to run program on reboot or startup

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
PUT: Edit the 'status' of specified queue to 'Finished'

### /api/v1/hospitals/:id/polyclinics/:polyId/currentNumber
GET: Return the currentNumber of queue in specified polyId
```json
{
  "polyId": "1",
  "currentNumber": 3
}
```

## /api/v1/user
### /api/v1/user/:userId
GET: Return the queues by userId
```json
{
  "queues": [
    {
      "queueId": "1NPPMQFKRXaMCVGFdr54",
      "polyId": "1",
      "hospitalId": "1",
      "estimatedTime": 2.608834743499756,
      "status": "OnGoing",
      "scheduledMinute": 30,
      "date": {
        "_seconds": 1623069737,
        "_nanoseconds": 941000000
      },
      "number": 3,
      "scheduledDay": 1,
      "scheduledHour": 10,
      "userId": "Test Antrian"
    },
    {
      "queueId": "1NPPMQFKRXaMCVGFdr54",
      "polyId": "2",
      "hospitalId": "1",
      "estimatedTime": 2.608834743499756,
      "status": "OnGoing",
      "scheduledMinute": 30,
      "date": {
        "_seconds": 1623069737,
        "_nanoseconds": 941000000
      },
      "number": 3,
      "scheduledDay": 1,
      "scheduledHour": 10,
      "userId": "Test Antrian"
    },
  ]
}
```
