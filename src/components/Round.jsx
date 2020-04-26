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
  let isTimeoutSet = useRef(false);

  // runs when a new round is initialized. 
  // initializes all arrays and objects to control state of play
  useEffect(() => {
    const selectedChar = selectChars(chars, roundParams.charNum);
    setCharsArr(selectedChar)
    setFlipStatus(selectedChar.reduce((pV, cV) => {
      return { ...pV, [cV]: false }
    }, {}))
  }, [roundParams.charNum]);

  // checks if all cards displayed to the user have been matched.
  // if true, the next round of play will be initialized
  useEffect(() => {
    const unFlippedCards = Object.keys(flipStatus).filter(val => flipStatus[val] === true)
    if (unFlippedCards.length === Object.keys(flipStatus).length) {
      handleLevelUp()
    }
  }, [flipStatus]);

  // configures data for each round of play
  const selectChars = (arr, limit) => {

    // returns random integer from 0 to arr length
    const getRandomIndex = (arr) => Math.random() * arr.length;

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
    if (isTimeoutSet.current === false) {
      // record which card was selected by the user
      const id = e.currentTarget.dataset.id;
      userPicks.current.push(id)
      // only flip the card if it was face down and not displaying the character
      if (flipStatus[id] === false) {
        setFlipStatus({ ...flipStatus, [id]: true })
      }
      // if this is the user's second card selection
      if (userPicks.current.length === 2) {
        // if the user's has selected a matching pair of cards
        if (userPicks.current[0].split('-')[0] !== userPicks.current[1].split('-')[0]) {
          setTimeout(() => {
            setFlipStatus({ ...flipStatus, [userPicks.current[0]]: false, [userPicks.current[1]]: false });
            userPicks.current = [];
            isTimeoutSet.current = false;
          }, 1000);
          isTimeoutSet.current = true;
        } else {
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
