import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
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
  role: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  }
});

export default mongoose.model('User', UserSchema);
