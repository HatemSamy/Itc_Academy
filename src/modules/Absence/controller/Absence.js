import AbsenceModel from "../../../../DB/model/Absence.model.js";
import GroupModel from "../../../../DB/model/Group.model.js";
import LectureModel from "../../../../DB/model/lectuers.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";


export const recordAbsences = asynchandlier(async (req, res) => {
          const instructor= req.user._id
          const { absentStudents, lectureId} = req.body;
          const { groupId } = req.params;

          const absenceCount = absentStudents.length;
      
          const Group= await GroupModel.findById(groupId)
          if (!Group) {
            return next(new Error("group not found"))
          }
          const Lecture= await LectureModel.findById(lectureId)
          if (!Lecture) {
            return next(new Error("Lecture not found"))
          }
          // Create a new absence record
          const newAbsence = new AbsenceModel({
            absentStudents,
            groupId,
            instructor,
            lectureId,
            count: absenceCount
          });
      
          await newAbsence.save();
      
          res.status(201).json(newAbsence);
        
      });
  


export const getAbsencesForLecture = asynchandlier(async (req, res) => {
    const { lectureId } = req.params;
    const absences = await AbsenceModel.find({ lecture: lectureId })
      .populate({
        path: 'lectureId',
        model:'lecture',
        select: 'name description', 
      })
      .populate({
        path: 'groupId',
        model:'Group',
        select: 'code title', 
      })
      .populate({
        path: 'absentStudents',
        model:'user',
        select: 'firstName lastName email',
      })
      .exec();
      
    if (absences.length === 0) {
      return res.status(404).json({ message: "No absences found for this lecture" });
    }

    res.status(200).json({ message: `Absences report for lecture ${absences[0].lectureId.name}`, data: absences });
  
});


  