import React from 'react';


export default ({ roundParams }) => {

  return (
    <>
    <p>Round: {roundParams.round}</p>
    <p>Characters: {roundParams.charNum}</p>
    </>
  );
};
