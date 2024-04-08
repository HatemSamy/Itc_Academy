import { Router } from "express";

import * as UserController from "./controller/user.js"
import { AccessRoles, authentication } from "../../middleware/auth.js";

const router= Router()


router.put('/upgrade-role/:userId', authentication(AccessRoles.Admin),UserController.upgradeUserRole);
router.get('/students', authentication(AccessRoles.Admin),UserController.GetAllStududents);




export default router