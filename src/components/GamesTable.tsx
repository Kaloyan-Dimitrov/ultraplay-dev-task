import React from 'react';
import { League } from '../App';
import { TableBody, Table, TableContainer } from '@mui/material';
import { LeagueMatchesRow } from './LeagueMatchesRow';

interface Props {
  leagues: League[]
}

const GamesTable: React.FC<Props> = ({ leagues }) => {
  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }} size="small">
        <TableBody>
          {leagues.map((league: League, index) => (
            <LeagueMatchesRow key={league.name} league={league}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GamesTable;
