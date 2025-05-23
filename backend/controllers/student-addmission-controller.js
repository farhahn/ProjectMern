const mongoose = require('mongoose');
const Student = require('../models/student-addmission-model');
const Fclass = require('../models/fclass-model');
const TransportRoute = require('../models/route-model');
const PickupPoint = require('../models/pickup-point-model');

exports.getStudents = async (req, res) => {
  try {
    const adminID = req.params.adminID;
    if (!mongoose.Types.ObjectId.isValid(adminID)) {
      console.error(`Invalid adminID format: ${adminID}`);
      return res.status(400).json({ message: 'Invalid adminID format' });
    }
    console.log(`Fetching students for adminID: ${adminID}`);
    const students = await Student.find({ admin: new mongoose.Types.ObjectId(adminID) })
      .populate('class', 'name')
      .populate('route', 'title')
      .populate('pickupPoint', 'name')
      .sort({ createdAt: -1 })
      .lean();
    console.log(`Found ${students.length} students for adminID: ${adminID}`);
    res.status(200).json({
      message: 'Students fetched successfully',
      data: students,
      count: students.length,
    });
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: 'Server error while fetching students', error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminID = req.query.adminID;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(adminID)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const student = await Student.findOne({ _id: id, admin: new mongoose.Types.ObjectId(adminID) })
      .populate('class', 'name')
      .populate('route', 'title')
      .populate('pickupPoint', 'name')
      .lean();
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log('Fetched student:', student); // Add logging to inspect data
    res.status(200).json({
      message: 'Student fetched successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error fetching student:', error.message);
    res.status(500).json({ message: 'Server error while fetching student', error: error.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const {
      admissionNo, rollNo, classId, section, firstName, lastName, gender, dob,
      routeId, pickupPointId, feesMonth, fees, parents, additionalDetails, adminID
    } = req.body;
    if (!admissionNo || !rollNo || !classId || !section || !firstName || !lastName || !gender || !dob || !parents?.father || !parents?.mother || !adminID) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!mongoose.Types.ObjectId.isValid(adminID) || !mongoose.Types.ObjectId.isValid(classId) ||
        (routeId && !mongoose.Types.ObjectId.isValid(routeId)) ||
        (pickupPointId && !mongoose.Types.ObjectId.isValid(pickupPointId))) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const existingStudent = await Student.findOne({ admissionNo, admin: new mongoose.Types.ObjectId(adminID) });
    if (existingStudent) {
      return res.status(400).json({ message: 'Admission number already exists' });
    }
    const classExists = await Fclass.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: 'Class not found' });
    }
    if (!classExists.sections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section for selected class' });
    }
    if (routeId) {
      const routeExists = await TransportRoute.findById(routeId);
      if (!routeExists) {
        return res.status(404).json({ message: 'Route not found' });
      }
    }
    if (pickupPointId) {
      const pointExists = await PickupPoint.findById(pickupPointId);
      if (!pointExists) {
        return res.status(404).json({ message: 'Pickup point not found' });
      }
    }
    const newStudent = new Student({
      admissionNo,
      rollNo,
      class: new mongoose.Types.ObjectId(classId),
      section,
      firstName,
      lastName,
      gender,
      dob: new Date(dob),
      route: routeId ? new mongoose.Types.ObjectId(routeId) : null,
      pickupPoint: pickupPointId ? new mongoose.Types.ObjectId(pickupPointId) : null,
      feesMonth,
      fees: fees?.map(fee => ({
        class: new mongoose.Types.ObjectId(classId),
        feeType: fee.feeType,
        dueDate: new Date(fee.dueDate),
        amount: parseFloat(fee.amount),
      })) || [],
      parents: {
        father: {
          name: parents.father.name,
          phone: parents.father.phone,
          occupation: parents.father.occupation,
        },
        mother: {
          name: parents.mother.name,
          phone: parents.mother.phone,
          occupation: parents.mother.occupation,
        },
      },
      additionalDetails: {
        aadharNumber: additionalDetails?.aadharNumber || '',
        panNumber: additionalDetails?.panNumber || '',
        tcNumber: additionalDetails?.tcNumber || '',
      },
      admin: new mongoose.Types.ObjectId(adminID),
    });
    await newStudent.save();
    const populatedStudent = await Student.findById(newStudent._id)
      .populate('class', 'name')
      .populate('route', 'title')
      .populate('pickupPoint', 'name')
      .lean();
    res.status(201).json({ message: 'Student added successfully', data: populatedStudent });
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.status(500).json({ message: 'Server error while adding student', error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const {
      admissionNo, rollNo, classId, section, firstName, lastName, gender, dob,
      routeId, pickupPointId, feesMonth, fees, parents, additionalDetails, adminID
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(adminID) || !mongoose.Types.ObjectId.isValid(classId) ||
        (routeId && !mongoose.Types.ObjectId.isValid(routeId)) ||
        (pickupPointId && !mongoose.Types.ObjectId.isValid(pickupPointId))) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const student = await Student.findOne({ _id: req.params.id, admin: new mongoose.Types.ObjectId(adminID) });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const existingStudent = await Student.findOne({
      admissionNo,
      admin: new mongoose.Types.ObjectId(adminID),
      _id: { $ne: req.params.id },
    });
    if (existingStudent) {
      return res.status(400).json({ message: 'Admission number already exists' });
    }
    const classExists = await Fclass.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: 'Class not found' });
    }
    if (!classExists.sections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section for selected class' });
    }
    if (routeId) {
      const routeExists = await TransportRoute.findById(routeId);
      if (!routeExists) {
        return res.status(404).json({ message: 'Route not found' });
      }
    }
    if (pickupPointId) {
      const pointExists = await PickupPoint.findById(pickupPointId);
      if (!pointExists) {
        return res.status(404).json({ message: 'Pickup point not found' });
      }
    }
    student.admissionNo = admissionNo || student.admissionNo;
    student.rollNo = rollNo || student.rollNo;
    student.class = new mongoose.Types.ObjectId(classId);
    student.section = section || student.section;
    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.gender = gender || student.gender;
    student.dob = dob ? new Date(dob) : student.dob;
    student.route = routeId ? new mongoose.Types.ObjectId(routeId) : student.route;
    student.pickupPoint = pickupPointId ? new mongoose.Types.ObjectId(pickupPointId) : student.pickupPoint;
    student.feesMonth = feesMonth || student.feesMonth;
    student.fees = fees?.map(fee => ({
      class: new mongoose.Types.ObjectId(classId),
      feeType: fee.feeType,
      dueDate: new Date(fee.dueDate),
      amount: parseFloat(fee.amount),
    })) || student.fees;
    student.parents = {
      father: {
        name: parents?.father?.name || student.parents.father.name,
        phone: parents?.father?.phone || student.parents.father.phone,
        occupation: parents?.father?.occupation || student.parents.father.occupation,
      },
      mother: {
        name: parents?.mother?.name || student.parents.mother.name,
        phone: parents?.mother?.phone || student.parents.mother.phone,
        occupation: parents?.mother?.occupation || student.parents.mother.occupation,
      },
    };
    student.additionalDetails = {
      aadharNumber: additionalDetails?.aadharNumber || student.additionalDetails.aadharNumber,
      panNumber: additionalDetails?.panNumber || student.additionalDetails.panNumber,
      tcNumber: additionalDetails?.tcNumber || student.additionalDetails.tcNumber,
    };
    await student.save();
    const populatedStudent = await Student.findById(student._id)
      .populate('class', 'name')
      .populate('route', 'title')
      .populate('pickupPoint', 'name')
      .lean();
    res.status(200).json({ message: 'Student updated successfully', data: populatedStudent });
  } catch (error) {
    console.error('Error updating student:', error.message);
    res.status(500).json({ message: 'Server error while updating student', error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const adminID = req.query.adminID;
    if (!mongoose.Types.ObjectId.isValid(adminID)) {
      return res.status(400).json({ message: 'Invalid adminID format' });
    }
    const student = await Student.findOneAndDelete({ _id: req.params.id, admin: new mongoose.Types.ObjectId(adminID) });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ message: 'Server error while deleting student', error: error.message });
  }
};