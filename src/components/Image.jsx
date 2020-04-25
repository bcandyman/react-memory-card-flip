import React from 'react';
// import ReactCardFlip from 'react-card-flip';
import { Paper } from '@material-ui/core';

export default ({ character, id }) => {

  const style = {
    image: {
      width: '100%',
      backgroundColor: 'black'
    }
  }

  return (
    <Paper elevation={5}>
      <img data-id={id} name={character} src={`../images/${character}.png`} alt='character' style={style.image}></img>
    </Paper>
  )
}
