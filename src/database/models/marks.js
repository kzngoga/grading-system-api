import mongoose from 'mongoose';


const MarksSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  marksTest: {
    type: Number,
    required: false
  },
  marksExam: {
    type: Number,
    required: false
  },
  total: {
    type: Number,
    required: false
  },
  verdict: {
    type: String,
    required: false
  }
});

export default mongoose.model('Marks', MarksSchema);
