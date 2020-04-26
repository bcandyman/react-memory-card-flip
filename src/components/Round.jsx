import React, { useState, useEffect, useRef } from 'react';
import CharCard from './CharCard';
import chars from '../characters/characters';
import { Grid } from '@material-ui/core';


export default ({ roundParams, handleLevelUp }) => {

  const [charsArr, setCharsArr] = useState([]);
  const [flipStatus, setFlipStatus] = useState({ cardId: 'character' });
  const userPicks = useRef([])

  useEffect(() => {
    const selectedChar = selectChars(chars, roundParams.charNum);
    setCharsArr(selectedChar)
    setFlipStatus(selectedChar.reduce((pV, cV) => {
      return { ...pV, [cV]: false }
    }, {}))
  }, [roundParams.charNum]);

  useEffect(() => {
    const unFlippedCards = Object.keys(flipStatus).filter(val => flipStatus[val] === true)
    if (unFlippedCards.length === Object.keys(flipStatus).length) {
      console.log('need to level up!');
      handleLevelUp()
    }
  }, [flipStatus]);


  const selectChars = (arr, limit) => {

    const getRandomIndex = (arr) => Math.random() * arr.length;

    const getRandomChars = (limit) => {
      const arrCopy = [...arr];
      let result = [];
      while (result.length < limit) {
        result.push(...arrCopy.splice(getRandomIndex(arrCopy), 1));
      }
      return result;
    }

    const addDups = (arr) => arr.reduce((pV, cV) => [...pV, cV + '-1', cV + '-2'], []);

    const randomizeArr = (arr) => arr
      .reduce((pV, cV) => {
        pV.splice(getRandomIndex(pV), 0, cV);
        return pV;
      }, []);

    const x = getRandomChars(limit);
    const y = addDups(x);
    const z = randomizeArr(y);
    return z;
  };


  const onHandleFlip = e => {
    const id = e.currentTarget.dataset.id;
    userPicks.current.push(id)

    if (flipStatus[id] === false) {
      setFlipStatus({ ...flipStatus, [id]: true })
    }

    if (userPicks.current.length === 2) {
      if (userPicks.current[0].split('-')[0] !== userPicks.current[1].split('-')[0]) {
        setFlipStatus({ ...flipStatus, [userPicks.current[0]]: false, [userPicks.current[1]]: false });
      }
      userPicks.current = [];
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
