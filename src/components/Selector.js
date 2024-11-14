import React, { useState } from 'react';
import club from './../img/club.png';
import diamond from './../img/diamond.png';
import heart from './../img/heart.png';
import spade from './../img/spade.png';
import Card from './Card.js';

function Selector() {
    const valuesArr = ['6', '7', '8', '9', '10', 'J', 'K', 'Q'];
    const namesArr = ['club', 'diamond', 'heart', 'spade'];

    const imageMap = {
        club: club,
        diamond: diamond,
        heart: heart,
        spade: spade,
    };

    // State for available and selected cards
    const [availableCards, setAvailableCards] = useState(
        namesArr.flatMap(name => valuesArr.map(value => ({ name, value })))
    );
    const [selectedCards, setSelectedCards] = useState([]);

    // Function to toggle cards between available and selected lists
    function toggleCardSelection(name, value) {
        const card = { name, value };

        // If the card is in availableCards, move it to selectedCards
        if (availableCards.some(c => c.name === name && c.value === value)) {
            setAvailableCards(prevCards => prevCards.filter(c => c.name !== name || c.value !== value));
            setSelectedCards(prevCards => [...prevCards, card]);
        } 
        // If the card is in selectedCards, move it back to availableCards
        else {
            setSelectedCards(prevCards => prevCards.filter(c => c.name !== name || c.value !== value));
            setAvailableCards(prevCards => [...prevCards, card]);
        }
    }

    // Function to randomly select up to 20 cards from availableCards and add to selectedCards
    function randomSelectCards() {
        if (availableCards.length === 0) return; // No cards left to select

        const numToSelect = Math.min(20, availableCards.length); // Ensure we don't exceed the number of available cards
        const selectedIndices = new Set();

        // Pick unique random indices
        while (selectedIndices.size < numToSelect) {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            selectedIndices.add(randomIndex);
        }

        const newSelectedCards = Array.from(selectedIndices).map(index => availableCards[index]);
        
        setAvailableCards(prevCards => prevCards.filter((_, index) => !selectedIndices.has(index)));
        setSelectedCards(prevCards => [...prevCards, ...newSelectedCards]);
    }

    return (
        <>
            <p>Select 20 cards from Cards list or <button onClick={randomSelectCards} disabled={availableCards.length === 0}>Let lady Luck to decide</button>
            </p>
            <span className='cards_selector_title'>Cards list</span>
            <div className='cards_selector_container'>
                {availableCards.map(({ name, value }) => (
                    <div
                        key={`${name}-${value}`}
                        onClick={() => toggleCardSelection(name, value)}
                    >
                        <Card 
                            cardName={imageMap[name]} 
                            cardValue={value}
                        />
                    </div>
                ))}
            </div>

            <span className='cards_selector_title'>Selected Cards</span>
            <div className='cards_selector_container'>
                {selectedCards.map(({ name, value }) => (
                    <div 
                        key={`${name}-${value}-selected`}
                        onClick={() => toggleCardSelection(name, value)}
                    >
                        <Card 
                            cardName={imageMap[name]} 
                            cardValue={value}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Selector;
