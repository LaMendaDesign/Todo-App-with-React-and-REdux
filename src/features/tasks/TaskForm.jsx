import { useState, useEffect, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { nanoid } from '@reduxjs/toolkit';
import { addTask, editTask } from './tasksSlice';

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    isCompleted: false,
    date: '',
  });

  const [disableSubmit, setDisableSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const titleInputId = useId();
  const descriptionInputId = useId();
  const dateInputId = useId();
  const completedInputId = useId();

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, []);

  const onTaskChange = (e) => {
    setDisableSubmit(false);
    if (e.target.name === 'isCompleted') {
      setTask({
        ...task,
        isCompleted: !task.isCompleted,
      });
    } else {
      setTask({
        ...task,
        [e.target.name]: e.target.value,
      });
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
      navigate('/');
    } else {
      dispatch(
        addTask({
          ...task,
          id: nanoid(),
        })
      );
      setTask({
        title: '',
        description: '',
        isCompleted: false,
        date: '',
      });
    }
  }

  return (
    <section aria-label="add task" className="w-full max-w-xs mb-10">
      <form
        method="post"
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor={titleInputId}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Task
          </label>
          <input
            id={titleInputId}
            name="title"
            type="text"
            placeholder="Do dishes"
            value={task.title}
            onChange={onTaskChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor={descriptionInputId}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            What's that about?
          </label>
          <textarea
            id={descriptionInputId}
            name="description"
            placeholder="Wash dishes after dinner"
            value={task.description}
            onChange={onTaskChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor={dateInputId}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Due date:
          </label>
          <input
            id={dateInputId}
            type="date"
            name="date"
            value={task.date}
            onChange={onTaskChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6 flex items-center gap-3">
          <label
            htmlFor={completedInputId}
            className=" text-gray-700 text-sm font-bold"
          >
            Completed: {'   '}
          </label>
          <input
            id={completedInputId}
            type="checkbox"
            name="isCompleted"
            checked={task.isCompleted}
            onChange={onTaskChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          {params.id && (
            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              <Link to="/">Cancel</Link>
            </button>
          )}
          <button
            type="submit"
            disabled={disableSubmit}
            className="shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};
