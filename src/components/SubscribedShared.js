import React, { useState } from 'react';
import './SubscribedShare.css'; // Add your styling

const SubscribedShare = () => {
  const [searchId, setSearchId] = useState('');
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]); // State for tasks
  const [newTask, setNewTask] = useState(''); // State for new task description
  const [newTaskTime, setNewTaskTime] = useState(''); // State for new task time
  const [error, setError] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [requestSent, setRequestSent] = useState(false); // New state to track request status

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setUserData(null);
    setTasks([]); // Clear tasks on new search
    setRequestStatus('');
    setRequestSent(false); // Reset request status on new search

    if (searchId) {
      try {
        const response = await fetch(`http://localhost:5000/searchUser/${searchId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          // Check request status for this user
          checkRequestStatus(data.id);
        } else {
          setError('User not found.');
        }
      } catch (err) {
        setError('Error searching for user.');
      }
    } else {
      setError('Please enter a valid ID.');
    }
  };

  const checkRequestStatus = async (recipientId) => {
    try {
      const response = await fetch(`http://localhost:5000/checkRequestStatus/${recipientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.requestAccepted) {
          // If request is accepted, fetch tasks
          fetchTasks(recipientId);
          setRequestSent(true); // Update request sent status
        } else {
          setRequestSent(false); // Request not accepted
          setError('Request not accepted yet.');
        }
      } else {
        setError('Error checking request status.');
      }
    } catch (err) {
      setError('Error checking request status.');
    }
  };

  const fetchTasks = async (recipientId) => {
    try {
      const response = await fetch(`http://localhost:5000/fetchUserTasks/${recipientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("The recipient id is", recipientId)
        console.log("The data is", data)
        setTasks(data); // Set tasks if fetched successfully
      } else {
        setError('Error fetching tasks.');
      }
    } catch (err) {
      setError('Error fetching tasks.');
    }
  };

  const handleSendRequest = async () => {
    // Prevent sending a request if one has already been sent and accepted
    if (requestSent) {
      setRequestStatus('Request has already been sent and accepted.');
      return;
    }

    setRequestStatus(''); // Reset status
    try {
      const response = await fetch(`http://localhost:5000/sendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientId: userData.id }), // Ensure recipientId is sent
        credentials: 'include', // Ensure cookies are included for session
      });

      if (response.ok) {
        setRequestStatus('Request sent successfully!');
        setRequestSent(true); // Update state to indicate request has been sent
      } else {
        const errorData = await response.json();
        setRequestStatus(`Failed to send the request: ${errorData.error}`);
      }
    } catch (err) {
      setRequestStatus('Error sending the request.');
    }
  };

  const handleAddTask = async () => {
    if (!newTask || !newTaskTime) {
      setError('Task description and time cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/addTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.id,
          taskDetails: newTask,
          scheduledTime: newTaskTime, // Send scheduled time along with task details
        }),
        credentials: 'include', // Include cookies for session
      });

      if (response.ok) {
        setTasks((prevTasks) => [
          ...prevTasks,
          { task_description: newTask, scheduled_time: newTaskTime },
        ]); // Update tasks locally with new task
        setNewTask(''); // Reset input field for task description
        setNewTaskTime(''); // Reset input field for task time
      } else {
        setError('Failed to add the task.');
      }
    } catch (err) {
      setError('Error adding the task.');
    }
  };

  return (
    <div className="subscribed-share-container">
      <h1>Search User by Unique ID</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input-search"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="user-details">
          <h2>User Found</h2>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>

          <button onClick={handleSendRequest} className="request-btn" disabled={requestSent}>
            {requestSent ? 'Request Sent' : 'Send Request'}
          </button>
          {requestStatus && <p className="status-message">{requestStatus}</p>}

          {tasks.length > 0 && (
            <div>
              <h3>Existing Tasks</h3>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <strong>Task:</strong> {task.task_description} <br />
                    <strong>Scheduled Time:</strong> {task.scheduled_time}
                  </li>
                ))}
              </ul>

              <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="input-task"
              />
              <input
                type="time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                className="input-time"
              />
              <button onClick={handleAddTask} className="add-task-btn">Add Task</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscribedShare;
