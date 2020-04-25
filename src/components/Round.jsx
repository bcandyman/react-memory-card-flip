import React, { useState, useEffect } from 'react';
import CharCard from './CharCard';
import chars from '../characters/characters';
import { Grid } from '@material-ui/core'


export default ({ roundParams }) => {

  useEffect(() => setCharsArr(selectChars(chars, roundParams.charNum)), [roundParams.charNum]);

  const [charsArr, setCharsArr] = useState([]);

  const selectChars = (arr, limit) => {

    const getRandomChars = (limit) => {
      const arrCopy = [...arr];
      let result = [];
      while (result.length < limit) {
        const x = Math.floor(Math.random() * arrCopy.length);
        result.push(...arrCopy.splice(x, 1));
      }
      return result;
    }

    const addDups = (arr) => arr
      .reduce((pV, cV) => [...pV, cV + '-1', cV + '-2'], []);

    const randomizeArr = (arr) => arr
      .reduce((pV, cV) => {
        const x = Math.floor(Math.random() * pV.length);
        pV.splice(x, 0, cV)
        return pV
      }, [])

    const x = getRandomChars(limit);
    const y = addDups(x)
    const z = randomizeArr(y)
    return z;
  }


  return (
    <Grid container justify="center" spacing={1}>
      {charsArr.map((val, index) => (
        < Grid item key={index} style={{ minWidth: '150px', maxWidth: '250px', flexBasis: '25%' }}>
          <CharCard key={index} character={val.split('-')[0]} id={val} />
        </ Grid>
      ))}
    </Grid>
  );
};
