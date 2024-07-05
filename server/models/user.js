const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  token:{
    type:String,
  },
  cart:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Cart"
    }
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;