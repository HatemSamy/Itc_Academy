

import { Router } from "express";
import { AccessRoles, authentication } from "../../middleware/auth.js";
import * as PaymentController  from "./controller/payment.js";




const router= Router()



router.post("/", PaymentController.payment)
router.get("/StudentPayment", PaymentController.findStudentPayments)
router.get("/coursePayment/:courseId", PaymentController.FindCoursePayments)



export default router