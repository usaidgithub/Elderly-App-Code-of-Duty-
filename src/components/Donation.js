import React from 'react';
import './Donation.css'; // Make sure to create a separate CSS file for styles.
import { Link }from "react-router-dom";
import Gareeb1 from './Gareeb1.jfif'
const Donation = () => {
    return (
        <div className="container">
            {/* Header Section */}
            <header>
                <div className="profile">
                    <img src="profile.png" alt="Profile" />
                </div>
                <h1>Disaster Relief</h1>
                <div className="notification">
                    <img src="notification-bell.png" alt="Notification" />
                </div>
            </header>

            {/* Banner Section with Slide Effect */}
            <div className="banner">
                <div className="slides">
                    <img src={Gareeb1} alt="Slide 1" />
                    <img src="images.jpeg" alt="Slide 2" />
                    <img src="third.jpeg" alt="Slide 3" />
                    <img src="forth.jpg" alt="Slide 4" />
                    <img src="fifth.jpg" alt="Slide 5" />
                </div>
                {/* Know More Button */}
                <Link to="#" className="know-more">Know More</Link>
            </div>

            {/* Content Section */}
            <div className="content">
                <h2>Be a Hope for Someone</h2>
                <p>Help rebuild lives of Elders.</p>

                {/* Donation Options */}
                <div className="donation-options">
                    <button>₹100</button>
                    <button>₹500</button>
                    <button>₹1000</button>
                    <button>₹5000</button>
                </div>

                {/* Donate Now Button */}
                <button className="donate-now">Donate Now</button>
            </div>

            {/* Why to Donate Section */}
            <div className="why-donate">
                <h3>Why Donate?</h3>
                <ul>
                    <li>Your contribution helps rebuild lives of old pupils.</li>
                    <li>Donations are used to provide shelter, food, and essential supplies to Senior citizens.</li>
                    <li>Every donation brings hope and support to Elders.</li>
                    <li>100% of your donation goes directly to Old age efforts.</li>
                </ul>
            </div>
        </div>
    );
};

export default Donation;
