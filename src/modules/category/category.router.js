
import { Router } from 'express';
// import { validation } from '../../middleware/validation.js';
import * as categoryController from "./controller/category.js"; 
// import * as CategoryValidators from "./category.validation.js";
import  {HME, myMulter, pathName } from "../../services/multer.js"
import { AccessRoles, authentication } from '../../middleware/auth.js';
const router = Router();

router.post('/create',myMulter(pathName.CreateCategory).single('image'),HME,categoryController.createCategory);
router.get('/',authentication(AccessRoles.MultipleRole),categoryController.getAllCategories);
router.get('/:id',authentication(AccessRoles.MultipleRole),categoryController.getSpecificCategory);
router.put('/:id', myMulter(pathName.CreateCategory).single('image'),HME,categoryController.updateCategory);
router.delete('/:id',authentication(AccessRoles.create),categoryController.deleteCategory);

export default router;
