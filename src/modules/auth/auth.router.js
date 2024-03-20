import { Router } from 'express';
import { validation} from '../../middleware/validation.js';
import * as authController from "./controller/auth.js"
import * as AuthValidators from "./auth.validation.js"

const router = Router();

router.post('/signup', validation(AuthValidators.SignupSchema),authController.signup);
router.get("/confirmEmail/:token",validation(AuthValidators.confirmEmail),authController.confirmEmail)
router.post('/signin',validation(AuthValidators.login),authController.signin);
router.post('/sendCode',authController.sendCode);
router.put('/forgetPassword',authController.forgetPassword);

export default router;
