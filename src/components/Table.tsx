import * as React from 'react';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Table: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const getData = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8081/matches');
      const dataJSON = await response.json();
      console.log(Object.keys(dataJSON.XmlSports.Sport['0']));
      const dataMatches = dataJSON.XmlSports.Sport['0'].Event;
      setData(parseData(dataMatches));
      console.log(data);
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
        matches: game.Match.map((match: any) => {
          return {
            id: match.$.ID,
            date: new Date(match.$.StartDate),
            name: match.$.Name,
            bet: match.Bet[0].Odd.reduce((res: any, curr: any) => {
              res[curr.$.Name] = curr.$.Value;
              return res;
            }, {})
          };
        })
      };
    });
  };

  const allMatches = (dt: any): any => {
    return dt.map((game: any) => game.matches.map((match: any) => ({ ...match, game: game.game, league: game.league }))).flat();
  };

  useEffect(() => {
    getData()
      .then(res => console.log(res ? 'Successfully fetched and parsed data' : 'Error fetching data'))
      .catch(console.error);
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {allMatches(data).map((match: any) => {
        return (
          <div key={match.id}>
            <span>{match.game} - {match.league} - {match.name}</span>
          </div>
        );
      })}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Table;
