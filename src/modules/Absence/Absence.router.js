import express from 'express';
import * as  AbsencesController from './controller/Absence.js';
import { AccessRoles, authentication } from '../../middleware/auth.js';

const router = express.Router();

router.post('/:groupId',authentication(AccessRoles.instructorRole) ,AbsencesController.recordAbsences);
router.get('/:lectureId',authentication(AccessRoles.instructorRole) ,AbsencesController.getAbsencesForLecture);

export default router;
