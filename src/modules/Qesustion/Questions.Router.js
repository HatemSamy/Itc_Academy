import { Router } from "express";
import * as QuestionController from "./controller/QuestionController.js"
import {AccessRoles, authentication } from "../../middleware/auth.js";
// import { AccessRoles } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./Question.Validation.js"
const router= Router()


//Question routers
router.post("/:id",validation(validators.createQuestioon),authentication(AccessRoles.instructorRole),QuestionController.CraeteQuestion)

router.get("/:examId",authentication(AccessRoles.MultipleRole),QuestionController.GetQuestions)

router.get("/:id",validation(validators.GetQuestionById),authentication(AccessRoles.MultipleRole),QuestionController.GetSingleQuestion)

router.put("/:id",validation(validators.UpdateQuestion),authentication(AccessRoles.instructorRole),QuestionController.UpdateQuestion)

router.delete("/:examId/:id",authentication(AccessRoles.instructorRole),QuestionController.DeleteQuestion)



export default router