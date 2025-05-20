import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import classReducer from './fclass/fclassSlice.js';
import sectionReducer from './sectionRelated/sectionSlice.js';
import subjectSlice from './subjectRelated/subjectSlice.js';
import complaintReducer from "./FrontOffice/Enquiry/complaintSlice.js";
import admissionEnquiryReducer from './FrontOffice/Enquiry/admissionEnquirySlice.js';
import postalDispatchReducer from './FrontOffice/Enquiry/postalDispatchSlice.js';
import postalReceiveReducer from './FrontOffice/Enquiry/postalReceiveSlice.js';
import phoneCallLogsReducer from "./FrontOffice/Enquiry/phoneSlice";
import frontOfficeReducer from './FrontOffice/Enquiry/frontOfficeSlice.js';
import visitorReducer from './FrontOffice/Enquiry/VisitorSlice.js';
import incomeReducer from './IncomeRelated/IncomeSlice.js';
import expenseReducer from "./expenseRelated/expenseSlice.js";
import expenseHeadReducer from "./expenseRelated/expenseHeadSlice.js";

// import { librariansReducer } from './librarianrelated/librarianSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complaint: complainReducer,
        sclass: sclassReducer,
        fclass: classReducer,
        sections: sectionReducer,
        subject: subjectSlice, 
        complaints: complaintReducer,
        admissionEnquiry: admissionEnquiryReducer,
        postalDispatch: postalDispatchReducer,
        postalReceive: postalReceiveReducer,
        phoneCallLogs: phoneCallLogsReducer,
        frontOffice: frontOfficeReducer,
         visitor: visitorReducer,
         income: incomeReducer,
         expense: expenseReducer,
         expenseHead: expenseHeadReducer,
        // librarians: librariansReducer, // ✅ Key should match useSelector()
    },
});

export default store;
