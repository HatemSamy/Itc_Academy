import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    code: {
        type: Number,
        required: true,
        unique: true 
      },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor', 
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  }],
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' 
  }]
},{ timestamps: true });

const GroupModel = mongoose.model('Group', groupSchema);

export default GroupModel;
