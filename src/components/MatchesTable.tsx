import * as React from 'react';
import { TableBody, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import './Table.css';
import { allMatches, formatDate } from '../utils/MatchesData';
import { League, Match } from '../App';

interface Props {
  leagues: League[]
}

const MatchesTable: React.FC<Props> = ({ leagues }) => {
  return (
    <div style={{ width: '100%' }}>

      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }} size="small">
          <TableBody>
            {allMatches(leagues).map((match: Match, index) => {
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
                if (match.league === allMatches(leagues)[index - 1].league) {
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
    </div>
  );
};

export default MatchesTable;
