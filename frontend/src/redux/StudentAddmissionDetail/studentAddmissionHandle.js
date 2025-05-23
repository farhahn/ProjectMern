import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createStudent = (studentData, adminID) => async (dispatch) => {
  try {
    dispatch({ type: 'STUDENT_REQUEST' });
    const response = await axiosInstance.post('/student', { ...studentData, adminID });
    dispatch({
      type: 'CREATE_STUDENT_SUCCESS',
      payload: response.data.data,
    });
    return Promise.resolve();
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to add student';
    dispatch({
      type: 'STUDENT_FAIL',
      payload: errorMessage,
    });
    return Promise.reject(errorMessage);
  }
};

export const getStudentById = (id, adminID) => async (dispatch) => {
  try {
    dispatch({ type: 'STUDENT_REQUEST' });
    const response = await axiosInstance.get(`/student/${id}?adminID=${adminID}`);
    dispatch({
      type: 'GET_STUDENT_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch student';
    dispatch({
      type: 'STUDENT_FAIL',
      payload: errorMessage,
    });
  }
};

export const clearStudentError = () => ({
  type: 'CLEAR_STUDENT_ERROR',
});