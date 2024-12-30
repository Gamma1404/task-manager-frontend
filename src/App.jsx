import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import EditTaskForm from './components/EditTaskForm';
import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks}/>} />
          <Route path="/new" element={<TaskForm setTasks={setTasks}/>} />
          <Route path="/edit/:id" element={<EditTaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
