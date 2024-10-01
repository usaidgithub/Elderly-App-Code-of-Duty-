import React from "react";
import './JoinPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faVideo } from '@fortawesome/free-solid-svg-icons';

const JoinPage = () => {
  return (
    <div className="join-container">
      <div className="join-parent">
        <div className="join-childcard">
          <a href="http://localhost:5678/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faComments} className="join-icon" /></a>
          <h3>Join in Chat</h3>
        </div>
        <div className="join-childcard">
          <a href="http://localhost:3092/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faVideo} className="join-icon" /></a>
          <h3>Join in Video Call</h3>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
