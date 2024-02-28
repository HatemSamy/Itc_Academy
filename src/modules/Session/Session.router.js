
import { Router } from 'express';
import * as SessionController from "./controller/Session.js"; 
import { AccessRoles, authentication } from '../../middleware/auth.js';
const router = Router({mergeParams:true})

router.post('/',authentication(AccessRoles.instructorRole),SessionController.CreateSession);
router.get('/',authentication(AccessRoles.MultipleRole),SessionController.getNextSessionInGroup);
router.delete('/:sessionId',authentication(AccessRoles.DoupleRole),SessionController.deleteSessionFromGroup);




export default router;
