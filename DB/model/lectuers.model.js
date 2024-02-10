import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    video: String,
    pdf: String,
    audio: String,
    CourseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Instructor"
    },
    lectureLink: String,
    labNo: String,
    hours: Number,
    objectives: [String]
}, { timestamps: true });

const LectureModel = mongoose.model('lecture', lectureSchema);

export default LectureModel;
