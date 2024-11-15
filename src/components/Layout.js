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
    
                const field = updatedFields[fieldIndex];
                let cardWasPlaced = false;
    
                if (selectedCard.value === 'J' && field.length > 0) {
                    let lastNumberIndex = -1;
    
                    for (let i = field.length - 1; i >= 0; i--) {
                        if (!isNaN(parseInt(field[i].value, 10))) {
                            lastNumberIndex = i;
                            break;
                        }
                    }
    
                    if (lastNumberIndex !== -1) {
                        updatedFields[fieldIndex] = field.slice(0, lastNumberIndex).filter((card) => {
                            const isNamedCard = ['J', 'K', 'Q'].includes(card.value);
                            return !(isNamedCard && field.indexOf(card) < lastNumberIndex);
                        });
                        cardWasPlaced = true;
                    }
                } else if (selectedCard.value === 'K' && field.length > 0) {
                    let lastNumberIndex = -1;
    
                    for (let i = field.length - 1; i >= 0; i--) {
                        if (!isNaN(parseInt(field[i].value, 10))) {
                            lastNumberIndex = i;
                            break;
                        }
                    }
    
                    if (lastNumberIndex !== -1) {
                        const lastCard = field[lastNumberIndex];
                        const lastCardValue = parseInt(lastCard.logicValue || lastCard.value, 10);
    
                        if (!lastCardValue || isNaN(lastCardValue)) {
                            return prevFields;
                        }
    
                        const multipliedValue = lastCardValue * 2;
    
                        const updatedLastCard = {
                            ...lastCard,
                            logicValue: multipliedValue.toString(),
                        };
    
                        updatedFields[fieldIndex] = [
                            ...field.slice(0, lastNumberIndex),
                            updatedLastCard,
                            ...field.slice(lastNumberIndex + 1),
                            { ...selectedCard },
                        ];
                        cardWasPlaced = true;
                    }
                } else if (selectedCard.value === 'Q' && field.length > 0) {
                    let lastNumberIndex = -1;
    
                    for (let i = field.length - 1; i >= 0; i--) {
                        if (!isNaN(parseInt(field[i].value, 10))) {
                            lastNumberIndex = i;
                            break;
                        }
                    }
    
                    if (lastNumberIndex !== -1) {
                        const lastCardValue = parseInt(
                            field[lastNumberIndex].logicValue || field[lastNumberIndex].value,
                            10
                        );
    
                        const secondLastCardValue =
                            lastNumberIndex > 0
                                ? parseInt(
                                      field[lastNumberIndex - 1].logicValue ||
                                          field[lastNumberIndex - 1].value,
                                      10
                                  )
                                : null;
    
                        const isAscending =
                            secondLastCardValue !== null
                                ? secondLastCardValue < lastCardValue
                                : true;
    
                        updatedFields[fieldIndex] = [
                            ...field,
                            { ...selectedCard, isAscending: !isAscending },
                        ];
                        cardWasPlaced = true;
                    } else {
                        // If no numbered card exists, just place the Q card
                        updatedFields[fieldIndex] = [...field, { ...selectedCard }];
                        cardWasPlaced = true;
                    }
                } else if (field.length > 1) {
                    const direction = field[field.length - 1].isAscending !== false;
                    const lastCardValue = parseInt(
                        field[field.length - 1].logicValue || field[field.length - 1].value,
                        10
                    );
                    const selectedCardValue = parseInt(selectedCard.value, 10);
    
                    if (!selectedCardValue || isNaN(selectedCardValue)) {
                        return prevFields;
                    }
    
                    if (direction && selectedCardValue <= lastCardValue) {
                        return prevFields;
                    }
    
                    if (!direction && selectedCardValue >= lastCardValue) {
                        return prevFields;
                    }
    
                    updatedFields[fieldIndex] = [...field, selectedCard];
                    cardWasPlaced = true;
                } else {
                    updatedFields[fieldIndex] = [...field, selectedCard];
                    cardWasPlaced = true;
                }
    
                for (let i = 0; i < updatedFields.length; i++) {
                    const sum = updatedFields[i].reduce(
                        (acc, card) =>
                            acc + (parseInt(card.logicValue || card.value, 10) || 0),
                        0
                    );
                    if (sum > 26) {
                        updatedFields[i] = [];
                    }
                }
    
                if (cardWasPlaced) {
                    removeCardFromInventory(selectedCard);
                    setSelectedCard(null);
                }
    
                return updatedFields;
            });
        }
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
    
                const field = updatedFields[fieldIndex];
                let cardWasPlaced = false;
    
                if (selectedCard.value === 'J' && field.length > 0) {
                    let lastNumberIndex = -1;
    
                    for (let i = field.length - 1; i >= 0; i--) {
                        if (!isNaN(parseInt(field[i].value, 10))) {
                            lastNumberIndex = i;
                            break;
                        }
                    }
    
                    if (lastNumberIndex !== -1) {
                        updatedFields[fieldIndex] = field.slice(0, lastNumberIndex).filter((card) => {
                            const isNamedCard = ['J', 'K', 'Q'].includes(card.value);
                            return !(isNamedCard && field.indexOf(card) < lastNumberIndex);
                        });
                        cardWasPlaced = true;
                    }
                } else if (selectedCard.value === 'K' && field.length > 0) {
                    let lastNumberIndex = -1;
    
                    for (let i = field.length - 1; i >= 0; i--) {
                        if (!isNaN(parseInt(field[i].value, 10))) {
                            lastNumberIndex = i;
                            break;
                        }
                    }
    
                    if (lastNumberIndex !== -1) {
                        const lastCard = field[lastNumberIndex];
                        const lastCardValue = parseInt(lastCard.logicValue || lastCard.value, 10);
    
                        if (!lastCardValue || isNaN(lastCardValue)) {
                            return prevFields;
                        }
    
                        const multipliedValue = lastCardValue * 2;
    
                        const updatedLastCard = {
                            ...lastCard,
                            logicValue: multipliedValue.toString(),
                        };
    
                        updatedFields[fieldIndex] = [
                            ...field.slice(0, lastNumberIndex),
                            updatedLastCard,
                            ...field.slice(lastNumberIndex + 1),
                            { ...selectedCard },
                        ];
                        cardWasPlaced = true;
                    }
                } else if (selectedCard.value === 'Q' && field.length > 0) {
                    let lastNumberIndex = -1;
    
                    for (let i = field.length - 1; i >= 0; i--) {
                        if (!isNaN(parseInt(field[i].value, 10))) {
                            lastNumberIndex = i;
                            break;
                        }
                    }
    
                    if (lastNumberIndex !== -1) {
                        const lastCardValue = parseInt(
                            field[lastNumberIndex].logicValue || field[lastNumberIndex].value,
                            10
                        );
    
                        const secondLastCardValue =
                            lastNumberIndex > 0
                                ? parseInt(
                                      field[lastNumberIndex - 1].logicValue ||
                                          field[lastNumberIndex - 1].value,
                                      10
                                  )
                                : null;
    
                        const isAscending =
                            secondLastCardValue !== null
                                ? secondLastCardValue < lastCardValue
                                : true;
    
                        updatedFields[fieldIndex] = [
                            ...field,
                            { ...selectedCard, isAscending: !isAscending },
                        ];
                        cardWasPlaced = true;
                    } else {
                        // If no numbered card exists, just place the Q card
                        updatedFields[fieldIndex] = [...field, { ...selectedCard }];
                        cardWasPlaced = true;
                    }
                } else if (field.length > 1) {
                    const direction = field[field.length - 1].isAscending !== false;
                    const lastCardValue = parseInt(
                        field[field.length - 1].logicValue || field[field.length - 1].value,
                        10
                    );
                    const selectedCardValue = parseInt(selectedCard.value, 10);
    
                    if (!selectedCardValue || isNaN(selectedCardValue)) {
                        return prevFields;
                    }
    
                    if (direction && selectedCardValue <= lastCardValue) {
                        return prevFields;
                    }
    
                    if (!direction && selectedCardValue >= lastCardValue) {
                        return prevFields;
                    }
    
                    updatedFields[fieldIndex] = [...field, selectedCard];
                    cardWasPlaced = true;
                } else {
                    updatedFields[fieldIndex] = [...field, selectedCard];
                    cardWasPlaced = true;
                }
    
                for (let i = 0; i < updatedFields.length; i++) {
                    const sum = updatedFields[i].reduce(
                        (acc, card) =>
                            acc + (parseInt(card.logicValue || card.value, 10) || 0),
                        0
                    );
                    if (sum > 26) {
                        updatedFields[i] = [];
                    }
                }
    
                if (cardWasPlaced) {
                    removeCardFromInventory(selectedCard);
                    setSelectedCard(null);
                }
    
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
