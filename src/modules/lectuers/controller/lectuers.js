
import fs from 'fs';
import LectureModel from "../../../../DB/model/lectuers.model.js";
import ServiceModel from "../../../../DB/model/services.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";



export const createLectureWithFiles = asynchandlier(async (req, res, next) => {
    const { serviceId } = req.params;
    try {
        // Check if the service exists
        const service = await ServiceModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Extract lecture data from the request body
        const { name, description, labNo, academicName, hours, objectives } = req.body;
        
        // Get file paths from the request object
        const videoPath = req.files['video'] ? req.files['video'][0].path : null;
        const audioPath = req.files['audio'] ? req.files['audio'][0].path : null;
        const pdfPath = req.files['pdf'] ? req.files['pdf'][0].path : null;

        // Create a new lecture document with file paths
        const newLecture = new LectureModel({
            name,
            description,
            video: videoPath,
            audio: audioPath,
            pdf: pdfPath,
            serviceId,
            labNo,
            academicName,
            hours,
            objectives
        });

        // Save the new lecture to the database
        const createdLecture = await newLecture.save();

        // Return the newly created lecture as a response
        res.status(201).json({ message: 'Lecture created successfully', data: createdLecture });
    } catch (error) {
        console.error('Error creating lecture:', error);
        res.status(500).json({ message: 'Error creating lecture', error });
    }
})


// *****************************************************

export const getAllLecturers = async (req, res) => {
    try {
        const lectures = await LectureModel.find({});
        res.json({ message: 'This is All Lecturers', data: lectures });
    } catch (error) {
        console.error('Error fetching lectures:', error);
        res.status(500).json({ message: 'Error fetching lectures', error });
    }
};

 
export const getSpecificLecturer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lecturer = await LectureModel.findById(id);
        if (!lecturer) {
            return next(new AppError('Lecturer Not Found', 404));
        }
        res.json({ message: 'Success', data: lecturer });
    } catch (error) {
        console.error('Error fetching specific lecturer:', error);
        res.status(500).json({ message: 'Error fetching specific lecturer', error });
    }
};


const deleteOldFile = async (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.promises.unlink(filePath);
            console.log('Old file deleted successfully');
        } else {
            console.log('Old file not found');
        }
    } catch (error) {
        console.error('Error deleting old file:', error);
        res.status(500).json({ message: 'Error deleting old file', error });
    
    }
};


export const updateLecture = asynchandlier(async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        // Check if the lecture exists
        let lecture = await LectureModel.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Update file paths if new files are provided
        if (req.files) {
            const videoFile = req.files['video'] ? req.files['video'][0] : null;
            const audioFile = req.files['audio'] ? req.files['audio'][0] : null;
            const pdfFile = req.files['pdf'] ? req.files['pdf'][0] : null;

            if (videoFile) {
                // Delete old video file if it exists
                deleteOldFile(lecture.video);
                lecture.video = videoFile.path;
            }

            if (audioFile) {
                // Delete old audio file if it exists
                deleteOldFile(lecture.audio);
                lecture.audio = audioFile.path;
            }

            if (pdfFile) {
                // Delete old pdf file if it exists
                deleteOldFile(lecture.pdf);
                lecture.pdf = pdfFile.path;
            }
        }

        // Update other lecture fields
        Object.assign(lecture, req.body);

        // Save the updated lecture to the database
        const updatedLecture = await lecture.save();

        // Return the updated lecture as a response
        res.status(200).json({ message: 'Lecture updated successfully', data: updatedLecture });
    } catch (error) {
        console.error('Error updating lecture:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});


export const deleteLecture = asynchandlier(async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        // Check if the lecture exists
        const lecture = await LectureModel.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Delete lecture files if they exist
        if (lecture.video) {
            deleteOldFile(lecture.video);
        }
        if (lecture.audio) {
            deleteOldFile(lecture.audio);
        }
        if (lecture.pdf) {
            deleteOldFile(lecture.pdf);
        }

        // Delete the lecture document from the database
        await LectureModel.findByIdAndDelete(lectureId);

        res.status(200).json({ message: 'Lecture deleted successfully' });
    } catch (error) {
        console.error('Error deleting lecture:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

