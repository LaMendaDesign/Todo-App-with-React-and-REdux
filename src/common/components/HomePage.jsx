import { TaskForm } from '../../features/tasks/TaskForm';
import { TasksList } from '../../features/tasks/TasksList';

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TaskForm />
      <TasksList />
    </div>
  );
};
