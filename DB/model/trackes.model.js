import mongoose from "mongoose";

const trackesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    diplomaName: String,
    serviceType: String,
    servicePrice: Number,
    serviceTime: Number
}, { timestamps: true });

const TrackModel = mongoose.model('tracke', trackesSchema);

export default TrackModel;
