import React, { useState } from 'react';
import Field from './Field';
import './components.css';
import Card from './Card';

function Layout({ selectedCards, imageMap }) {
    const [enemyFields, setEnemyFields] = useState([[], [], []]);  
    const [playerFields, setPlayerFields] = useState([[], [], []]); 
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card); 
    };

    const handleEnemyFieldClick = (fieldIndex) => {
        if (selectedCard) {
            setEnemyFields((prevFields) => {
                const updatedFields = [...prevFields];
                updatedFields[fieldIndex] = [...updatedFields[fieldIndex], selectedCard];
                return updatedFields;
            });
            setSelectedCard(null); 
        }
    };

    const handlePlayerFieldClick = (fieldIndex) => {
        if (selectedCard) {
            setPlayerFields((prevFields) => {
                const updatedFields = [...prevFields];
                updatedFields[fieldIndex] = [...updatedFields[fieldIndex], selectedCard];
                return updatedFields;
            });
            setSelectedCard(null); 
        }
    };

    const handleLayoutClick = (e) => {
        if (!e.target.closest('.field')) {
            setSelectedCard(null); 
        }
    };
    return (
        <div className="layout-container" onClick={handleLayoutClick}>
            <div className='fields'>
                <div className='fields_elements_container'>
                    {enemyFields.map((fieldCards, index) => (
                        <Field
                            key={`enemy-${index}`}
                            fieldIndex={index}
                            isHighlighted={!!selectedCard} 
                            onFieldClick={() => handleEnemyFieldClick(index)}
                            cards={fieldCards}
                        />
                    ))}
                </div>
                <div className='fields_elements_container'>
                    {playerFields.map((fieldCards, index) => (
                        <Field
                            key={`player-${index}`}
                            fieldIndex={index}
                            isHighlighted={!!selectedCard}
                            onFieldClick={() => handlePlayerFieldClick(index)}
                            cards={fieldCards}
                        />
                    ))}
                </div>
            </div>
            <div className="cards-selector cards_selector_container">
                {selectedCards.map(({ name, value }) => (
                    <div
                        key={`${name}-${value}`}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleCardClick({ name, value });
                        }}
                    >
                        <Card
                            cardName={imageMap[name]}
                            cardValue={value}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Layout;
