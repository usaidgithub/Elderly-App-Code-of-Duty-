import React, { useState } from 'react';
import './DoctorsCaretakers.css'; // External CSS file for styling

const DoctorsCaretakers = () => {
  const [selectedType, setSelectedType] = useState('Doctors'); // Default to 'Doctors'

  const handleSelection = (e) => {
    setSelectedType(e.target.value);
  };

  const data = [
    {
      name: 'Dr. Vikram Patel',
      type: 'Doctors',
      specialization: 'Cardiologist',
      experience: '10 yrs of exp. overall',
      stories: '500 customer stories',
      recommendation: '95%',
      rating: '4.9',
      contact: '+1234567890',
    },
    {
      name: 'Dr. Alisha Verma',
      type: 'Doctors',
      specialization: 'Dermatologist',
      experience: '9 yrs of exp. overall',
      stories: '400 customer stories',
      recommendation: '89%',
      rating: '4.6',
      contact: '+0987654321',
    },
    {
      name: 'John Caretaker',
      type: 'Caretakers',
      specialization: 'Elderly Caregiver',
      experience: '7 yrs of exp. overall',
      stories: '300 customer stories',
      recommendation: '90%',
      rating: '4.7',
      contact: '+5678901234',
    },
    {
      name: 'Anna Caregiver',
      type: 'Caretakers',
      specialization: 'Medical Assistant',
      experience: '5 yrs of exp. overall',
      stories: '250 customer stories',
      recommendation: '92%',
      rating: '4.8',
      contact: '+2345678901',
    },
    {
        name: 'Rahul Gandhi',
        type: 'Caretakers',
        specialization: 'Medical Assistant',
        experience: '8 yrs of exp. overall',
        stories: '350 customer stories',
        recommendation: '92%',
        rating: '4.8',
        contact: '+2345678901',
      },
      {
        name: 'Raju Gandhi',
        type: 'Caretakers',
        specialization: 'Medical Assistant',
        experience: '7 yrs of exp. overall',
        stories: '250 customer stories',
        recommendation: '93%',
        rating: '4.7',
        contact: '+2345678901',
      },
      {
        name: 'Raju Gandhi',
        type: 'Doctors',
        specialization: 'Medical Assistant',
        experience: '7 yrs of exp. overall',
        stories: '250 customer stories',
        recommendation: '93%',
        rating: '4.7',
        contact: '+2345678901',
      },
      {
        name: 'Rajiv Gandhi',
        type: 'Doctors',
        specialization: 'Medical Assistant',
        experience: '7 yrs of exp. overall',
        stories: '250 customer stories',
        recommendation: '93%',
        rating: '4.7',
        contact: '+2345678901',
      },
  ];

  return (
    <div className="container">
      <div className="selection-section">
        <label htmlFor="typeDropdown">Choose Type:</label>
        <select id="typeDropdown" value={selectedType} onChange={handleSelection}>
          <option value="Doctors">Doctors</option>
          <option value="Caretakers">Caretakers</option>
        </select>
        <button className="add-button">Add {selectedType}</button>
      </div>

      <div className="cards-section">
        {data
          .filter(person => person.type === selectedType)
          .map((person, index) => (
            <div className="card" key={index}>
              <h3>{person.name}</h3>
              <p>{person.specialization}</p>
              <p>{person.experience}</p>
              <p>{person.stories}</p>
              <div className="recommendation">
                <span>{person.recommendation} Customer Recommendation</span>
                <span className="rating">{person.rating} Customer Excellence Rating</span>
              </div>
              <p className="availability">NEXT AVAILABLE AT</p>
              <button className="contact-button">Contact</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorsCaretakers;
