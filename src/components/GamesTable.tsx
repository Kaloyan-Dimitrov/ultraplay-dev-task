import React from 'react';
import { League } from '../App';
import { TableBody, Table, TableContainer } from '@mui/material';
import { GameLeaguesRow } from './GameLeaguesRow';

interface Props {
  leagues: League[]
}

const GamesTable: React.FC<Props> = ({ leagues }) => {
  const uniqueGameNames: string[] = [...new Set(leagues.map((league: League) => league.game))];

  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }} size="small">
        <TableBody>
          {/* {leagues.map((league: League, index) => (
            <LeagueMatchesRow key={league.name} league={league}/>
          ))} */}
          {
            uniqueGameNames.map((gameName: string, index) => (
              <GameLeaguesRow gameName={gameName} key={index} allLeagues={leagues}></GameLeaguesRow>
            ))
          };

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GamesTable;
