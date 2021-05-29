# FasTre-API  
FasTre's API for viewing hospitals data and news  

# API Usage  

## /api/v1/hospital  

Return for single hospital
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

GET: Return all list of hospitals.  

### /api/v1/hospital/:id  

GET: Return a hospital by id.  

## /api/v1/post  

Return for single post
```json
{
    "postTitle": "String",
    "postContent": "String",
    "imgURL": "String",
    "date": {
        "_seconds": 0,
        "_nanoseconds": 0
    },
    "id": "String"
}
```

"id" is not required at POST  
"date" uses Firestore Timestamp data type, and not required at POST  

GET: Return all list of posts  

POST: Return the id of post  

### /api/v1/post/:id  

GET: Return a post by id.  
