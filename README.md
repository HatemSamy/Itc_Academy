# ITC Academy API Documentation
## Authentication Endpoints:
### 1. Sign Up:
**Route**: `/api/v1/auth/signup`
- **Method**: POST
- **Request**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```
- **Response:**
```json
{
  "message": "User signed up successfully"
}
```
### 2. Sign In
**Route**: `/api/v1/auth/signin`
- **Method**: POST
- **Request**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "token": "string"
}
```
### 3. Send Token
**Route**: `/api/v1/auth/sendCode`
- **Method**: POST
- **Request**:
```json
{
  "email": "string"
}
```
- **Response**:
	- Status: 200 OK
	- Example:
```json
{
  "message": "Code sent successfully"
}
```
### 4. Password Reset
**Route**: `/api/v1/auth/forgetPassword
- **Method**: PUT
- **Request**:
```json
{
  "email": "string",
  "password": "string",
  "code": "number"
}
```
- **Response**:
	- Status: 200 OK
	- Example:
```json
{
  "message": "Password reset successful"
}
```
---
## Category Endpoints:
### 1. Create Category:
**Route**: `/api/v1/category/create`
- **Method**: POST
- **Request**:
    - Form Data:
        - `name`: "string"
        - `description`: "string"
        - `image`: (File)
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Category created successfully"
}
```
### 2. Update Category:
**Route**: `/api/v1/category/update/:categoryId`
- **Method**: PUT
- **Request**:
    - Form Data:
        - `name`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Category updated successfully"
}
```
### 3. Delete Category:
**Route**: `/api/v1/category/delete/:categoryId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Category deleted successfully"
}
```
### 4. Get Categories:
**Route**: `/api/v1/category/AllCategories`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "categories": [...]
}
```
### 5. Get Category By ID:
**Route**: `/api/v1/category/:categoryId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "category": {...}
}
```
### 6. Recommended Category:
**Route**: `/api/v1/category/recommended/:categoryId`
- **Method**: PUT
- **Request**:
```JSON
{
  "recommended": true
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Category recommendation updated successfully"
}
```
### 7. Recommended Items:
**Route**: `/api/v1/category/`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "recommendedItems": [...]
}
```
---
## Lecture Endpoints:
### 1. Create Lecture:
**Route**: `/api/v1/lecture/create/:categoryId`
- **Method**: POST
- **Request**:
    - Form Data:
        - `name`: "string"
        - `description`: "string"
        - `pdf`: (File)
        - `hours`: "number"
        - `academicName`: "string"
        - `objectives`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Lecture created successfully"
}
```
### 2. Update Lecture:
**Route**: `/api/v1/lecture/update/:lectureId`
- **Method**: PUT
- **Request**:
    - Form Data:
        - `video`: (File)
        - `name`: "string"
        - `description`: "string"
        - `pdf`: (File)
        - `hours`: "number"
        - `labNo`: "number"
        - `academicName`: "string"
        - `objectives`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Lecture updated successfully"
}
```
### 3. Get Lectures:
**Route**: `/api/v1/lecture/`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "lectures": [...]
}
```
### 4. Delete Lecture:
**Route**: `/api/v1/lecture/delete/:lectureId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Lecture deleted successfully"
}
```
### 5. Get Single Lecture:
**Route**: `/api/v1/lecture/:lectureId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "lecture": {...}
}
```
---
## Service Endpoints:
### 1. Create Service:
**Route**: `/api/v1/Service/create/:categoryId`
- **Method**: POST
- **Request**:
    - Form Data:
        - `image`: (File)
        - `name`: "string"
        - `description`: "string"
        - `typeOfService`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Service created successfully"
}
```
### 2. Update Service:
**Route**: `/api/v1/Service/update/:serviceId`
- **Method**: PUT
- **Request**:
    - Form Data:
        - `name`: "string"
        - `description`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Service updated successfully"
}
```
### 3. Get Service in Category:
**Route**: `/api/v1/Service/services/:categoryId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "services": [...]
}
```
### 4. Delete Service:
**Route**: `/api/v1/Service/serviceId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Service deleted successfully"
}
```
### 5. Get Single Service:
**Route**: `/api/v1/Service/serviceId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "service": {...}
}
```
### 6. Recommended Service:
**Route**: `/api/v1/Service/recommended/:serviceId`
- **Method**: PUT
- **Request**:
```JSON
{
  "recommended": false
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Service recommendation updated successfully"
}
```
---
## Course Endpoints:
### 1. Create Course:
**Route**: `/api/v1/Course/:categoryId`
- **Method**: POST
- **Request**:
    - Form Data:
        - `title`: "string"
        - `content`: "string"
        - `instructorId`: "string"
        - `total_duration`: "string"
        - `price`: "number"
        - `image`: (File)
        - `description`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Course created successfully"
}
```
### 2. Update Course:
**Route**: `/api/v1/Course/:courseId`
- **Method**: PUT
- **Request**:
    - Form Data:
        - `title`: "string"
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Course updated successfully"
}
```
### 3. Get Courses:
**Route**: `/api/v1/Course/`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "courses": [...]
}
```
### 4. Get Course By ID:
**Route**: `/api/v1/Course/:courseId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "course": {...}
}
```
## 5. Approval Status:
**Route**: `/api/v1/Course/approvalStatus/:courseId`
- **Method**: PUT
- **Request**:
```JSON
{
  "approvalStatus": "boolean"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Course approval status updated successfully"
}
```
### 6. Delete Course:
**Route**: `/api/v1/Course/:courseId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Course deleted successfully"
}
```
---
## Instructor Endpoints:
### 1. Update Instructor:
**Route**: `/api/v1/Instructor/update/:instructorId`
- **Method**: PUT
- **Request**:
    - Form Data:
        - `image`: (File)
- **Response**:
    - Status: 200 OK
    - Example:
```JSON

```
### 2. Activate Instructor:
**Route**: `/api/v1/Instructor/:instructorId`
- **Method**: PUT
- **Request**:
```JSON
{
  "ActiveStatus": true
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Instructor activation status updated successfully"
}
```
### 3. Get Instructors:
**Route**: `/api/v1/Instructor/`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "instructors": [...]
}
```
### 4. Get Instructor By ID:
**Route**: `/api/v1/Instructor/:instructorId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "instructor": {...}
}
```
### 5. Delete Instructor:
**Route**: `/api/v1/Instructor/:instructorId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Instructor deleted successfully"
}
```
---
## Exam Endpoints:
### 1. Create Exam:
**Route**: `/api/v1/Course/:courseId/exam/`
- **Method**: POST
- **Request**:
    - JSON Data:
```JSON
{
  "title": "string",
  "description": "string",
  "examType": "string",
  "totalMark": "number",
  "duration": "string",
  "passMark": "number"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Exam created successfully"
}
```
### 2. Update Exam:
**Route**: `/api/v1/Course/:courseId/exam/update/:examId`
- **Method**: PUT
- **Request**:
    - JSON Data:
```JSON
{
  "title": "string",
  "description": "string",
  "examType": "string",
  "totalMark": "number",
  "duration": "string",
  "passMark": "number"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Exam updated successfully"
}
```
### 3. Get Exams:
**Route**: `/api/v1/Course/:courseId/exam/`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "exams": [...]
}
```
### 4. Get Exam By ID:
**Route**: `/api/v1/Course/:courseId/exam/:examId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "exam": {...}
}
```
### 5. Update Exam Status:
**Route**: `/api/v1/Course/:courseId/exam/:examId`
- **Method**: PUT
- **Request**:
    - JSON Data:
```JSON
{
  "ExamStatus": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Exam status updated successfully"
}
```
### 6. Delete Exam:
**Route**: `/api/v1/Course/:courseId/exam/:examId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Exam deleted successfully"
}
```
### 7. Take Exam:
**Route**: `/api/v1/Course/:courseId/exam/:examId`
- **Method**: POST
- **Request**:
    - JSON Data:
```JSON
{
  "Answers": ["string"]
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Exam submitted successfully"
}
```
---
## Question Endpoints:
### 1. Create Question:
**Route**: `/api/v1/Question/:examId`
- **Method**: POST
- **Request**:
    - JSON Data:
```JSON
{
  "Question": "string",
  "optionA": "string",
  "optionB": "string",
  "optionC": "string",
  "optionD": "string",
  "correctAnswer": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Question created successfully"
}
```
### 2. Update Question:
**Route**: `/api/v1/Question/:questionId`
- **Method**: PUT
- **Request**:
    - JSON Data:
```JSON
{
  "Question": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Question updated successfully"
}
```
### 3. Get Questions:
**Route**: `/api/v1/Question/:examId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "questions": [...]
}
```
### 4. Get Question By ID:
**Route**: `/api/v1/Question/:questionId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "question": {...}
}
```
### 5. Delete Question:
**Route**: `/api/v1/Question/:examId/:questionId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Question deleted successfully"
}
```
---
## Group Endpoints:
### 1. Create Group:
**Route**: `/api/v1/group/`
- **Method**: POST
- **Request**:
    - JSON Data:
```JSON
{
  "name": "string",
  "code": "number",
  "instructor": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Group created successfully"
}
```
### 2. Add Student To Group:
**Route**: `/api/v1/group/:groupId/addStudents`
- **Method**: POST
- **Request Parameters**:
    - `:groupId`: The ID of the group to which students will be added.
- **Request Headers**:
    - `Authorization`: The authentication token for the user initiating the request.
- **Request Body**:
    - JSON Data:
```JSON
{
  "students": ["studentId1", "studentId2", ...]
}
```
**Response**:
- Status: 200 OK
- Content: JSON
```JSON
{
  "message": "Students added to the group successfully"
}
```
### 3. Add Materials To Group:
- **Route**: `/api/v1/group/:groupId/addMaterials`
    - **Method**: POST
    - **Request Parameters**:
        - `:groupId`: The ID of the group to which materials will be added.
    - **Request Headers**:
        - `Authorization`: The authentication token for the user initiating the request.
    - **Request Body**:
        - JSON Data:
```JSON
{
  "materials": ["materialId1", "materialId2", ...]
}
```
**Response**:
- Status: 200 OK
- Content: JSON
```JSON
{
  "message": "Materials added to the group successfully"
}
```
### 4. Update Group:
**Route**: `/api/v1/group/:groupId`
- **Method**: PUT
- **Request**:
    - JSON Data:
```JSON
{
  "name": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Group updated successfully"
}
```
### 5. Get Groups:
**Route**: `/api/v1/group/`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "groups": [...]
}
```
### 6. Get Group By ID:
**Route**: `/api/v1/group/:groupId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "group": {...}
}
```
### 7. Get Students In Group:
**Route**: `/api/v1/group/students/:groupId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "students": [...]
}
```
### 8. Delete Student From Group:
**Route**: `/api/v1/group/:groupId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Group deleted successfully"
}
```
### 9. Delete Material From Group:
**Route**: `/api/v1/group/Material/:groupId`
- **Method**: DELETE
- **Request**:
    - JSON Data:
```JSON
{
  "materialId": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Material deleted from group successfully"
}
```
### 10. Delete Group:
**Route**: `/api/v1/group/:groupId`
- **Method**: DELETE
- **Request Parameters**:
    - `:groupId`: The ID of the group to be deleted.
- **Request Headers**:
    - `Authorization`: The authentication token for the user initiating the delete request.
- **Response**:
    - Status: 200 OK
    - Content: JSON
```JSON
{
  "message": "Group deleted successfully"
}
```
### 11. Get Materials By User In Group:
**Route**: `/api/v1/group/Material/:groupId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "materials": [...]
}
```
---
## Absence Endpoints:
### 1. Record Absence For Lecture:
**Route**: `/api/v1/Absence/:lectureId`
- **Method**: POST
- **Request**:
    - JSON Data:
```JSON
{
  "absentStudents": ["string"],
  "lectureId": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Absence recorded successfully"
}
```
### 2. Get Absence For Lecture:
**Route**: `/api/v1/Absence/:lectureId`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "absences": [...]
}
```
---
## Session Endpoints:
### 1. Create Session:
**Route**: `/api/v1/group/:groupId/Session`
- **Method**: POST
- **Request**:
    - JSON Data:
```JSON
{
  "title": "string",
  "date": "string",
  "time": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "Session created successfully"
}
```
### 2. Get Next Session:
**Route**: `/api/v1/group/:groupId/Session`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "sessions": []
}
```
### 3. Get All Sessions In Group:
**Route**: `/api/v1/group/:groupId/Session`
- **Method**: GET
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "sessions": [...]
}
```
### 4. Delete Session:
**Route**: `/api/v1/group/:groupId/Session/:sessionId`
- **Method**: DELETE
- **Response**:
    - Status: 200 OK
    - Example:
```JSON
{
  "message": "Session deleted successfully"
}
```
---
### Admin Update Endpoint
### Upgrade Role:
**Route**: `/api/v1/User/upgrade-role/:userId`
- **Method**: PUT
- **Request**:
    - JSON Data:
```JSON
{
  "newRole": "string"
}
```
**Response**:
- Status: 200 OK
- Example:
```JSON
{
  "message": "User role updated successfully"
}
```
---