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
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "service"
    },
    lectureLink: String,
    labNo: String,
    academicName: String,
    hours: Number,
    objectives: [String]
}, { timestamps: true });

const LectureModel = mongoose.model('lecture', lectureSchema);

export default LectureModel;
