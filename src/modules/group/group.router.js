import express from 'express';
import * as GroupController from "../group/controller/group.js"
import { AccessRoles, authentication } from '../../middleware/auth.js';
import SessionRouter from "../Session/Session.router.js"
const router = express.Router();



router.use("/:groupId/Session",SessionRouter)  // internal navigate
// Create group
router.post('/',authentication(AccessRoles.Admin),GroupController.createGroup);
// Add students to the group
router.post('/:groupId',authentication(AccessRoles.Admin),GroupController.addStudentsToGroup);
// Add Materials to the group
router.post('/:groupId/materials',authentication(AccessRoles.Admin),GroupController.addMaterialsToGroup);
// Update group
router.put('/:groupId',authentication(AccessRoles.Admin),GroupController.updateGroup);
// get all groups
router.get('/',authentication(AccessRoles.Admin),GroupController.getGroups);
// get group by id 
router.get('/:groupId',authentication(AccessRoles.Admin),GroupController.getGroupById);
// delete student from group
router.delete('/students/:groupId',authentication(AccessRoles.Admin),GroupController.deleteStudentFromGroup);
// delete material from group
router.delete('/Material/:groupId',authentication(AccessRoles.Admin),GroupController.deleteMaterialFromGroup);
// delete group
router.delete('/:groupId',authentication(AccessRoles.Admin),GroupController.deleteGroup);
// get students in the group 
router.get('/students/:groupId',authentication(AccessRoles.Admin),GroupController.getStudentsInGroup);
// get material in group
router.get('/Material/:groupId',authentication(AccessRoles.general),GroupController.getMaterialsByUserInGroup);



export default router;
