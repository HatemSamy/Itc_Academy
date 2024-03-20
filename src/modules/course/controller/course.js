import CourseModel from "../../../../DB/model/course.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";
import fs from "fs"
import { deleteOldImage } from "../../../services/multer.js";

export const CreateCourse = asynchandlier(async (req, res ,next) => {
 
     if (!req.file) {
      throw next(new Error('Image is required'));
  }
const course_imageId= req.file.filename;
const course_imageUrl = req.file.path;
    const {
      title,
      description,
      instructorId,
      total_duration,
      price,
   
    } = req.body;
    const CreatedBy= req.user._id

    const newCourse = new CourseModel({
      title,
      course_imageId,
      description,
      serviceId:req.params.serviceId ,
      total_duration,
      instructorId,
      course_imageUrl,
      price,
      CreatedBy
 
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({message:" coures has been created successfuly ",savedCourse}); 
 if (!savedCourse) {
  return next(new Error('cach_error'));
  
 }

});

export const UpdateCourse=  asynchandlier (async (req, res, next) => {
  const { id } = req.params;
    const course = await CourseModel.findOne({_id:id,CreatedBy:req.user._id});

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (req.file) {
      const image = req.file;
      const course_imageId = image.filename;
      const course_imageUrl = image.path;

      // Assign new image details to request body
      req.body.course_imageId = course_imageId;
      req.body.course_imageUrl = course_imageUrl;

      if ( fs.existsSync(course.course_imageUrl)) {
        await fs.promises.unlink(course.course_imageUrl);
        console.log('Old Image Deleted Successfully');
      } else {
        console.log('Old Image File Not Found');
      }
    }
    const updatedCourse = await CourseModel.findOneAndUpdate({_id:id,CreatedBy:req.user._id}, req.body, { new: true });

    if (!updatedCourse) {
      throw new Error(`Failed to update Course`);
    }else{

    res.json({ message: 'Updated Course', data: updatedCourse });
}
})

export const getCourses =asynchandlier (async (req, res, next) => {
    const courses = await CourseModel.find({approved:true});
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found ' });
    }
    res.json({ message: 'Courses retrieved successfully', data: courses });
 
});

export const getCourseById = async (req, res, next) => {
    const { id } = req.params;
    const course = await CourseModel.findById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ message: 'Course retrieved successfully', data: course });

};

export const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findOne({_id:id,CreatedBy:req.user._id});

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await deleteOldImage(course.course_imageUrl);

    await CourseModel.findByIdAndDelete(id);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course by ID:', error);
    next(error); // Pass error to the error handling middleware
  }
};

export const updateCourseApprovalStatus =asynchandlier(async (req, res) => {
   
        const { courseId } = req.params;
        const { approvalStatus } = req.body;
        const course = await CourseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        course.approved = approvalStatus;
        await course.save();
        res.json({ message: 'Course approved successfully' });
  
})
export const review = asynchandlier(async (req, res) => {
      const { CourseId } = req.params; 
      const { id } = req.user._id
      const { text } = req.body;

      const course = await CourseModel.findById(CourseId);
      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }
      // Check if the student is enrolled in the course
      const isEnrolled = CourseModel.students_enrolled.some(enrolledStudentId => enrolledStudentId.equals(id));
      if (!isEnrolled) {
          return res.status(403).json({ error: 'You are not enrolled in this course' });
      }
      course.reviews.push({ student: studentId, text });

      await course.save();

      res.json({ message: 'Review added successfully' });
  
})

export const rating = asynchandlier( async (req, res) => {
      const { CourseId } = req.params; 
      const{id}= req.user._id
      const { rating } = req.body; 

      const course = await CourseModel.findById(CourseId);
      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }
      const isEnrolled = await CourseModel.students_enrolled.some(enrolledStudentId => enrolledStudentId.equals(id));
      if (!isEnrolled) {
          return res.status(403).json({ error: 'You are not enrolled in this course' });
      }
      course.rating = rating;

      await course.save();
      res.json({ message: 'Course rating updated successfully' });
 
});





