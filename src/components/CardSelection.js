import React from 'react';
import Card from './Card';
import '../App.css'

const CardSelection = ({ deck, selectedCards, onSelectCard }) => {
  return (
    <div className="card-selection">
        <span className='selection-name'>Your Selected Cards</span>
        {selectedCards.length === 0 && <p>No cards selected yet.</p>}
        <div className="deck">
            {selectedCards.map((card, index) => (
            <Card
                key={`selected-${index}`}
                suit={card.suit}
                value={card.value}
                onClick={() => onSelectCard(card)} 
            />
            ))}
        </div>
        <span className='selection-name'>Available Deck</span>
        <div className="deck">
            {deck.map((card, index) => (
            <Card
                key={index}
                suit={card.suit}
                value={card.value}
                onClick={() => onSelectCard(card)} // Select a card
                disabled={selectedCards.some(c => c.suit === card.suit && c.value === card.value)} // Disable already selected cards
            />
            ))}
        </div>
    </div>
  );
};

export default CardSelection;
