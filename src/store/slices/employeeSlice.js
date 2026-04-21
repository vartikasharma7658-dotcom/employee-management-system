import { createSlice } from '@reduxjs/toolkit';
import { mockEmployees } from '../../utils/mockData';

const getInitialEmployees = () => {
  const localData = localStorage.getItem('employees');
  if (localData) return JSON.parse(localData);
  localStorage.setItem('employees', JSON.stringify(mockEmployees));
  return mockEmployees;
};

const initialState = {
  employees: getInitialEmployees(),
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = { ...action.payload, id: Date.now().toString() };
      state.employees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
        localStorage.setItem('employees', JSON.stringify(state.employees));
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
