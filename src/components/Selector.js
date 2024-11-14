import React from 'react';
import club from './../img/club.png';
import diamond from './../img/diamond.png';
import heart from './../img/heart.png';
import spade from './../img/spade.png';
import Card from './Card.js';

function Selector() {
    let valuesArr = ['6', 
                     '7', 
                     '8', 
                     '9', 
                     '10', 
                     'J', 
                     'K', 
                     'Q'
                    ]

    let namesArr = ['club',
                    'diamond',
                    'heart',
                    'spade'
                   ]

    let imageMap = {
        club: club,
        diamond: diamond,
        heart: heart,
        spade: spade,
    };

    let selectedCards = []

    function addSelectedCard(){
        
    }
            
    return (
        <>
            <div className='cards_selector_container'>
                {namesArr.map(name => (
                    valuesArr.map(value => (
                        <Card 
                            key={`${name}-${value}`}  
                            cardName={imageMap[name]} 
                            cardValue={value}
                            on
                        />
                    ))
                ))}
            </div>
        </>
    );
}
    
export default Selector;
