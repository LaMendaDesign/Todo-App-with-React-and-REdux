import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAllTasks, uncheckAllTasks } from './tasksSlice';
import { TaskItem } from './TaskItem';

export const TasksList = () => {
  const tasksList = useSelector((state) => state.tasks);

  // const [filteredTasks, setFilteredTasks] = useState(tasksList);
  const [allChecked, setAllChecked] = useState(false);
  const uncompletedTasks = tasksList.filter((task) => !task.isCompleted);
  const completedTasks = tasksList.filter((task) => task.isCompleted);

  useEffect(() => {
    if (completedTasks.length === tasksList.length) {
      setAllChecked(true);
    }
  }, []);

  const dispatch = useDispatch();

  const onSelectAll = () => {
    setAllChecked(!allChecked);
    if (allChecked) {
      dispatch(uncheckAllTasks());
    } else {
      dispatch(checkAllTasks());
    }
  };

  return (
    <section className="w-full min-w-full">
      <div className="flex justify-between">
        <h2 className="text-1xl font-bold text-center">{`${uncompletedTasks.length} Pending tasks`}</h2>
        {tasksList.length > 0 && (
          <button
            onClick={onSelectAll}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4"
          >
            {!allChecked ? 'Check all' : 'Uncheck all'}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {tasksList.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
};
