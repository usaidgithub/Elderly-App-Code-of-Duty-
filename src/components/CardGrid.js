import React from 'react';
import './CardGrid.css'; // Assuming you will use an external CSS file

const cardsData = [
  { id: 1, title: 'Card 1', imageUrl: 'https://as1.ftcdn.net/v2/jpg/02/24/04/12/1000_F_224041272_btw2EyUYbNehfd8aSK5LLJ3HohYj3ImU.jpg' },
  { id: 2, title: 'Card 2', imageUrl: 'https://www.bridgingminds.net/wp-content/uploads/2022/01/top-4-benefits-of-using-data-analytics-in-healthcare.jpg' },
  { id: 3, title: 'Card 3', imageUrl: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Card 4', imageUrl: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Card 5', imageUrl: 'https://via.placeholder.com/150' },
  { id: 6, title: 'Card 6', imageUrl: 'https://via.placeholder.com/150' },
];

const CardGrid = () => {
  return (
    <div className="card-grid">
      {cardsData.map((card) => (
        <div className="card" key={card.id}>
          <div className="image-container">
            <img src={card.imageUrl} alt={card.title} />
          </div>
          <div className="card-title">{card.title}</div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
