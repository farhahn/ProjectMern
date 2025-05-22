import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Collapse,Alert,Snackbar } from '@mui/material';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createStudent, clearStudentError } from '../../redux/StudentAddmissionDetail/studentAddmissionHandle';
import { getAllFclasses } from '../../redux/fclass/fclassHandle';
import { getAllSections } from '../../redux/sectionRelated/sectionHandle';
import { getAllTransportRoutes } from '../../redux/TransportRelated/routeHandle';
import { getAllPickupPoints } from '../../redux/TransportRelated/PickupPointAction';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  background: '#fff',
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const ImportButton = styled(Button)({
  background: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  '&:hover': {
    background: '#0056b3',
  },
});

const GridSection = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
  marginBottom: '15px',
});

const Input = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
});

const SelectInput = styled(Select)({
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
});

const FeeSection = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '5px',
  marginBottom: '10px',
  padding: '10px',
  background: '#f9f9f9',
});

const FeeHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
});

const ToggleButton = styled(Button)({
  background: 'none',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  minWidth: 'auto',
});

const FeeGrid = styled(Box)({
  marginTop: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
});

const SaveButton = styled(Button)({
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  background: '#28a745',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  '&:hover': {
    background: '#218838',
  },
});

const StudentAdmissionForm = () => {
  const [formData, setFormData] = useState({
    admissionNo: '',
    rollNo: '',
    classId: '',
    section: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    routeId: '',
    pickupPointId: '',
    feesMonth: '',
    fees: [{ feeType: '', dueDate: '', amount: '' }],
    parents: {
      father: { name: '', phone: '', occupation: '' },
      mother: { name: '', phone: '', occupation: '' },
    },
    additionalDetails: {
      aadharNumber: '',
      panNumber: '',
      tcNumber: '',
    },
  });
  const [feesVisible, setFeesVisible] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const fclassState = useSelector((state) => state.fclass || { fclassesList: [], loading: false, error: null });
  const sectionState = useSelector((state) => state.sections || { sectionsList: [], error: null });
  const transportRouteState = useSelector((state) => state.transportRoute || { transportRoutesList: [], error: null });
  const pickupPointState = useSelector((state) => state.pickupPoint || { pickupPointsList: [], error: null });
  const studentState = useSelector((state) => state.student || { error: null });
  const userState = useSelector((state) => state.user || {});
  const { fclassesList } = fclassState;
  const { sectionsList } = sectionState;
  const { transportRoutesList } = transportRouteState;
  const { pickupPointsList } = pickupPointState;
  const { error: studentError } = studentState;
  const adminID = userState.currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllFclasses(adminID));
      dispatch(getAllSections(adminID));
      dispatch(getAllTransportRoutes(adminID));
      dispatch(getAllPickupPoints(adminID));
    } else {
      setSnack({ open: true, message: 'Please log in to access the form', severity: 'error' });
    }
  }, [dispatch, adminID]);

  useEffect(() => {
    if (studentError) {
      setSnack({ open: true, message: studentError, severity: 'error' });
      dispatch(clearStudentError());
    }
  }, [studentError, dispatch]);

  const handleInputChange = (e, section, subSection) => {
    const { name, value } = e.target;
    if (subSection) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: {
            ...prev[section][subSection],
            [name]: value,
          },
        },
      }));
    } else if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeeChange = (index, field, value) => {
    setFormData((prev) => {
      const newFees = [...prev.fees];
      newFees[index] = { ...newFees[index], [field]: value };
      return { ...prev, fees: newFees };
    });
  };

  const addFee = () => {
    setFormData((prev) => ({
      ...prev,
      fees: [...prev.fees, { feeType: '', dueDate: '', amount: '' }],
    }));
  };

  const removeFee = (index) => {
    setFormData((prev) => ({
      ...prev,
      fees: prev.fees.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!adminID) {
      setSnack({ open: true, message: 'Please log in to submit the form', severity: 'error' });
      return;
    }
    if (!formData.admissionNo || !formData.rollNo || !formData.classId || !formData.section || !formData.firstName || !formData.lastName || !formData.gender || !formData.dob || !formData.parents.father.name || !formData.parents.mother.name) {
      setSnack({ open: true, message: 'Required fields are missing', severity: 'warning' });
      return;
    }
    const selectedClass = fclassesList.find((cls) => cls._id === formData.classId);
    if (!selectedClass?.sections.includes(formData.section)) {
      setSnack({ open: true, message: 'Invalid section for selected class', severity: 'warning' });
      return;
    }
    // Filter out incomplete fees
    const validFees = formData.fees.filter(fee => fee.feeType && fee.dueDate && fee.amount);
    dispatch(createStudent({ ...formData, fees: validFees, classId: formData.classId }, adminID))
      .then(() => {
        setSnack({ open: true, message: 'Student added successfully', severity: 'success' });
        setFormData({
          admissionNo: '',
          rollNo: '',
          classId: '',
          section: '',
          firstName: '',
          lastName: '',
          gender: '',
          dob: '',
          routeId: '',
          pickupPointId: '',
          feesMonth: '',
          fees: [{ feeType: '', dueDate: '', amount: '' }],
          parents: {
            father: { name: '', phone: '', occupation: '' },
            mother: { name: '', phone: '', occupation: '' },
          },
          additionalDetails: {
            aadharNumber: '',
            panNumber: '',
            tcNumber: '',
          },
        });
        setFeesVisible(false);
      })
      .catch((err) => {
        setSnack({ open: true, message: err.message || 'Failed to add student', severity: 'error' });
      });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  const selectedClass = fclassesList.find((cls) => cls._id === formData.classId);

  return (
    <FormContainer>
      <Header>
        <Typography variant="h5" sx={{ margin: 0 }}>
          🎓 Student Admission
        </Typography>
        <ImportButton>📂 Import Student</ImportButton>
      </Header>

      <GridSection>
        <Input
          name="admissionNo"
          value={formData.admissionNo}
          onChange={handleInputChange}
          placeholder="Admission No"
          inputRef={(el) => (inputRefs.current[0] = el)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
        />
        <Input
          name="rollNo"
          value={formData.rollNo}
          onChange={handleInputChange}
          placeholder="Roll No"
          inputRef={(el) => (inputRefs.current[1] = el)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
        />
        <FormControl>
          <InputLabel>Class</InputLabel>
          <SelectInput
            name="classId"
            value={formData.classId}
            onChange={(e) => handleInputChange(e)}
            inputRef={(el) => (inputRefs.current[2] = el)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {fclassesList.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>{cls.name}</MenuItem>
            ))}
          </SelectInput>
        </FormControl>
        <FormControl>
          <InputLabel>Section</InputLabel>
          <SelectInput
            name="section"
            value={formData.section}
            onChange={(e) => handleInputChange(e)}
            inputRef={(el) => (inputRefs.current[3] = el)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            disabled={!formData.classId}
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {selectedClass?.sections.map((sec) => (
              <MenuItem key={sec} value={sec}>{sec}</MenuItem>
            ))}
          </SelectInput>
        </FormControl>
      </GridSection>

      <GridSection>
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          inputRef={(el) => (inputRefs.current[4] = el)}
          onKeyDown={(e) => handleKeyDown(e, 4)}
        />
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          inputRef={(el) => (inputRefs.current[5] = el)}
          onKeyDown={(e) => handleKeyDown(e, 5)}
        />
        <FormControl>
          <InputLabel>Gender</InputLabel>
          <SelectInput
            name="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange(e)}
            inputRef={(el) => (inputRefs.current[6] = el)}
            onKeyDown={(e) => handleKeyDown(e, 6)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </SelectInput>
        </FormControl>
        <Input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleInputChange}
          placeholder="DOB"
          inputRef={(el) => (inputRefs.current[7] = el)}
          onKeyDown={(e) => handleKeyDown(e, 7)}
        />
      </GridSection>

      <GridSection>
        <FormControl>
          <InputLabel>Route List</InputLabel>
          <SelectInput
            name="routeId"
            value={formData.routeId}
            onChange={(e) => handleInputChange(e)}
            inputRef={(el) => (inputRefs.current[8] = el)}
            onKeyDown={(e) => handleKeyDown(e, 8)}
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {transportRoutesList.map((route) => (
              <MenuItem key={route._id} value={route._id}>{route.title}</MenuItem>
            ))}
          </SelectInput>
        </FormControl>
        <FormControl>
          <InputLabel>Pickup Point</InputLabel>
          <SelectInput
            name="pickupPointId"
            value={formData.pickupPointId}
            onChange={(e) => handleInputChange(e)}
            inputRef={(el) => (inputRefs.current[9] = el)}
            onKeyDown={(e) => handleKeyDown(e, 9)}
            disabled={!formData.routeId}
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {pickupPointsList.map((point) => (
              <MenuItem key={point._id} value={point._id}>{point.name}</MenuItem>
            ))}
          </SelectInput>
        </FormControl>
        <Input
          name="feesMonth"
          value={formData.feesMonth}
          onChange={handleInputChange}
          placeholder="Fees Month"
          inputRef={(el) => (inputRefs.current[10] = el)}
          onKeyDown={(e) => handleKeyDown(e, 10)}
        />
      </GridSection>

      <Typography variant="h6" sx={{ mb: 2 }}>
        💰 Fees Details
      </Typography>
      {formData.classId && (
        <FeeSection>
          <FeeHeader onClick={() => setFeesVisible(!feesVisible)}>
            <Typography>{selectedClass?.name} Fees</Typography>
            <ToggleButton>
              {feesVisible ? <FaMinus /> : <FaPlus />}
            </ToggleButton>
          </FeeHeader>
          <Collapse in={feesVisible}>
            {formData.fees.map((fee, index) => (
              <FeeGrid key={index}>
                <Input
                  placeholder="Fee Type"
                  value={fee.feeType}
                  onChange={(e) => handleFeeChange(index, 'feeType', e.target.value)}
                  inputRef={(el) => (inputRefs.current[11 + index * 3] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 11 + index * 3)}
                />
                <Input
                  type="date"
                  placeholder="Due Date"
                  value={fee.dueDate}
                  onChange={(e) => handleFeeChange(index, 'dueDate', e.target.value)}
                  inputRef={(el) => (inputRefs.current[12 + index * 3] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 12 + index * 3)}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={fee.amount}
                    onChange={(e) => handleFeeChange(index, 'amount', e.target.value)}
                    inputRef={(el) => (inputRefs.current[13 + index * 3] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 13 + index * 3)}
                  />
                  {index > 0 && (
                    <Button color="error" onClick={() => removeFee(index)}>Remove</Button>
                  )}
                </Box>
              </FeeGrid>
            ))}
            <Button onClick={addFee} sx={{ mt: 2 }} color="primary">Add Fee</Button>
          </Collapse>
        </FeeSection>
      )}

      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
        👨‍👩‍👧 Parent & Guardian Details
      </Typography>
      {['father', 'mother'].map((parent, index) => (
        <GridSection key={parent}>
          <Input
            placeholder={`${parent.charAt(0).toUpperCase() + parent.slice(1)} Name`}
            name="name"
            value={formData.parents[parent].name}
            onChange={(e) => handleInputChange(e, 'parents', parent)}
            inputRef={(el) => (inputRefs.current[14 + index * 3] = el)}
            onKeyDown={(e) => handleKeyDown(e, 14 + index * 3)}
          />
          <Input
            placeholder={`${parent.charAt(0).toUpperCase() + parent.slice(1)} Phone`}
            name="phone"
            value={formData.parents[parent].phone}
            onChange={(e) => handleInputChange(e, 'parents', parent)}
            inputRef={(el) => (inputRefs.current[15 + index * 3] = el)}
            onKeyDown={(e) => handleKeyDown(e, 15 + index * 3)}
          />
          <Input
            placeholder={`${parent.charAt(0).toUpperCase() + parent.slice(1)} Occupation`}
            name="occupation"
            value={formData.parents[parent].occupation}
            onChange={(e) => handleInputChange(e, 'parents', parent)}
            inputRef={(el) => (inputRefs.current[16 + index * 3] = el)}
            onKeyDown={(e) => handleKeyDown(e, 16 + index * 3)}
          />
        </GridSection>
      ))}

      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
        📋 Additional Details
      </Typography>
      <GridSection>
        <Input
          placeholder="Aadhar Number"
          name="aadharNumber"
          value={formData.additionalDetails.aadharNumber}
          onChange={(e) => handleInputChange(e, 'additionalDetails')}
          inputRef={(el) => (inputRefs.current[20] = el)}
          onKeyDown={(e) => handleKeyDown(e, 20)}
        />
        <Input
          placeholder="PAN Number"
          name="panNumber"
          value={formData.additionalDetails.panNumber}
          onChange={(e) => handleInputChange(e, 'additionalDetails')}
          inputRef={(el) => (inputRefs.current[21] = el)}
          onKeyDown={(e) => handleKeyDown(e, 21)}
        />
        <Input
          placeholder="TC Number"
          name="tcNumber"
          value={formData.additionalDetails.tcNumber}
          onChange={(e) => handleInputChange(e, 'additionalDetails')}
          inputRef={(el) => (inputRefs.current[22] = el)}
          onKeyDown={(e) => handleKeyDown(e, 22)}
        />
      </GridSection>

      <SaveButton onClick={handleSubmit}>💾 Save</SaveButton>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default StudentAdmissionForm;