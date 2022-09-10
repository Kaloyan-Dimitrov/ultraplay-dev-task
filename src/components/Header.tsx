// react appbar component

import * as React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

interface Props {
  sortBy: 'league' | 'date'
  changeSortBy: () => void
}

const Header: React.FC<Props> = ({ sortBy, changeSortBy }) => {
  return (
    <AppBar position="static" sx={{ borderBottom: '1px white solid' }}>
      <Toolbar>
        <SportsEsportsIcon />
        <Typography variant="h6" component="div" sx={{ mr: 2, ml: 2 }}>
          Esports
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => changeSortBy()}>Sort by {sortBy === 'date' ? 'league' : 'date'} </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
