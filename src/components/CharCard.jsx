import React from 'react';
import { Paper } from '@material-ui/core';

const style = {
  image: {
    width: '100%',
    backgroundColor: 'black'
  }
}

export default ({ character, id }) => {

  return (
    <Paper elevation={5}>
      <img data-id={id} name={character} src={`../images/${character}.png`} alt='character' style={style.image}></img>
    </Paper>
  )
};
