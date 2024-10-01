import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Scheduling.css';

const Scheduling = () => { 
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  // Function to schedule a toast notification for the task
  const scheduleNotification = (taskDescription, scheduledTime) => {
    const now = new Date();
    const [hours, minutes] = scheduledTime.split(':');
    const taskTime = new Date();
    taskTime.setHours(hours);
    taskTime.setMinutes(minutes);
    taskTime.setSeconds(0);

    const timeDifference = taskTime - now;

    if (timeDifference > 0) {
      setTimeout(() => {
        toast.info(`Reminder: ${taskDescription}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, timeDifference);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            setTasks(data);

            // Schedule notifications for all fetched tasks
            data.forEach(task => {
              scheduleNotification(task.task_description, task.scheduled_time);
            });
        } catch (error) {
            console.log("Error fetching task data", error);
        }
    };

    fetchTasks();
  }, []); 

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (task && time) {
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task_description: task, scheduled_time: time }),
                credentials: 'include'
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks([...tasks, newTask]);
                setTask('');
                setTime('');

                // Schedule a notification for the new task
                scheduleNotification(newTask.task_description, newTask.scheduled_time);
            }
        } catch (error) {
            console.log("Error adding the tasks", error);
        }
    }
  };

  return (
    <div className="scheduling-container">
      <ToastContainer />
      <h1 className="scheduling-title">Daily Reminders</h1>
      <form className="scheduling-form" onSubmit={handleAddTask}>
        <label htmlFor="task" className="label">
          Reminders
        </label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input"
          placeholder="Enter your reminders"
          required
        />

        <label htmlFor="time" className="label">
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input"
          required
        />

        <button type="submit" className="add-task-btn">Add Reminders</button>
      </form>

      <h2 className="task-list-title">Reminders</h2>
      <ul className="task-list">
        {tasks.map((item) => (
          <li key={item.id} className="task-item">
            <span className="task-name">{item.task_description}</span> - 
            <span className="task-time">{item.scheduled_time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scheduling;
