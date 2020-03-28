import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema({
  status: {
    type: String,
    default: 'ON'
  },
  regNum: {
    type: String,
    required: false
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  intake: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  shift: {
    type: String,
    required: true
  },
  startMonth: {
    type: String,
    required: true
  }
});

export default mongoose.model('Student', StudentSchema);
