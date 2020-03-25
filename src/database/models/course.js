import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalMarks: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'ON'
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }
});

export default mongoose.model('Course', CourseSchema);
