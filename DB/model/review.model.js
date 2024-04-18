import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    GroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    CourseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
       
    }],
    GroupCode: {
        type:Number
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  
    },
    placeRating: {
        type:Number,
        min:[1,"min is 1"],
        max:[5,"max is 5"],
        required:true
    },
    instructorRating: {
        type:Number,
        min:[1,"min is 1"],
        max:[5,"max is 5"],
        required:true
    },
    courseMaterialRating: {
        type:Number,
        min:[1,"min is 1"],
        max:[5,"max is 5"],
        required:true
    },
    comments: String,
   
},{
    timestamps:true
});

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
