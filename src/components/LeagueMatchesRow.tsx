// Description: This component is used to display the section for each league.
// It contains the name of the league as the first row
// and a collapsible section, containing all the matches in that league (displaying their names, dates and bets).

import * as React from 'react';
import { Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { League, Match } from '../App';
import { formatDate } from '../utils/MatchesData';
import './Table.css';

interface Props {
  league: League
}

export const LeagueMatchesRow: React.FC<Props> = ({ league }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>

      <TableRow className="league-row">
        <TableCell width={'52%'} colSpan={2}>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ padding: '0', mr: '1em' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {league.name}
        </TableCell>
        <TableCell className="bet-cell">1</TableCell>
        <TableCell className="bet-cell">X</TableCell>
        <TableCell className="bet-cell">2</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer sx={{ width: '100%' }}>
              <Table sx={{ width: '100%' }} size="small">
                <TableBody>
                  {league.matches.map((match: Match, index) => (
                    <TableRow
                      key={match.id}
                    >
                      <TableCell className="date-cell" width={'15%'} >{formatDate(match.date)}</TableCell>
                      <TableCell width={'37%'}>{match.name}</TableCell>
                      <TableCell className="bet-cell" width={'16%'}>{match.bet['1']}</TableCell>
                      <TableCell className="bet-cell" width={'16%'}>{match.bet.X}</TableCell>
                      <TableCell className="bet-cell" width={'16%'}>{match.bet['2']}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
};
