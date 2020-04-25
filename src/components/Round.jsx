import React from 'react';
import CharCard from './CharCard';
import chars from '../characters/characters';


export default ({ roundParams }) => {

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

    const addDups = (arr) => arr.reduce((pV, cV, cI, arr) => [...pV, cV, cV], []);


    const randomChars = getRandomChars(limit);
    console.log(addDups(randomChars));

    return randomChars;
  }


  console.log(selectChars(chars, roundParams.charNum));

  return (
    <>
      Round Component
      <CharCard roundParams={roundParams} />
    </>
  );
};
