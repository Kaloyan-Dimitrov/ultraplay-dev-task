// create a collapsible table row component

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
        <TableCell colSpan={2}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {league.name}
        </TableCell>
        <TableCell>1</TableCell>
        <TableCell>X</TableCell>
        <TableCell>2</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer sx={{ width: '100%' }}>
              <Table sx={{ width: '100%' }} size="small">
                <TableBody>
                  {league.matches.map((match: Match, index) => (
                    <TableRow
                      key={match.id}
                    >
                      <TableCell className="date-cell">{formatDate(match.date)}</TableCell>
                      <TableCell>{match.name}</TableCell>
                      <TableCell>{match.bet['1']}</TableCell>
                      <TableCell>{match.bet.X}</TableCell>
                      <TableCell>{match.bet['2']}</TableCell>
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
