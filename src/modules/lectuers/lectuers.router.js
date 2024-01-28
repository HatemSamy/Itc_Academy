import { Router } from 'express';
import * as  lectureController from './controller/lectuers.js'; // Import your lecture controller
import { HME, myMulter, pathName } from '../../services/multer.js';
import { AccessRoles, authentication } from '../../middleware/auth.js';


const router = Router();

// POST /create - Create a new lecture
router.post('/create/:serviceId',authentication(AccessRoles.MultipleRole),myMulter(pathName.lectureFiles).fields([
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]), HME, lectureController.createLectureWithFiles);

// GET / - Get all lectures
router.get('/', lectureController.getAllLecturers);

// // GET /:id - Get a specific lecture
router.get('/:id',lectureController.getSpecificLecturer);

// PUT /:id - Update a lecture
router.put('/:lectureId', myMulter(pathName.lectureFiles).fields([
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]), HME, lectureController.updateLecture);

// DELETE /:id - Delete a lecture
router.delete('/:lectureId',authentication(AccessRoles.MultipleRole),lectureController.deleteLecture);

export default router;
