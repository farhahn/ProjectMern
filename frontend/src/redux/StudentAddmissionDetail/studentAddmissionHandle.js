import axios from 'axios';
import {
  getRequest,
  getSuccess,
  getError,
  stuffDone,
} from './studentAddmissionSlice.js';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAdmissionForms = (adminID) => async (dispatch) => {
  dispatch(getRequest());
  console.log(`Request URL: /admissionForms/${adminID} with adminID: ${adminID}`);
  try {
    const response = await api.get(`/admissionForms/${adminID}`);
    console.log('Fetch admission forms response:', response.data);
    dispatch(getSuccess(response.data.data || []));
    dispatch(stuffDone());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error fetching admission forms:', errorMessage, error);
    dispatch(getError(errorMessage));
    dispatch(stuffDone());
  }
};

export const addAdmissionForm = (data, adminID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const payload = { ...data, adminID };
    await api.post('/admissionForm', payload);
    dispatch(stuffDone());
    dispatch(fetchAdmissionForms(adminID));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error adding admission form:', errorMessage, error.stack);
    dispatch(getError(errorMessage));
  }
};

export const updateAdmissionForm = (id, formData, adminID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const payload = { ...formData, adminID };
    await api.put(`/admissionForm/${id}`, payload);
    dispatch(stuffDone());
    dispatch(fetchAdmissionForms(adminID));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error updating admission form:', errorMessage, error.stack);
    dispatch(getError(errorMessage));
  }
};

export const deleteAdmissionForm = (id, adminID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await api.delete(`/admissionForm/${id}?adminID=${adminID}`);
    dispatch(stuffDone());
    dispatch(fetchAdmissionForms(adminID));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error deleting admission form:', errorMessage, error.stack);
    dispatch(getError(errorMessage));
  }
};