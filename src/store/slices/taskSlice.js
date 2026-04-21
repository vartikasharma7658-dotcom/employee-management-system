import { createSlice } from '@reduxjs/toolkit';
import { mockTasks } from '../../utils/mockData';

const getInitialTasks = () => {
  const localData = localStorage.getItem('tasks');
  if (localData) return JSON.parse(localData);
  localStorage.setItem('tasks', JSON.stringify(mockTasks));
  return mockTasks;
};

const initialState = {
  tasks: getInitialTasks(),
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: 't' + Date.now().toString() };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.status = status;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, updateTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
