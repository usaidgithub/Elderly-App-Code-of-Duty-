import React from "react";
import './Home.css';
import { Link }from "react-router-dom";
import heartIcon from './heart.png';
import doctorIcon from './doctor.png';
import communicationIcon from './communication.png';
import calendarIcon from './calender.png';
import pharmacyIcon from './pharmacy.png';
import shareIcon from './share.png';
import stepCounterIcon from './step-counter.png';
import appleSauceIcon from './apple-sauce.png';
import homeIcon from './home-control.png';
import medicineIcon from './medicine-drug.png';
import locationIcon from './location-marker.png';
import ngoIcon from './human-resources.png';
import notifyicon from './notification-bell.png'
import phoneIcon from './emergency-phone.png'
const Home = () => {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="greeting">
          <h3>Hello User</h3>
          <h3>01/10/2024, Tuesday</h3>
        </div>
        <Link to='/accept'><div className="notification">
          <img src={notifyicon} className="notifybell" alt="Notifications" />
        </div></Link>
      </div>

      {/* Info Section */}
      <div className="info">
        <h3 style={{ color: 'white' }}>Status : Good</h3>
        <div className="part1">
          <img className="icon" src={stepCounterIcon} alt="Step Counter" />
          <h3 style={{ color: 'white' }}>3268 Steps</h3>
        </div>
        <div className="part2">
          <div className="part1">
            <img className="icon" src={appleSauceIcon} alt="Calories" />
            <h3 style={{ color: 'white' }}>2068 Calories</h3>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="parent">
        <div className="childcard">
          <Link to="/health"><img src={heartIcon} className="icon" alt="Health Stats" /></Link>
          <h3>Health Stats</h3>
        </div>
        <div className="childcard">
        <Link to="/doctor"><img src={doctorIcon} className="icon" alt="Doctors/Caretakers" /></Link>
          <h4>Doctors/Caretakers</h4>
        </div>
      </div>
      <div className="parent">
        <div className="childcard">
          <Link to="/join"><img src={communicationIcon} className="icon" alt="Communication" /></Link>
          <h3>Communication</h3>
        </div>
        <div className="childcard">
          <Link to="/scheduling"><img src={calendarIcon} className="icon" alt="Schedule" /></Link>
          <h3>Schedule</h3>
        </div>
      </div>
      <div className="parent">
        <div className="childcard">
          <a href="http://127.0.0.1:5500/index.html"><img src={pharmacyIcon} className="icon" alt="Pharmacy" /></a>
          <h3>Pharmacy</h3>
        </div>
        <div className="childcard">
          <Link to="/share"><img src={shareIcon} className="icon" alt="Share Activity" /></Link>
          <h3>Share Activity</h3>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status">
        <div className="st1">
          <img src={homeIcon} className="logo" alt="Home" />
        </div>
        <div className="st1">
          <img src={medicineIcon} className="logo" alt="Medicine" />
        </div>
        <div className="st1">
          <a href="http://localhost:3098/"><img src={locationIcon} className="logo" alt="Map" /></a>
        </div>
        <div className="st1">
          <img src={ngoIcon} className="logo" alt="NGO Communities" />
        </div>
      </div>
      {/* Emergency Dial Button */}
      <Link to="/emergency" className="emergency-button">
        <img src={phoneIcon} alt="Emergency Dial" />
      </Link>
    </div>
  );
};

export default Home;
