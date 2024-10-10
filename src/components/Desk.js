import React, { useState, useEffect } from 'react';
import Card from './Card';
import './../App.css';

const Desk = ({ playerCards, deck, caravans, onPlayCard, onDrawCard }) => {
  const [aiCaravan, setAiCaravan] = useState([]);
  const [playerCaravan, setPlayerCaravan] = useState(caravans[0]);
  const [winner, setWinner] = useState(null);
  const [aiHand, setAiHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  useEffect(() => {
    if (!winner) {
      handleAiTurn();
      checkWinConditions();
    }
  }, [playerCaravan, aiCaravan]);

  const calculateCaravanValue = (caravan) => {
    return caravan.reduce((total, card) => {
      if (card.value === 'Jack') return total;
      if (['King', 'Queen'].includes(card.value)) return total + 10;
      return total + parseInt(card.value, 10) || 0;
    }, 0);
  };

  const checkWinConditions = () => {
    const playerValue = calculateCaravanValue(playerCaravan);
    const aiValue = calculateCaravanValue(aiCaravan);

    if (playerValue >= 18 && playerValue <= 22) {
      setWinner('Player');
      setPlayerScore(playerValue);
      setAiScore(aiValue);
    } else if (aiValue >= 18 && aiValue <= 22) {
      setWinner('AI');
      setPlayerScore(playerValue);
      setAiScore(aiValue);
    }
  };

  const handleAiTurn = () => {
    if (winner) return;

    const aiCard = aiHand.length > 0 ? aiHand.pop() : null;

    if (aiCard) {
      if (aiCard.value === 'Jack') {
        setPlayerCaravan((prevCaravan) => prevCaravan.slice(0, -1));
      } else {
        setAiCaravan((prevCaravan) => [...prevCaravan, aiCard]);
      }
    } else {
      const newCard = deck.pop();
      setAiHand([...aiHand, newCard]);
      onDrawCard(newCard);
    }
  };

  const handlePlayerPlay = (card) => {
    if (card.value === 'Jack') {
      setAiCaravan((prevCaravan) => prevCaravan.slice(0, -1));
    } else {
      setPlayerCaravan((prevCaravan) => [...prevCaravan, card]);
    }
    onPlayCard(card);
    checkWinConditions();
  };

  const resetGame = (useSameCards = true) => {
    setPlayerCaravan([]);
    setAiCaravan([]);
    setWinner(null);
  };

  return (
    <div className="game-board">
      {winner && (
        <div className="modal">
          <div className="modal-content">
            <span>{winner} Wins!</span>
            <div className="score-board">
              <span>Player Score: {playerScore}</span>
              <span>AI Score: {aiScore}</span>
            </div>
            <button onClick={() => resetGame(true)}>Try Again with Same Cards</button>
            <button onClick={() => resetGame(false)}>Start New Game</button>
          </div>
        </div>
      )}

      <div className="desk">
        <span className='selection-name' >Player's Caravan</span>
        <div className="caravan">
          {playerCaravan.map((card, index) => (
            <Card key={index} suit={card.suit} value={card.value} />
          ))}
        </div>

        <span className='selection-name'>AI's Caravan</span>
        <div className="caravan">
          {aiCaravan.map((card, index) => (
            <Card key={index} suit={card.suit} value={card.value} />
          ))}
        </div>
      </div>

      <div className="player-collection">
        <div className="player-hand">
          {playerCards.map((card, index) => (
            <Card
              key={index}
              suit={card.suit}
              value={card.value}
              onClick={() => handlePlayerPlay(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Desk;
