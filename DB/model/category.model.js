import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    recommended: {
        type: Boolean,
        default: false
    },
    image: String,
    imageId: String

}, { timestamps: true });

const CategoryModel = mongoose.model('category', categorySchema);

export default CategoryModel;
