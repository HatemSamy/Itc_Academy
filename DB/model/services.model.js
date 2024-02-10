import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    image: String,
    imageUrl:String,
    typeOfService: {
        type: String,
        enum: ['Course', 'trak']
    }
}, { timestamps: true });

const ServiceModel = mongoose.model('service', serviceSchema);

export default ServiceModel;
