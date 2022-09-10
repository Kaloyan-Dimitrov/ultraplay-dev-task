// Description: Component for the table, sorted by league/game.
// This component displays all the matches in proprietary collapsible sections.
// There is a section for each game, inside of which there are sections for each league,
// containing the matches of that league.

import React from 'react';
import { League } from '../App';
import { TableBody, Table, TableContainer } from '@mui/material';
import { GameLeaguesRow } from './GameLeaguesRow';

interface Props {
  leagues: League[]
}

const ByGamesTable: React.FC<Props> = ({ leagues }) => {
  const uniqueGameNames: string[] = [...new Set(leagues.map((league: League) => league.game))];

  return (
    <TableContainer sx={{ width: '100%' }} className="by-games-table" data-testid="by-games-table">
      <Table sx={{ width: '100%' }} size="small">
        <TableBody>
          {
            uniqueGameNames.map((gameName: string, index) => (
              <GameLeaguesRow gameName={gameName} key={index} allLeagues={leagues}></GameLeaguesRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ByGamesTable;
