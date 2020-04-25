import React from 'react';
import CharCard from './CharCard'

export default ({ roundParams }) => {

  return (
    <>
      Round Component
      <CharCard roundParams={roundParams} />
    </>
  );
};
