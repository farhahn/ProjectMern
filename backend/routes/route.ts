const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.ts');

// const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.ts');
const { complainCreate, complainList } = require('../controllers/complain-controller.ts');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.ts');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.ts');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.ts');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.ts');
const { 
    librarianRegister, 
    librarianLogIn, 
    getLibrarians, 
    getLibrarianDetail, 
    deleteLibrarian 
} = require("../controllers/librarian-controller.ts");

// const { 
//     createSubjectGroup, 
//     getSubjectGroups, 
//     getSubjectGroupById, 
//     updateSubjectGroup, 
//     deleteSubjectGroup 
//   } = require('../controllers/subjectGroupController.ts');
  
//   router.post("/subjectgroups", createSubjectGroup);
//   router.get("/subjectgroups", getSubjectGroups);
//   router.get("/subjectgroups/:id", getSubjectGroupById);
//   router.put("/subjectgroups/:id", updateSubjectGroup);
//   router.delete("/subjectgroups/:id", deleteSubjectGroup);

      
const {
    getComplaints,
    addComplaint,
    updateComplaint,
    deleteComplaint,
  } = require('../controllers/complaintController');
  
  router.get('/complaints/:adminID', getComplaints);
  router.post('/complaint', addComplaint);
  router.put('/complaint/:id', updateComplaint);
  router.delete('/complaint/:id', deleteComplaint);

const classController = require('../controllers/fclass-controller');
const sectionController = require('../controllers/section-controller');


// Class Routes
router.get('/classes/:adminID', classController.getClasses);
router.post('/class', classController.addClass);
router.put('/class/:id', classController.updateClass);
router.delete('/class/:id', classController.deleteClass);

// Section Routes
router.get('/sections/:adminID', sectionController.getSections);
router.post('/section', sectionController.addSection);
router.put('/section/:id', sectionController.updateSection);
router.delete('/section/:id', sectionController.deleteSection);

const admissionEnquiryController = require('../controllers/admissionEnquiry-controller');

console.log('Registering admission-enquiry routes');
router.get('/admission-enquiries/:adminID', admissionEnquiryController.getAdmissionEnquiries);
router.post('/admission-enquiry', admissionEnquiryController.addAdmissionEnquiry);
router.put('/admission-enquiry/:id', admissionEnquiryController.updateAdmissionEnquiry);
router.delete('/admission-enquiry/:id', admissionEnquiryController.deleteAdmissionEnquiry);
const multer = require('multer');
const path = require('path');
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed'));
  },
});
const postalDispatchController = require('../controllers/postalDispatch-controller');
router.get('/postal-dispatches/:adminID',  postalDispatchController.getPostalDispatches);
router.post('/postal-dispatch',  upload.single('document'), postalDispatchController.addPostalDispatch);
router.put('/postal-dispatch/:id',  upload.single('document'), postalDispatchController.updatePostalDispatch);
router.delete('/postal-dispatch/:id',  postalDispatchController.deletePostalDispatch);



const postalReceiveController = require('../controllers/postalReceive-controller');
router.get('/postal-receives/:adminID',  postalReceiveController.getPostalReceives);
router.post('/postal-receive',  upload.single('document'), postalReceiveController.addPostalReceive);
router.put('/postal-receive/:id',  upload.single('document'), postalReceiveController.updatePostalReceive);
router.delete('/postal-receive/:id',  postalReceiveController.deletePostalReceive);
const{
  getPhoneCallLogs,
  addPhoneCallLog,
  updatePhoneCallLog,
  deletePhoneCallLog,
} = require("../controllers/phoneController");

router.get("/phoneCallLogs/:adminID", getPhoneCallLogs);
router.post("/phoneCallLog", addPhoneCallLog);
router.put("/phoneCallLog/:id", updatePhoneCallLog);
router.delete("/phoneCallLog/:id", deletePhoneCallLog);

const {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/frontOfficeController');

// Routes
router.get('/entries/:adminID/:type', getEntries); // Get entries by type and admin
router.post('/entry', addEntry); // Add new entry
router.put('/entry/:id', updateEntry); // Update entry
router.delete('/entry/:id', deleteEntry); // Delete entry


const { getVisitors, addVisitor, updateVisitor, deleteVisitor } = require('../controllers/visitorController');

router.get('/visitors/:adminID', getVisitors);
router.post('/visitor', addVisitor);
router.put('/visitor/:id', updateVisitor);
router.delete('/visitor/:id', deleteVisitor);

const { getIncomes, addIncome, updateIncome, deleteIncome, searchIncomes } = require('../controllers/incomeController');

router.get('/incomes/:adminID', getIncomes);
router.get('/incomes/search/:adminID', searchIncomes);
router.post('/income', addIncome);
router.put('/income/:id', updateIncome);
router.delete('/income/:id', deleteIncome);


const {
  getIncomeHeads,
  addIncomeHead,
  updateIncomeHead,
  deleteIncomeHead,
} = require('../controllers/incomeHeadController');

router.get('/income-heads/:adminID', getIncomeHeads);
router.post('/income-head', addIncomeHead);
router.put('/income-head/:id', updateIncomeHead);
router.delete('/income-head/:id', deleteIncomeHead);

const expenseController = require('../controllers/expenseController');

console.log('Registering expense routes');
router.get('/expenses/:adminID', expenseController.getExpenses);
router.post('/expense', upload.single('attachedFile'), expenseController.addExpense);
router.put('/expense/:id', upload.single('attachedFile'), expenseController.updateExpense);
router.delete('/expense/:id', expenseController.deleteExpense);


// const { getExpenseHeads, addExpenseHead } = require('../controllers/expenseHeadController');

// router.get('/expense-heads/:adminID', getExpenseHeads);
// router.post('/expense-head', addExpenseHead);




const expenseHeadController = require('../controllers/expense-head-controller');

console.log('Registering expense head routes');
router.get('/expense-heads/:adminID', expenseHeadController.getExpenseHeads);
router.post('/expense-head', expenseHeadController.addExpenseHead);
router.put('/expense-head/:id', expenseHeadController.updateExpenseHead);
router.delete('/expense-head/:id', expenseHeadController.deleteExpenseHead);

const transportRouteController = require('../controllers/route-controller');

router.get('/transport-routes/:adminID', transportRouteController.getTransportRoutes);
router.post('/transport-route', transportRouteController.addTransportRoute);
router.put('/transport-route/:id', transportRouteController.updateTransportRoute);
router.delete('/transport-route/:id', transportRouteController.deleteTransportRoute);

const vehicleController = require('../controllers/vehicle-controller');

// Vehicle Routes
router.get('/vehicles/:adminID', vehicleController.getVehicles);
router.post('/vehicle', vehicleController.addVehicle);
router.put('/vehicle/:id', vehicleController.updateVehicle);
router.delete('/vehicle/:id', vehicleController.deleteVehicle);


const assignmentController = require('../controllers/assignment-controller');

router.get('/assignments/:adminID', assignmentController.getAssignments);
router.post('/assignment', assignmentController.addAssignment);
router.put('/assignment/:id', assignmentController.updateAssignment);
router.delete('/assignment/:id', assignmentController.deleteAssignment);


const pickupPointController = require('../controllers/pickup-point-controller');

router.get('/pickup-points/:adminID', pickupPointController.getPickupPoints);
router.post('/pickup-point', pickupPointController.addPickupPoint);
router.put('/pickup-point/:id', pickupPointController.updatePickupPoint);
router.delete('/pickup-point/:id', pickupPointController.deletePickupPoint);


const routePickupPointController = require('../controllers/route-pickup-point-controller');

router.get('/route-pickup-points/:adminID', routePickupPointController.getRoutePickupPoints);
router.post('/route-pickup-point', routePickupPointController.addRoutePickupPoint);
router.put('/route-pickup-point/:id', routePickupPointController.updateRoutePickupPoint);
router.delete('/route-pickup-point/:id', routePickupPointController.deleteRoutePickupPoint);



const studentController = require('../controllers/student-addmission-controller');

router.get('/students/:adminID', studentController.getStudents);
router.get('/student/:id', studentController.getStudentById);
router.post('/student', studentController.addStudent);
router.put('/student/:id', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

const searchStudentController = require('../controllers/search-student-controller');

router.get('/search-class/:adminID', searchStudentController.getClasses);
router.get('/search-student', searchStudentController.searchStudents);













// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

// router.post('/SclassCreate', sclassCreate);

// router.get('/SclassList/:id', sclassList);
// router.get("/Sclass/:id", getSclassDetail)

// router.get("/Sclass/Students/:id", getSclassStudents)

// router.delete("/Sclasses/:id", deleteSclasses)
// router.delete("/Sclass/:id", deleteSclass)

// Subject

// router.post('/SubjectCreate', subjectCreate);

// router.get('/AllSubjects/:id', allSubjects);
// router.get('/ClassSubjects/:id', classSubjects);
// router.get('/FreeSubjectList/:id', freeSubjectList);
// router.get("/Subject/:id", getSubjectDetail)

// router.delete("/Subject/:id", deleteSubject)
// router.delete("/Subjects/:id", deleteSubjects)
// router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

//librarian
 // ✅ `.ts` hata diya agar file `.js` hai

// ✅ Librarian Routes
router.post("/LibrarianReg", librarianRegister);
router.post("/LibrarianLogin", librarianLogIn);
router.get("/Librarians", getLibrarians);
router.get("/Librarian/:id", getLibrarianDetail);
router.delete("/Librarian/:id", deleteLibrarian);

//sections

// Section






module.exports = router;