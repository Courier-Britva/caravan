import React, { useState } from 'react';
import Desk from './components/Desk';
import CardSelection from './components/CardSelection';
import './App.css';

const Game = () => {
  const [deck, setDeck] = useState(generateDeck());
  const [playerCards, setPlayerCards] = useState([]);
  const [caravan, setCaravan] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isCardSelectionComplete, setIsCardSelectionComplete] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const onSelectCard = (card) => {
    const isCardSelected = selectedCards.some(c => c.suit === card.suit && c.value === card.value);

    if (isCardSelected) {
      setSelectedCards((prevSelectedCards) => prevSelectedCards.filter(c => !(c.suit === card.suit && c.value === card.value)));
      setDeck((prevDeck) => [...prevDeck, card]);
    } else if (selectedCards.length < 8) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, card]);
      setDeck((prevDeck) => prevDeck.filter(c => !(c.suit === card.suit && c.value === card.value)));

      if (selectedCards.length === 7) {
        setTimeout(() => {
          if (window.confirm('You have selected 8 cards. Do you want to start the game?')) {
            setIsCardSelectionComplete(true);
            setIsGameStarted(true);
            setPlayerCards([...selectedCards]);
          }
        }, 100);
      }
    }
  };

  const onPlayCard = (card) => {
    const newCaravan = [...caravan];
    newCaravan.push(card);
    setCaravan(newCaravan);
    setPlayerCards(playerCards.filter(c => c !== card));
  };

  const onDrawCard = (card) => {
    setPlayerCards([...playerCards, card]);
    setDeck(deck.filter(c => c !== card));
  };

  return (
    <div className="background">
      <div className="game">
        {!isGameStarted ? (
          <CardSelection
            deck={deck}
            selectedCards={selectedCards}
            onSelectCard={onSelectCard}
          />
        ) : (
          <Desk
            playerCards={playerCards}
            deck={deck}
            caravans={[caravan]}
            onPlayCard={onPlayCard}
            onDrawCard={onDrawCard}
          />
        )}
      </div>
    </div>
  );
};

const generateDeck = () => {
  const suits = ['heart', 'spade', 'club', 'diamond'];
  const values = [ '3', '6', '10', 'Jack'];
  let deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });
  return deck;
};

export default Game;
