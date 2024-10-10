import React from 'react';
import club from './../img/club.png';
import diamond from './../img/diamond.png';
import heart from './../img/heart.png';
import spade from './../img/spade.png';

const Card = ({ suit, value, onClick }) => {
  // Map the suit to the corresponding image
  const suitImages = {
    club: club,
    diamond: diamond,
    heart: heart,
    spade: spade,
  };

  return (
    <div className="card" onClick={onClick}>
      <img className='card-suit card-suit-top' src={suitImages[suit]} alt={suit} />
      <div className="card-value">{value}</div>
      <img className='card-suit card-suit-bottom' src={suitImages[suit]} alt={suit} />
    </div>
  );
};

export default Card;