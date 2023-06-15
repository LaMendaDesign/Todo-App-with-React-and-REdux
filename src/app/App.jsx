import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../common/components/HomePage';
import { NoMatchPage } from '../common/components/NoMatchPage';
import { EditTaskPage } from '../features/tasks/EditTaskPage';

import './App.css';

function App() {
  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My tasks</h1>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/edit-task/:id" element={<EditTaskPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </main>
  );
}

export default App;
