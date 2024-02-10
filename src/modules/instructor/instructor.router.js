import { Router } from "express";
import { HME, myMulter, pathName } from "../../services/multer.js";
import * as instructorController from "./controller/instructor.js"
import { AccessRoles, authentication } from "../../middleware/auth.js";
 const router= Router()


 router.post('/', myMulter(pathName.Instructor).single('image'),HME,instructorController.InstructorSiginUp)
 router.put('/update/:id', myMulter(pathName.Instructor).single('image'),HME,instructorController.UpdateInstructor)
 router.put('/:instructorId',authentication(AccessRoles.Admin),instructorController. updateInstructorApprovalStatus)
 router.get('/',authentication(AccessRoles.general),instructorController.getInstructor )
 router.get('/:id',instructorController.getInstructorById)
 router.delete('/:id',authentication(AccessRoles.Admin),instructorController.DeleteInstructor )



export default router