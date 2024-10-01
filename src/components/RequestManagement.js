import React, { useEffect, useState } from 'react';
import './RequestManagement.css'; // Add your styling

const RequestManagement = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:5000/fetchRequests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Include cookies for session
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                setError('Failed to fetch requests.');
            }
        } catch (err) {
            setError('Error fetching requests.');
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            const response = await fetch('http://localhost:5000/acceptRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }), // Ensure this is the correct value
                credentials: 'include', // Include cookies for session
            });
    
            if (response.ok) {
                setSuccessMessage('Request accepted successfully!');
                fetchRequests(); // Refresh the requests after accepting one
            } else {
                const errorData = await response.json(); // Capture the error response
                setError(`Failed to accept the request: ${errorData.error}`);
            }
        } catch (err) {
            setError('Error accepting the request.');
        }
    };
    

    useEffect(() => {
        fetchRequests(); // Fetch requests when the component mounts
    }, []);

    return (
        <div className="request-management-container">
            <h1>Pending Requests</h1>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
            {requests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <ul className="request-list">
                    {requests.map((request) => (
                        <li key={request.id} className="request-item">
                            <p><strong>From User ID:</strong> {request.sender_id}</p>
                            <p><strong>Status:</strong> {request.request_status}</p>
                            <button onClick={() => handleAcceptRequest(request.request_id)} className="accept-btn">
                                Accept Request
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RequestManagement;
