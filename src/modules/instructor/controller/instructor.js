import InstructorModel from "../../../../DB/model/Instructor.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";
import { deleteOldImage } from "../../../services/multer.js";
import bcrypt from "bcryptjs"





// Function to create a new instructor
export const InstructorSiginUp = async (req, res, next) => {
        const { email } = req.body;
        
        // Check if instructor with the given email already exists
        const instructor = await InstructorModel.findOne({ email });
        if (instructor) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // If a file is uploaded, handle it accordingly
        if (req.file) {
            req.body.imageId = req.file.filename; // Assuming you're storing file name
            req.body.imageUrl = req.file.path; // Assuming you're storing file path
        }
        const HashPassword= await bcrypt.hashSync(req.body.password, parseInt(process.env.SALTROUND))
          req.body.password = HashPassword
        const newInstructor = await InstructorModel.create(req.body);

        
        // Sending success response
        res.json({ message: 'Instructor has been created successfully', data: newInstructor });
 
};



export const UpdateInstructor =(async (req, res, next) => {
   
        const { id } = req.params;
        
        const Instructor = await InstructorModel.findById(id)
        if (!Instructor) {
            return new Error('instructor not found');  
            
        } else {
            
        }

        if (req.file) {
            // If a new image file is uploaded, update the image field
            if (Instructor.imageUrl) {
                await deleteOldImage(Instructor.imageUrl)  
            }
           
            req.body.imageId = req.file.filename;
            req.body.imageUrl = req.file.path;
          
        }

        // Find the instructor by ID and update the fields
        const instructor = await InstructorModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.json({ message: 'Instructor updated successfully', data: instructor });
    
   
})


export const updateInstructorApprovalStatus = asynchandlier(async (req ,res,next) => {
   const {instructorId}= req.params
   const {approvalStatus}= req.body
        const instructor = await InstructorModel.findById(instructorId);
        if (!instructor) {
            throw new Error('Instructor not found');
        }
        instructor.approved = approvalStatus;
        await instructor.save();
        res.status(201).json({ message: 'approvalStatus updeated successfully', approvalStatus: instructor.approved});


});



export const getInstructor= asynchandlier(async (req, res,next) => {
  
        // Fetch all instructors from the database
        const instructors = await InstructorModel.find();
    if (!instructors) {
       return next (new Error("Not found instructors Data"))
    }
        // Return the list of instructors in the response
        res.json({message:"instructors Data", data: instructors });

})


export const getInstructorById= asynchandlier(async (req, res,next) => {
    
        // Extract the instructor ID from the request parameters
        const { id } = req.params;

        // Find the instructor by ID in the database
        const instructor = await InstructorModel.findById(id);

        // If instructor not found, return a 404 Not Found response
        if (!instructor) {
            return next(new Error('Instructor not found' ));
        }

        // Return the instructor in the response
        res.json({message:"instructors Data", data: instructor });
        
   
})



export const DeleteInstructor= asynchandlier( async (req, res) => {
    
        // Extract the instructor ID from the request parameters
        const { id } = req.params;

        // Find the instructor by ID in the database
        const instructor = await InstructorModel.findById(id);

        // If instructor not found, return a 404 Not Found response
        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }


         // If a new image file is uploaded, update the image field
         if (instructor.imageUrl) {
            await deleteOldImage(instructor.imageUrl)  
        }
        // Delete the instructor from the database
        await instructor.remove();

        // Return a success message in the response
        res.json({ message: 'Instructor deleted successfully' });
    
})