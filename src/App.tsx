import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material';
import Header from './components/Header';
import MatchesTable from './components/MatchesTable';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        main: string
      }
    }
  }
  interface ThemeOptions {
    palette?: PaletteOptions
  }
}
// configure primary color

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#213951'
    }
  }
};
const theme = createTheme(themeOptions);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <MatchesTable></MatchesTable>
    </ThemeProvider>
  );
};

export default App;
