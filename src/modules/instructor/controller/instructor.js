import UserModel from "../../../../DB/model/user.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";
import { deleteOldImage } from "../../../services/multer.js";



export const UpdateInstructor =(async (req, res, next) => {
   
        const { id } = req.params;
        
        const Instructor = await UserModel.findById(id)
        if (!Instructor) {
            return new Error('instructor not found');  
            
        } else {
            
        }

        if (req.file) {
            if (Instructor.imageUrl) {
                await deleteOldImage(Instructor.imageUrl)  
            }
           
            req.body.imageId = req.file.filename;
            req.body.imageUrl = req.file.path;
          
        }
        const instructor = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.json({ message: 'Instructor updated successfully', data: instructor });
    
   
})

// Function to activate an instructor by admin
export const activateInstructor = asynchandlier(async (req, res) => {
    const { instructorId } = req.params;
    const {ActiveStatus}= req.body
        const user = await UserModel.findById(instructorId);

        if (user && user.role === 'instructor') {
            user.active = ActiveStatus;
            await user.save();
            return res.status(200).json({ message: 'Instructor activated successfully',InstructorId:user._id });
        } else {
            return res.status(404).json({ message: 'Instructor not found or already active' });
        }
   
});


export const getInstructor= asynchandlier(async (req, res,next) => {

        const instructors = await UserModel.find();
    if (!instructors) {
       return next (new Error("Not found instructors Data"))
    }
        res.json({message:"instructors Data", data: instructors });

})


export const getInstructorById= asynchandlier(async (req, res,next) => {
        const { id } = req.params;

        const instructor = await UserModel.findById(id);
        if (!instructor) {
            return next(new Error('Instructor not found' ));
        }

        res.json({message:"instructors Data", data: instructor });
        
   
})



export const DeleteInstructor= asynchandlier( async (req, res) => {

        const { id } = req.params;

        const instructor = await UserModel.findById(id);

        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }
         if (instructor.imageUrl) {
            await deleteOldImage(instructor.imageUrl)  
        }
        await instructor.remove();
        res.json({ message: 'Instructor deleted successfully' });
    
})