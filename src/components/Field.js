import React from 'react';

function Field({ fieldIndex, isHighlighted, onFieldClick, cards }) {
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
                    <div key={`${name}-${value}-${index}`}>
                        {name} {value}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Field;
