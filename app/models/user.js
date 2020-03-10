const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 4,
    max: 16,
    required: true,
  },
});

mongoose.model('User', UserSchema);
