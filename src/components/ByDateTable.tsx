import * as React from 'react';
import { TableBody, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import './Table.css';
import { allMatches, formatDate } from '../utils/MatchesData';
import { League, Match } from '../App';

interface Props {
  leagues: League[]
}

const ByDateTable: React.FC<Props> = ({ leagues }) => {
  return (
    <TableContainer sx={{ width: '100%' }} data-testid="by-date-table">
      <Table sx={{ width: '100%' }} size="small">
        <TableBody>
          {allMatches(leagues).map((match: Match, index) => {
            const gameRow =
              <TableRow
                key={match.id}
              >
                <TableCell width={'15%'} className="date-cell">{formatDate(match.date)}</TableCell>
                <TableCell width={'37%'}>{match.name}</TableCell>
                <TableCell width={'16%'} className="bet-cell">{match.bet['1']}</TableCell>
                <TableCell width={'16%'} className="bet-cell">{match.bet.X}</TableCell>
                <TableCell width={'16%'} className="bet-cell">{match.bet['2']}</TableCell>
              </TableRow>;

            if (index !== 0) {
              if (match.league === allMatches(leagues)[index - 1].league) {
                return gameRow;
              }
            }

            const leagueRow =
              <TableRow
                key={match.id + match.league}
                className="league-row"
              >
                <TableCell width={'52%'} colSpan={2}>{match.league}</TableCell>
                <TableCell width={'16%'} className="bet-cell">1</TableCell>
                <TableCell width={'16%'} className="bet-cell">X</TableCell>
                <TableCell width={'16%'} className="bet-cell">2</TableCell>
              </TableRow>;

            return [leagueRow, gameRow];
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ByDateTable;
