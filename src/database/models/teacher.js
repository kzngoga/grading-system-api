import mongoose from 'mongoose';

const TeacherSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  mobileNo: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
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

export default mongoose.model('Teacher', TeacherSchema);
