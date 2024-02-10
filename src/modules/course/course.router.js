 import { Router } from "express";
import { HME, myMulter, pathName } from "../../services/multer.js";
import * as CourseController from "./controller/course.js"
import { AccessRoles, authentication } from "../../middleware/auth.js";
 const router= Router()


 router.post('/:serviceId',authentication(AccessRoles.instructorRole),myMulter(pathName.Course).single('image'),HME,CourseController.CreateCourse )
 router.put('/:id',authentication(AccessRoles.instructorRole), myMulter(pathName.Course).single('image'),HME,CourseController.UpdateCourse )
 router.get('/',CourseController.getCourses )
 router.get('/:id',CourseController.getCourseById )
 router.delete('/:id',authentication(AccessRoles.instructorRole),CourseController.deleteCourseById )
 router.put('/approvalStatus/:courseId',CourseController.updateCourseApprovalStatus )
 router.put('/course/:id/rating',CourseController.rating)
 router.put('/cours/:id/review',CourseController.review)























 export default router