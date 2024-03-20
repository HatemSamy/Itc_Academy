
import GroupModel from '../../../../DB/model/Group.model.js';

import CourseModel from '../../../../DB/model/course.model.js';
import UserModel from '../../../../DB/model/user.model.js';
import { asynchandlier } from "../../../services/erroeHandling.js";


  export const createGroup = asynchandlier(async (req, res, next) => {

      const instructor = await UserModel.findById(req.body.instructor);
      if (!instructor) {
        return res.status(400).json({ error: 'Instructor not found' });
      }
      const existingGroup = await GroupModel.findOne({ code: req.body.code });
      if (existingGroup) {
        return next (new Error(`Group with this code ${req.body.code} already exists`));
      }
      const groupData = {
        code: req.body.code ,
        name: req.body.name,
        code: req.body.code,
        instructor: req.body.instructor
      };
  
      const group = await GroupModel.create(groupData);
      res.status(201).json({message:"group created successfully",data:group});
    
  })


  export const addStudentsToGroup = asynchandlier(async (req, res, next) => {

      const group = await GroupModel.findById(req.params.groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      if (!req.body.students || req.body.students.length === 0) {
        return res.status(400).json({ error: 'No students provided' });
      }
  
      const studentsToAdd = [];
      for (const studentId of req.body.students) {
        const student = await UserModel.findById(studentId);
        if (!student) {
          return res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }
        studentsToAdd.push(studentId);
      }
      group.students.push(...studentsToAdd);
      await group.save();
  
      res.status(200).json({ message: 'Students added to the group successfully', data: group });
  
  });

  export const addMaterialsToGroup = asynchandlier(async (req, res, next) => {
      const group = await GroupModel.findById(req.params.groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }

      if (!req.body.materials || req.body.materials.length === 0) {
        return res.status(400).json({ error: 'No materials provided' });
      }
 
      const materialsToAdd = [];
      for (const materialId of req.body.materials) {
        const material = await CourseModel.findById({_id:materialId});
        if (!material) {
          return res.status(404).json({ error: `course with ID ${materialId} not found` });
        }
        materialsToAdd.push(materialId);
      }
  
      // Add materials to the group
      group.materials.push(...materialsToAdd);
      await group.save();
  
      res.status(200).json({ message: 'Materials added to the group successfully', data: group });
 
  });
  
  export const updateGroup = asynchandlier(async (req, res,next) => {

      const group = await GroupModel.findById(req.params.groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }

      if (req.body.instructor) {
        const newInstructor = await InstructorModel.findById(req.body.instructor);
        if (!newInstructor) {
          return res.status(400).json({ error: 'New instructor not found' });
        }
        group.instructor = req.body.instructor;
      }

      if (req.body.name) {
        group.name = req.body.name;
      }
  
      await group.save();
  
      res.status(200).json({ message: 'Group updated successfully', data: group });
   
  })


  export const getGroups = async (req, res, next) => {
      const groups = await GroupModel.find()
        .populate({ path: 'students',model:"user", select: 'firstName lastName email' }) 
        .populate({ path: 'materials',model:"Course", select: 'title' })     
        .exec();
  
      res.status(200).json({ message: "Groups data", data: groups });
   
  };
  
  
  export const getGroupById = asynchandlier(async (req, res, next) => {
 
     
      const group = await GroupModel.findById(req.params.groupId)
        .populate({ path: 'students', select: 'name email' }) 
        .populate({ path: 'materials', select: 'title' })    
        .exec();
  
      if (!group) {
        return next(new Error("Group not found"))
      }
      res.status(200).json({message:" Group data",data: group });
   
  });
  

export const deleteGroup = asynchandlier(async (req, res , next) => {
 
    const group = await GroupModel.findByIdAndDelete(req.params.groupId);
    if (!group) {
      return next(new Error("Group not found"))
    }
    res.json({ message: 'Group deleted successfully' });
 
});


export const deleteStudentFromGroup = asynchandlier(async (req, res , next) => {
    const group = await GroupModel.findByIdAndUpdate(
      req.params.groupId,
      { $pull: { students: req.body.studentIds} },
      { new: true }
    );

    if (!group) {
      return next(new Error("Group not found or studentId not found in the group"))

    }
    return res.status(200).json({ message: 'Student removed from the group successfully', data: group });
  
});

export const deleteMaterialFromGroup = asynchandlier(async (req, res, next) => {
 
    const group = await GroupModel.findByIdAndUpdate(
      req.params.groupId,
      { $pull: { materials: req.body.materialId } },
      { new: true }
    );

    if (!group) {
      return next(new Error("Group not found or materialId not found in the group"));
    }

    res.status(200).json({ message: 'Material removed from the group successfully', data: group });
  
});


export const getStudentsInGroup = asynchandlier(async (req, res, next) => {
    const group = await GroupModel.findById(req.params.groupId)
      .populate('students', 'firstName lastName email') 
      .exec();

    if (!group) {
      return next(new Error("Group not found"));

    }

    res.status(200).json({ data: group.students });
});



export const getMaterialsByUserInGroup = async (req, res) => {
  const authenticatedUserId = req.user._id;

 
    const group = await GroupModel.findById(req.params.groupId)
      .populate({
        path: 'materials',
        model: 'Course',
        select: 'title course_imageId description lectureIds',
        populate: {
          path: 'lectureIds',
          model: 'lecture',
          select: '-_id -CourseId -CreatedBy -objectives' 
        }
      })
      .exec();

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const isAuthorized =
      group.students.some(student => student._id.toString() === authenticatedUserId) ||
      group.instructor.toString() === authenticatedUserId ||
      req.user.role === 'Admin';

    if (!isAuthorized) {
      return res.status(403).json({ error: 'You are not authorized to access materials in this group' });
    }

    const materials = group.materials;
    res.status(200).json({ data: materials });
 
};


