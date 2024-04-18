import { Router } from "express";

import * as ReviewController from "./controller/review.js"
import { AccessRoles, authentication } from "../../middleware/auth.js";

const router=Router()





router.post("",authentication(AccessRoles.Student),ReviewController.review)
router.get("/:courseId",ReviewController.Getreview)










export default router