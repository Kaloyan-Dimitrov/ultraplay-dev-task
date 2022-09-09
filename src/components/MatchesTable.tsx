import * as React from 'react';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, TableBody, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import './MatchesTable.css';

interface Match {
  id: string
  date: Date
  name: string
  bet: {
    '1': number
    'X'?: number
    '2': number
  }
  game: string
  league: string
}

const MatchesTable: React.FC = () => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const getData = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8081/matches');
      const dataJSON = await response.json();
      console.log(Object.keys(dataJSON.XmlSports.Sport['0']));
      const dataMatches = dataJSON.XmlSports.Sport['0'].Event;
      setGames(parseData(dataMatches));
      console.log(games);
      setLoading(false);
      return true;
    } catch (err) {
      // setError(err);
      console.error(err);
      setLoading(false);
      return false;
    }
  };

  const parseData = (dt: any): any => {
    return dt.map((game: any) => {
      return {
        game: game.$.Name.split(', ')[0],
        league: game.$.Name.split(', ')[1],
        matches: game.Match.map((match: any): Match => {
          return {
            id: match.$.ID,
            date: new Date(match.$.StartDate),
            name: match.$.Name,
            bet: match.Bet[0].Odd.reduce((res: any, curr: any) => {
              res[curr.$.Name] = curr.$.Value;
              return res;
            }, {}),
            game: game.$.Name.split(', ')[0],
            league: game.$.Name.split(', ')[1]
          };
        })
      };
    });
  };

  const allMatches = (dt: any): Match[] => {
    if (dt === null) return [];
    return dt.map((game: any) => game.matches.map((match: any) => ({ ...match, game: game.game, league: game.league }))).flat().sort((a: Match, b: Match) => a.date.getTime() - b.date.getTime());
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  };

  useEffect(() => {
    getData()
      .then(res => console.log(res ? 'Successfully fetched and parsed data' : 'Error fetching data'))
      .catch(console.error);
  }, []);

  return (
    <div style={{ width: '100%' }}>
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
