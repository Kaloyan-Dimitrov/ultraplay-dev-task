import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Backdrop, CircularProgress, createTheme, PaletteOptions, ThemeOptions } from '@mui/material';
import Header from './components/Header';
import ByDateTable from './components/ByDateTable';
import { parseData } from './utils/MatchesData';
import ByGamesTable from './components/ByGamesTable';

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
// configure custom primary and secondary colors
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#213951'
    },
    secondary: {
      main: '#21B977'
    }
  }
};
const theme = createTheme(themeOptions);

export interface Bet {
  '1': number
  'X'?: number
  '2': number
}

export interface Match {
  id: string
  date: Date
  name: string
  bet: Bet
  game: string
  league: string
}

export interface League {
  game: string
  name: string
  matches: Match[]
}

const App: React.FC = () => {
  const [leagues, setGames] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'league' | 'date'>('date');

  const changeSortBy = (): void => {
    if (sortBy === 'date') {
      setSortBy('league');
    } else {
      setSortBy('date');
    }
  };

  const getData = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8081/matches');
      const dataJSON = await response.json();
      setGames(parseData(dataJSON));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    getData()
      .then(res => console.log(res ? 'Successfully fetched and parsed data' : 'Error fetching data'))
      .catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {error !== null
        ? <div data-testid="error">Error: {error?.message}</div>
        : <>
          <Header sortBy={sortBy} changeSortBy={changeSortBy}></Header>
          {sortBy === 'date'
            ? <ByDateTable leagues={leagues}/>
            : <ByGamesTable leagues={leagues}/>
          }
        </>
      }

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
};

export default App;
