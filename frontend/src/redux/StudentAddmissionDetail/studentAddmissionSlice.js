import { createSlice } from '@reduxjs/toolkit';

const studentAddmissionSlice = createSlice({
  name: 'admissionForms',
  initialState: {
    admissionForms: [],
    loading: false,
    error: null,
    status: 'idle',
  },
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.status = 'pending';
    },
    getSuccess: (state, action) => {
      console.log('getSuccess payload:', JSON.stringify(action.payload, null, 2));
      state.admissionForms = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
      state.status = 'succeeded';
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = 'failed';
      console.error('Error in admission form slice:', action.payload);
    },
    stuffDone: (state) => {
      state.status = 'idle';
      state.loading = false;
    },
  },
});

export const { getRequest, getSuccess, getError, stuffDone } = studentAddmissionSlice.actions;
export default studentAddmissionSlice.reducer;