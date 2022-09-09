import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { AppBar } from '@mui/material';

// create theme mui
const theme = {
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    }
  }
};
// add an appbar to the app component

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  );
};

export default App;
