import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Box className={classes.root} mb={5}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Memory
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}