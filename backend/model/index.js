const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  lectures: [{
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    uploadDocument: {
      type: String
    },
    students: [{
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }]
  }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
