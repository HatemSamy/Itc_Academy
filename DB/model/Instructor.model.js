import { Schema, model } from "mongoose";

// Define the schema for the Instructor model
const instructorSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    imageId:{
        type: String,

    },
    imageUrl:{
      type: String,
  },
 
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
        type: String,
        required:true,
        default:"instructor"
      },

      phone:{
        type:Number,
        required:true
      },
      approved: {
        type: Boolean,
        required:true,
        default: false
    },
    
    teach_field: {
        type: String,
        required: true
      },

    courses_taught: [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }],

  });
  

  const InstructorModel = model('Instructor',instructorSchema )
  export default InstructorModel