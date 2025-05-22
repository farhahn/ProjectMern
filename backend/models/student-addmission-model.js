const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fclass',
    required: true,
  },
  feeType: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
});

const additionalDetailsSchema = new mongoose.Schema({
  aadharNumber: {
    type: String,
    trim: true,
  },
  panNumber: {
    type: String,
    trim: true,
  },
  tcNumber: {
    type: String,
    trim: true,
  },
});

const studentSchema = new mongoose.Schema({
  admissionNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  rollNo: {
    type: String,
    required: true,
    trim: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fclass',
    required: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransportRoute',
  },
  pickupPoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PickupPoint',
  },
  feesMonth: {
    type: String,
    trim: true,
  },
  fees: [feeSchema],
  parents: {
    father: parentSchema,
    mother: parentSchema,
  },
  additionalDetails: additionalDetailsSchema,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);