import { Router } from 'express';
import { validation} from '../../middleware/validation.js';
import * as authController from "./controller/auth.js"
import * as AuthValidators from "./auth.validation.js"

const router = Router();

router.post('/signup', validation(AuthValidators.SignupSchema),authController.signup);
router.post('/sendCode',authController.sendCode);
router.post('/signin',validation(AuthValidators.login),authController.signin);
router.put('/forgetPassword',authController.forgetPassword);

export default router;
