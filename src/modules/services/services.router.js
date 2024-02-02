import { Router } from 'express';
import * as ServiceController from './controller/services.js';
import { HME, myMulter, pathName } from '../../services/multer.js';
import { AccessRoles, authentication } from '../../middleware/auth.js';

const router = Router();

router.post('/create/:categoryId',myMulter(pathName.serviceFiles).single("image"),HME,ServiceController.createService);
router.get('/services/:categoryId', ServiceController.getAllServices);
router.get('/:id',authentication(AccessRoles.MultipleRole) ,ServiceController.getSpecificService);
router.put('/:id', myMulter(pathName.serviceFiles).single("image"),HME,ServiceController.updateService);
router.delete('/:id',authentication(AccessRoles.MultipleRole),ServiceController.deleteService);


export default router;
