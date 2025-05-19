import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRequest, getSuccess, getError, stuffDone, clearError } from './IncomeSlice';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchIncomes = createAsyncThunk(
  'income/fetchIncomes',
  async (adminID: string, { dispatch }) => {
    dispatch(getRequest());
    try {
      const response = await api.get(`/incomes/${adminID}`);
      dispatch(getSuccess(response.data.data));
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(getError(errorMessage));
      throw error;
    }
  }
);

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async ({ incomeData, adminID }: { incomeData: any; adminID: string }, { dispatch }) => {
    dispatch(getRequest());
    try {
      const response = await api.post('/income', { ...incomeData, adminID });
      dispatch(stuffDone());
      await dispatch(fetchIncomes(adminID)).unwrap();
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(getError(errorMessage));
      throw error;
    }
  }
);

export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (
    { id, incomeData, adminID }: { id: string; incomeData: any; adminID: string },
    { dispatch }
  ) => {
    dispatch(getRequest());
    try {
      const response = await api.put(`/income/${id}`, { ...incomeData, adminID });
      dispatch(stuffDone());
      await dispatch(fetchIncomes(adminID)).unwrap();
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(getError(errorMessage));
      throw error;
    }
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async ({ id, adminID }: { id: string; adminID: string }, { dispatch }) => {
    dispatch(getRequest());
    try {
      await api.delete(`/income/${id}`, { data: { adminID } });
      dispatch(stuffDone());
      await dispatch(fetchIncomes(adminID)).unwrap();
      return { id };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(getError(errorMessage));
      throw error;
    }
  }
);

export { clearError };