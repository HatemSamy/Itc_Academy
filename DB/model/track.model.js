import mongoose, { Schema, model } from "mongoose";

// Define the schema for the Track model
const trackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    track_image: {
        type: String  
    },
    description: {
        type: String,
        required: true
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "service",
        required: true
    },
    content: [
        {
            cours: {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                lectures: [{
                    type: mongoose.Types.ObjectId,
                    ref: "lecture"
                }]
            }
        }
    ],
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
        default: 0  
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,  
        max: 5   
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

const TrackModel = model('Track', trackSchema)
export default TrackModel;
