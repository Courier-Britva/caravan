import React from 'react';
import Card from './Card';

import club from './../img/club.png';
import diamond from './../img/diamond.png';
import heart from './../img/heart.png';
import spade from './../img/spade.png';

function Field({  isHighlighted, onFieldClick, cards }) {
    
    const imageMap = {
        club: club,
        diamond: diamond,
        heart: heart,
        spade: spade,
    };

    return (
        <div
            className={`field ${isHighlighted ? 'highlight' : ''}`} 
            onClick={(e) => {
                e.stopPropagation(); 
                onFieldClick();
            }}
        >
            <div className="field-cards">
                {cards.map(({ name, value }, index) => (
                    <Card 
                        cardName={imageMap[name]} 
                        cardValue={value}
                    />
                ))}
            </div>
        </div>
    );
}

export default Field;
