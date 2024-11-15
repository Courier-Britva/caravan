import React, { useState } from 'react';
import Card from './Card.js';
import Layout from './Layout.js';

import club from './../img/club.png';
import diamond from './../img/diamond.png';
import heart from './../img/heart.png';
import spade from './../img/spade.png';

function Selector() {
    const valuesArr = ['6', '7', '8', '9', '10', 'J', 'K', 'Q'];
    const namesArr = ['club', 'diamond', 'heart', 'spade'];

    const imageMap = {
        club: club,
        diamond: diamond,
        heart: heart,
        spade: spade,
    };


    const [availableCards, setAvailableCards] = useState(
        namesArr.flatMap(name => valuesArr.map(value => ({ name, value })))
    );
    const[originalCards, setOriginalCards] = useState(availableCards)
    const [selectedCards, setSelectedCards] = useState([]);
    const [isGame, setIsGame] = useState()

    function toggleCardSelection(name, value, status) {
        if(selectedCards.length >= 20 && status === 'add') {
            return
        }
        const card = { name, value };

        if (availableCards.some(c => c.name === name && c.value === value)) {
            setAvailableCards(prevCards => prevCards.filter(c => c.name !== name || c.value !== value));
            setSelectedCards(prevCards => [...prevCards, card]);
        } 

        else {
            setSelectedCards(prevCards => prevCards.filter(c => c.name !== name || c.value !== value));
            setAvailableCards(prevCards => [...prevCards, card]);
        }
    }


    function randomSelectCards() {
        setSelectedCards([]);
    
        const numToSelect = Math.min(20, originalCards.length); 
        const selectedIndices = new Set();
    
        while (selectedIndices.size < numToSelect) {
            const randomIndex = Math.floor(Math.random() * originalCards.length);
            selectedIndices.add(randomIndex);
        }
    
        const newSelectedCards = Array.from(selectedIndices).map(index => originalCards[index]);
    
        setAvailableCards(originalCards.filter((_, index) => !selectedIndices.has(index))); 
        setSelectedCards(newSelectedCards); 
        setIsGame(true); 
    }
    
    function setGameBegin() {
        if(selectedCards.length > 19) {
            console.log(selectedCards)
            setIsGame(true)
        }
    }
    return (
        <>
        {!isGame && 
            <>
                <div className='cards_selector_head'>
                    <p>Select 20 cards from Cards list or <button onClick={randomSelectCards}>Let lady Luck to decide</button>
                    </p>
                    <a  className='cards_selector_head__link' onClick={setGameBegin}>
                        {(20 - selectedCards.length != 0) &&
                            <>
                                Press here once you ready. you need {20 - selectedCards.length} more cards for it
                            </>
                        }
                        {(20 - selectedCards.length === 0) &&
                            <>
                                Press here once you ready.
                            </>
                        }
                    </a>
                </div>
                <div className='cards_selector_table'>
                    <div>
                        <span className='cards_selector_title'>Cards list</span>
                        <div className='cards_selector_container'>
                            {availableCards.map(({ name, value }) => (
                                <div
                                    key={`${name}-${value}`}
                                    onClick={() => toggleCardSelection(name, value, 'add')}
                                >
                                    <Card 
                                        cardName={imageMap[name]} 
                                        cardValue={value}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className='cards_selector_title'>Selected Cards</span>
                        <div className='cards_selector_container'>
                            {selectedCards.map(({ name, value }) => (
                                <div 
                                    key={`${name}-${value}-selected`}
                                    onClick={() => toggleCardSelection(name, value, 'remove')}
                                >
                                    <Card 
                                        cardName={imageMap[name]} 
                                        cardValue={value}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        }

        {isGame &&
            <>
                <Layout
                    setSelectedCards={setSelectedCards}
                    selectedCards={selectedCards}
                    imageMap={imageMap}
                />
            </>
        }
        </>
    );
}

export default Selector;
