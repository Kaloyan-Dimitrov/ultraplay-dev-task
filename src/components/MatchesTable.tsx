import * as React from 'react';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, TableBody, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import './MatchesTable.css';
import { allMatches, parseData, formatDate } from '../utils/MatchesData';

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

export interface Game {
  game: string
  league: string
  matches: Match[]
}

const MatchesTable: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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
    <div style={{ width: '100%' }}>
      {error !== null && <div>Error: {error?.message}</div>}

      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }} size="small">
          <TableBody>
            {allMatches(games).map((match: Match, index) => {
              const gameRow =
                <TableRow
                  key={match.id}
                >
                  <TableCell className="date-cell">{formatDate(match.date)}</TableCell>
                  <TableCell>{match.name}</TableCell>
                  <TableCell>{match.bet['1']}</TableCell>
                  <TableCell>{match.bet.X}</TableCell>
                  <TableCell>{match.bet['2']}</TableCell>
                </TableRow>;

              if (index !== 0) {
                if (match.league === allMatches(games)[index - 1].league) {
                  return gameRow;
                }
              }

              const leagueRow =
                <TableRow
                  key={match.id + match.league}
                  className="league-row"
                >
                  <TableCell colSpan={2}>{match.league}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>X</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>;

              return [leagueRow, gameRow];
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default MatchesTable;
