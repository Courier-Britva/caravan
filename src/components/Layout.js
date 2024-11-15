import React, { useState, useEffect } from 'react';
import Field from './Field';
import './components.css';
import Card from './Card';
import { NavLink } from 'react-router-dom';

function Layout({ selectedCards, imageMap, resetGame }) {
    const [playerInventory, setPlayerInventory] = useState([...selectedCards]);
    const [enemyInventory, setEnemyInventory] = useState([...selectedCards]);

    const [enemyFields, setEnemyFields] = useState([[], [], []]);  
    const [playerFields, setPlayerFields] = useState([[], [], []]); 
    const [selectedCard, setSelectedCard] = useState(null);
    const [gameOver, isGameOver] = useState(false);
    const [gameWinner, setGameWinner] = useState(null);


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

                    enemyTurn();
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


                    enemyTurn();
                }
                
                
                return updatedFields;
            });
        }
    };

    useEffect(() => {
        isGameEndsFunc();
    }, [playerFields, enemyFields]);
    function isGameEndsFunc() {
        const calculateFieldScore = (field) =>
            field.reduce(
                (acc, card, index, arr) => {
                    if (arr[index - 1] && arr[index - 1].value === 'K') {
                        const lastCardValue = parseInt(card.logicValue || card.value, 10) || 0;
                        return acc + lastCardValue * 2;
                    }
                    return acc + (parseInt(card.logicValue || card.value, 10) || 0);
                },
                0
            );
    
        const playerScores = playerFields.map((field) => calculateFieldScore(field));
        const enemyScores = enemyFields.map((field) => calculateFieldScore(field));
    
        const allPlayerFieldsAbove21 = playerScores.every((score) => score > 21);
        const allEnemyFieldsAbove21 = enemyScores.every((score) => score > 21);
    
        if (allPlayerFieldsAbove21) {
            isGameOver(true);
            setGameWinner("YOU");
        }
        if (allEnemyFieldsAbove21) {
            isGameOver(true);
            setGameWinner("AI");
        }
    }
    const enemyTurn = () => {
        setEnemyFields((prevFields) => {
            const updatedFields = [...prevFields];
            let cardPlayed = false;
    
            const bestMove = determineBestMove(enemyInventory, updatedFields, playerFields);
    
            console.log("Enemy Inventory:", enemyInventory);
            console.log("Best Move:", bestMove);
    
            if (bestMove) {
                const { card, fieldIndex } = bestMove;
                const field = updatedFields[fieldIndex];
    
                console.log("AI is attempting to play card:", card, "on field:", fieldIndex);
    
                // Check if we are trying to place J, K, or Q on an empty field
                if (field.length === 0 && ['J', 'K', 'Q'].includes(card.value)) {
                    console.log("Cannot place J, K, or Q on an empty field.");
                } else {
                    // Proceed with attempting to place the card
                    if (card.value === 'J' && field.length > 0) {
                        // Logic for J card
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
                            cardPlayed = true;
                        }
                    } else if (card.value === 'K' && field.length > 0) {
                        // Logic for K card
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
                                console.log("Cannot place K without a number to double.");
                                return prevFields;
                            }
                            const multipliedValue = lastCardValue * 2;
                            const updatedLastCard = { ...lastCard, logicValue: multipliedValue.toString() };
                            updatedFields[fieldIndex] = [
                                ...field.slice(0, lastNumberIndex),
                                updatedLastCard,
                                ...field.slice(lastNumberIndex + 1),
                                { ...card },
                            ];
                            cardPlayed = true;
                        }
                    } else if (card.value === 'Q' && field.length > 0) {
                        // Logic for Q card
                        let lastNumberIndex = -1;
                        for (let i = field.length - 1; i >= 0; i--) {
                            if (!isNaN(parseInt(field[i].value, 10))) {
                                lastNumberIndex = i;
                                break;
                            }
                        }
                        if (lastNumberIndex !== -1) {
                            const lastCardValue = parseInt(field[lastNumberIndex].logicValue || field[lastNumberIndex].value, 10);
                            const secondLastCardValue = lastNumberIndex > 0
                                ? parseInt(field[lastNumberIndex - 1].logicValue || field[lastNumberIndex - 1].value, 10)
                                : null;
                            const isAscending = secondLastCardValue !== null ? secondLastCardValue < lastCardValue : true;
                            updatedFields[fieldIndex] = [...field, { ...card, isAscending: !isAscending }];
                            cardPlayed = true;
                        }
                    } else if (field.length > 1) {
                        // Logic for regular number card with direction checking
                        const direction = field[field.length - 1].isAscending !== false;
                        const lastCardValue = parseInt(field[field.length - 1].logicValue || field[field.length - 1].value, 10);
                        const cardValue = parseInt(card.value, 10);
                        if (direction && cardValue <= lastCardValue) {
                            console.log("Card does not fit ascending order.");
                            return prevFields;
                        }
                        if (!direction && cardValue >= lastCardValue) {
                            console.log("Card does not fit descending order.");
                            return prevFields;
                        }
                        updatedFields[fieldIndex] = [...field, card];
                        cardPlayed = true;
                    } else if (field.length === 0) {
                        updatedFields[fieldIndex] = [...field, card];
                        cardPlayed = true;
                    }
    
                    if (cardPlayed) {
                        console.log("AI successfully played card:", card, "on field:", fieldIndex);
                        setEnemyInventory((prevInventory) =>
                            prevInventory.filter((c) => c !== card)
                        );
                        return updatedFields;
                    }
                }
            }
    
            // Fallback logic: Try placing the smallest numbered card on an empty field
            if (!cardPlayed) {
                const smallestCard = enemyInventory
                    .filter((c) => !isNaN(parseInt(c.value, 10))) // Filter only numbered cards
                    .sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10))[0]; // Get smallest card
    
                if (smallestCard) {
                    for (let i = 0; i < updatedFields.length; i++) {
                        if (updatedFields[i].length === 0) { // Find an empty field
                            updatedFields[i] = [smallestCard];
                            setEnemyInventory((prevInventory) =>
                                prevInventory.filter((c) => c !== smallestCard)
                            );
                            console.log("Fallback: AI placed smallest card:", smallestCard, "on field:", i);
                            cardPlayed = true;
                            break;
                        }
                    }
                }
            }
    
            if (!cardPlayed) {
                console.log("AI failed to play any card.");
            }
    
            return updatedFields;
        });
    };
    
    

    const determineBestMove = (enemyInventory, enemyFields, playerFields) => {
        for (const card of enemyInventory) {
            for (let i = 0; i < enemyFields.length; i++) {
                const field = enemyFields[i];
    
                if (
                    field.length === 0 ||
                    card.value === 'J' ||
                    card.value === 'Q' ||
                    card.value === 'K' ||
                    parseInt(card.value, 10) > parseInt(field[field.length - 1]?.value || 0)
                ) {
                    return { card, fieldIndex: i };
                }
            }
        }
        return null;
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
            {gameOver && 
                <div className="winPopup">
                    <span> {gameWinner} win! </span>
                    <NavLink to='/'  onClick={resetGame} > Again </NavLink>
                </div>
            }
        </div>
    );
}

export default Layout;
