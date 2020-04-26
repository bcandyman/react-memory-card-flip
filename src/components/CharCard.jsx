import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Paper } from '@material-ui/core';


const style = {
  image: {
    width: '100%',
    backgroundColor: 'black'
  }
}

export default ({ character, id, flipped, onHandleFlip }) => {

  return (
    <Paper elevation={5} data-id={id} data-character={character} onClick={onHandleFlip}>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <img src='../images/star2.png' alt='character card' style={style.image}></img>
        <img src={`../images/${character}.png`} alt='character' style={style.image}></img>
      </ReactCardFlip>
    </Paper>
  )
};
