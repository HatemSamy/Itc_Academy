import GroupModel from "../../../../DB/model/Group.model.js"
import ReviewModel from "../../../../DB/model/review.model.js"
import { asynchandlier } from "../../../services/erroeHandling.js"


export const review = asynchandlier(async (req, res, next) => {

    const studentId = req.user._id
    console.log(studentId);

    const { courseMaterialRating, instructorRating, placeRating, groupId, comments } = req.body

    const group = await GroupModel.findById(groupId)
    if (!group) {
        return res.status(404).json({ message: "group not found" })
    }

    const studentExists = group.students.includes(studentId);
    if (!studentExists) {
        return res.status(400).json({ message: "Student is not part of the group" });
    }

    const checkreview = await ReviewModel.findOne({ studentId, groupId })
    if (checkreview) {

        return next(new Error("you are aready review"))
    }

    const review = await ReviewModel.create({
        GroupId: groupId,
        studentId,
        instructorId: group.instructor,
        CourseId:group.materials,
        courseMaterialRating,
        instructorRating,
        placeRating,
        GroupCode: group.code,
        
        comments

    })

    return res.status(400).json({ message: "review Add Successfuly", review });


})


export const Getreview = asynchandlier(async (req, res, next) => {

    const { courseId } = req.params

  const checkReview = await ReviewModel.find({ CourseId: courseId })
  .populate('instructorId', 'firstName -_id') 
  .populate('CourseId', 'title , course_imageId , description -_id').select('-createdAt -updatedAt -GroupCode'); 

if (checkReview.length === 0) {
  return res.status(404).json({ error: "No reviews found for this course" });
}


    return res.status(400).json({ message: `review for ${courseId}`, checkReview });


})
