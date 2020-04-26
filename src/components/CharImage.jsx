import React from 'react';
import { Paper } from '@material-ui/core';

export default ({ src, alt, style }) => {

  return (
    <Paper elevation={5} style={style}>
      <img src={src} alt={alt} style={{ width: '100%' }}></img>
    </Paper>
  )
};
