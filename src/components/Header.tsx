// react appbar component

import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SportsEsportsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Esports
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
