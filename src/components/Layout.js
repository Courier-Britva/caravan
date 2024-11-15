import React, { useState } from 'react';
import Field from './Field';
import './components.css';
import Card from './Card';

function Layout({ selectedCards, imageMap }) {
    const [playerInventory, setPlayerInventory] = useState([...selectedCards]);
    const [enemyFields, setEnemyFields] = useState([[], [], []]);  
    const [playerFields, setPlayerFields] = useState([[], [], []]); 
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const removeCardFromInventory = (cardToRemove) => {
        setPlayerInventory((prevInventory) =>
            prevInventory.filter(
                (card) => card.name !== cardToRemove.name || card.value !== cardToRemove.value
            )
        );
    };

    const handleEnemyFieldClick = (fieldIndex) => {
        if (selectedCard) {
            setEnemyFields((prevFields) => {
                const updatedFields = [...prevFields];
    
                if (
                    updatedFields[fieldIndex].length === 0 &&
                    ['J', 'K', 'Q'].includes(selectedCard.value)
                ) {
                    return prevFields;
                }
    
                updatedFields[fieldIndex] = [...updatedFields[fieldIndex], selectedCard];
    
                for (let i = 0; i < updatedFields.length; i++) {
                    const sum = updatedFields[i].reduce(
                        (acc, card) => acc + (parseInt(card.value, 10) || 0),
                        0
                    );
                    if (sum > 26) {
                        updatedFields[i] = [];
                    }
                }
    
                removeCardFromInventory(selectedCard);
                setSelectedCard(null);
    
                return updatedFields;
            });
        }
    };

    
    const handlePlayerFieldClick = (fieldIndex) => {
        if (selectedCard) {
            setPlayerFields((prevFields) => {
                const updatedFields = [...prevFields];
    
                if (
                    updatedFields[fieldIndex].length === 0 &&
                    ['J', 'K', 'Q'].includes(selectedCard.value)
                ) {
                    return prevFields;
                }
    
                updatedFields[fieldIndex] = [...updatedFields[fieldIndex], selectedCard];
    
                for (let i = 0; i < updatedFields.length; i++) {
                    const sum = updatedFields[i].reduce(
                        (acc, card) => acc + (parseInt(card.value, 10) || 0),
                        0
                    );
                    if (sum > 26) {
                        updatedFields[i] = [];
                    }
                }
    
                removeCardFromInventory(selectedCard);
                setSelectedCard(null);
    
                return updatedFields;
            });
        }
    };
    
    

    const handleLayoutClick = (e) => {
        if (!e.target.closest('.field')) {
            setSelectedCard(null);
        }
    };

    return (
        <div className="layout-container" onClick={handleLayoutClick}>
            <div className="fields">
                <div className="fields_elements_container">
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
                <div className="fields_elements_container">
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
                {playerInventory.map(({ name, value }) => (
                    <div
                        key={`${name}-${value}`}
                        className={`card-container ${
                            selectedCard?.name === name && selectedCard?.value === value
                                ? 'selected-card'
                                : ''
                        }`} 
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
