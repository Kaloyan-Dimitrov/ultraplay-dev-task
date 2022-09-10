// Description: This component is used to display the section for each game.
// It contains the name of the game as the first row
// and a collapsible section, containing all the leagues in that game.

import * as React from 'react';
import { Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Table.css';
import { League } from '../App';
import { LeagueMatchesRow } from './LeagueMatchesRow';
import { getLeaguesByGame } from '../utils/MatchesData';

interface Props {
  gameName: string
  allLeagues: League[]
}

export const GameLeaguesRow: React.FC<Props> = ({ gameName, allLeagues }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>

      <TableRow className="game-row" sx={{ bgcolor: 'primary.main' }}>
        <TableCell>
          {gameName}
        </TableCell>
        <TableCell align='right'>
          <IconButton
            sx={{ color: 'white' }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            data-testid="expand-button"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" data-testid="collapsible" unmountOnExit>
            <TableContainer sx={{ width: '100%' }}>
              <Table sx={{ width: '100%' }} size="small">
                <TableBody>
                  {
                    getLeaguesByGame(allLeagues, gameName).map((league: League) => (
                      <LeagueMatchesRow key={league.name} league={league} />
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment >
  );
};
