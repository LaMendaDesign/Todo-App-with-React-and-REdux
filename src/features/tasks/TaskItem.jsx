import { useState, useEffect, useId } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask, editTask } from './tasksSlice';
import { BiTrashAlt, BiEdit } from 'react-icons/bi';

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const completedInputId = useId();

  const onDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };
  const onCompleteTask = () => {
    dispatch(editTask({ ...task, isCompleted: !task.isCompleted }));
  };
  return (
    <div
      key={task.id}
      className="bg-white shadow-md rounded px-8 pt-6 pb-6 w-96 flex flex-row justify-between items-center  max-w-2xl min-w-fill"
    >
      <div className="flex items-center">
        <label className="sr-only" htmlFor={completedInputId}>
          check
        </label>

        <input
          type="checkbox"
          name="isCompleted"
          id={completedInputId}
          checked={task.isCompleted}
          onChange={onCompleteTask}
        />
        <div className="ml-3">
          <p className="text-lg">{task.title}</p>
          <p className="text-sm">{task.description}</p>
          <span className="text-xs">{task.date}</span>
        </div>
      </div>
      <div className="space-x-3">
        <button
          aria-label="delete-task-button"
          onClick={() => onDeleteTask(task.id)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
        >
          <BiTrashAlt color="black" size="16px" />
        </button>
        <Link to={`/edit-task/${task.id}`} aria-label="edit-task-link">
          <button
            aria-label="edit-task-button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
          >
            <BiEdit color="black" />
          </button>
        </Link>
      </div>
    </div>
  );
};
