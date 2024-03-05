
import { Router } from 'express';
// import { validation } from '../../middleware/validation.js';
import * as categoryController from "./controller/category.js"; 
// import * as CategoryValidators from "./category.validation.js";
import  {HME, myMulter, pathName } from "../../services/multer.js"
import { AccessRoles, authentication } from '../../middleware/auth.js';
const router = Router();



// Create categories
router.post('/create',myMulter(pathName.CreateCategory).single('image'),HME,categoryController.createCategory);

// Get all categories
router.get('/AllCategories',categoryController.getAllCategories);

// Get specific category by ID
router.get('/:id',categoryController.getSpecificCategory);

// Update category by ID
router.put('/:id', myMulter(pathName.CreateCategory).single('image'),HME,categoryController.updateCategory);

// Delete category by ID
router.delete('/:id',authentication(AccessRoles.create),categoryController.deleteCategory);

// Get recommended Category
router.put('/recommended/:categoryId',categoryController.recommendedCategory);

// Get recommendedItems
router.get('/',categoryController.recommendedItemsHandler);

export default router;
