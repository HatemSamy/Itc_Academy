import mongoose from 'mongoose';

const { Schema } = mongoose;

const AbsenceSchema = new Schema({
    absentStudents: [{
        type:Schema.Types.ObjectId,
        ref: 'user' 
      }],
  lectureId: { type: Schema.Types.ObjectId, ref: 'lecture', required: true },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
  count: { type: Number, default: 0 }
},{
    timeseries:true
});

const AbsenceModel = mongoose.model('Absence', AbsenceSchema);
export default AbsenceModel;


