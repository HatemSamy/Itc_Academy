import mongoose, { Schema, model } from "mongoose";

// Define the schema for the Course model
const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    course_imageId: {
        type: String  
    },
    course_imageUrl:String ,

    description: {
        type: String,
        required: true
    },
    

    lectureIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: "lecture",
        }
    ],


serviceId: {
    type: mongoose.Types.ObjectId,
    ref: "service",
    required:true
},

    instructorId: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },


    total_duration: {
        type: String  
    },

    price: {
        type: Number,
        required: true
    },

    students_enrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],

    enrollment_count: {
        type: Number,
        default: 0  // Default value is set to 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,  // Minimum allowed value
        max: 5   // Maximum allowed value
    },
    approved: {
        type: Boolean,
        required:true,
        default: false
    },

    CreatedBy:{
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            text: String
        }
    ],

});


courseSchema.pre('remove', async function(next) {
    try {
        await this.model('Lecture').deleteMany({ _id: { $in: this.lectureIds } });
        next();
    } catch (error) {
        next(error);
    }
});



const CourseModel = model('Course', courseSchema)
export default CourseModel