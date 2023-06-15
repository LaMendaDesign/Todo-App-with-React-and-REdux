import { createSlice, nanoid } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = [
  {
    id: nanoid(),
    title: 'Task 1',
    description: 'Task 1 description',
    date: moment().format('YYYY-MM-D'),
    isCompleted: false,
  },
  {
    id: nanoid(),
    title: 'Task 2',
    description: 'Task 2 description',
    date: moment().format('YYYY-MM-D'),
    isCompleted: false,
  },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description, date, isCompleted } = action.payload;

      const existingTask = state.find((task) => task.id === id);

      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.date = date;
        existingTask.isCompleted = isCompleted;
      }
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload);

      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },
    checkAllTasks: (state) => {
      state.forEach((task) => (task.isCompleted = true));
    },
    uncheckAllTasks: (state) => {
      state.forEach((task) => (task.isCompleted = false));
    },
  },
});

export const { addTask, editTask, deleteTask, checkAllTasks, uncheckAllTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
