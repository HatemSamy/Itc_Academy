import mongoose from 'mongoose';

const { Schema } = mongoose;

const SessionSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  CreatedBy: {
     type: mongoose.Types.ObjectId,
      required: true
     },
  groupId: {  
     type: mongoose.Types.ObjectId,
     ref:"Group",
     required: true 
},


});

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;
