import React, { useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import CharImage from './CharImage';

export default ({ character, id, flipped, onHandleFlip }) => {

  useEffect(() => {
    return () => {
      console.log('googly');
      window.removeEventListener('onClick', onHandleFlip)

    }
  }, [])

  return (
    <div data-id={id} data-character={character} onClick={onHandleFlip}>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <CharImage style={{ backgroundColor: 'black' }} src='../images/star2.png' alt='character card'></CharImage>
        <CharImage src={`../images/${character}.png`} alt='character'></CharImage>
      </ReactCardFlip>
    </div>
  )
};
