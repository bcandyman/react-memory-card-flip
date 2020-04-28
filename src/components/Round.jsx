import React, { useState, useEffect, useRef } from 'react';
import CharCard from './CharCard';
import chars from '../characters/characters';
import { Grid } from '@material-ui/core';


export default ({ roundParams, handleLevelUp }) => {

  //initialize variables

  // contains all randomly selected characters to display in round of play
  const [charsArr, setCharsArr] = useState([]);
  // contains flipped status of all cards displayed to the user.
  const [flipStatus, setFlipStatus] = useState({ cardId: 'character' });
  // contains user selection pairs.
  const userPicks = useRef([]);
  // flags if new round is being loaded 
  const isChangingRounds = useRef(false);
  let disableCardFlip = useRef(false);

  // runs when a new round is initialized. 
  // initializes all arrays and objects to control state of play
  useEffect(() => {
    // select which caracters will be displayed on the round
    const selectedChar = selectChars(chars, roundParams.charNum);
    // configure character data for entry into state
    setCharsArr(selectedChar)
    // set state to keep track of flipped cards, setting each object value to false
    setFlipStatus(selectedChar.reduce((pV, cV) => ({ ...pV, [cV]: false }), {}))
  }, [roundParams.charNum]);

  // checks if all cards displayed to the user have been matched.
  // if true, the next round of play will be initialized.
  useEffect(() => {
    // contains all keys that have a 'true' value to determine which cards have been reset
    const unFlippedCards = Object.keys(flipStatus).filter(val => flipStatus[val] === true)
    // if all cards have a value of 'true' or isChangingRounds flag has been raised
    if (unFlippedCards.length === Object.keys(flipStatus).length || isChangingRounds.current === true) {
      // raise flag until all cards have been flipped
      isChangingRounds.current = true;
      // raise flag to disable user interaction until all cards have been flipped
      disableCardFlip.current = true;
      prepareForLevelUp(unFlippedCards);
    }
  }, [flipStatus]);


  // unflip all cards in preparation of level up
  const prepareForLevelUp = (x) => {
    // check for cards to flip. 
    // if array is empty, all cards have been flipped.
    if (x.length === 0) {
      // lower flag for next round of play
      isChangingRounds.current = false;
      // lower flag to allow user interaction
      disableCardFlip.current = true;
      // load next round
      setTimeout(() => handleLevelUp(), 1000);
    }
    // select a random value to determine which card to flip
    const y = x.splice(getRandomIndex(x), 1);
    // determine how long each card has to flip
    const t = 2000 / (roundParams.charNum * 2);
    // flip the card
    setTimeout(() => setFlipStatus({ ...flipStatus, [y]: false }), t);
  };

  // returns random integer from 0 to arr length
  const getRandomIndex = (arr) => Math.random() * arr.length;

  // configures data for each round of play
  const selectChars = (arr, limit) => {


    // return random items pulled from the parent array 
    const getRandomChars = (limit) => {
      const arrCopy = [...arr];
      let result = [];
      while (result.length < limit) {
        result.push(...arrCopy.splice(getRandomIndex(arrCopy), 1));
      }
      return result;
    }

    // appends duplicates to the passed array
    // each array item will have '-1' or '-2' appended
    const addDups = (arr) => arr.reduce((pV, cV) => [...pV, cV + '-1', cV + '-2'], []);

    // shuffles an array's items
    const shuffleArr = (arr) => arr
      .reduce((pV, cV) => {
        pV.splice(getRandomIndex(pV), 0, cV);
        return pV;
      }, []);

    const x = getRandomChars(limit);
    const y = addDups(x);
    const z = shuffleArr(y);
    return z;
  };


  // handles when a user clicks a card to display it's character
  const onHandleFlip = e => {
    // ensure a timer from a previous selection is not active
    if (disableCardFlip.current === false) {
      console.log('b');
      // record which card was selected by the user
      const id = e.currentTarget.dataset.id;
      // only flip the card if it was face down and not displaying the character
      if (flipStatus[id] === false) {
        userPicks.current.push(id)
        console.log('c');

        setFlipStatus({ ...flipStatus, [id]: true })
      }
      // if this is the user's second card selection
      if (userPicks.current.length === 2) {
        console.log('d');
        // if the user's has selected a matching pair of cards
        if (userPicks.current[0].split('-')[0] !== userPicks.current[1].split('-')[0]) {
          setTimeout(() => {
            // flip cards to face down, user does not have a match
            setFlipStatus({ ...flipStatus, [userPicks.current[0]]: false, [userPicks.current[1]]: false });
            // clear array for next selected pair
            userPicks.current = [];
            // lower timeout flag
            disableCardFlip.current = false;
          }, 1000);
          // raise timeout flag
          disableCardFlip.current = true;
        } else {
          // clear array for next selected pair
          userPicks.current = [];
        }
      }
    }
  }

  return (
    <Grid container justify="center" spacing={1}>
      {charsArr.map((val, index) => (
        < Grid item key={index} style={{ minWidth: '150px', maxWidth: '250px', flexBasis: '25%' }}>
          <CharCard character={val.split('-')[0]} id={val} flipped={flipStatus[val]} onHandleFlip={onHandleFlip} />
        </ Grid>
      ))}
    </Grid>
  );
};
