import React from 'react';
import { render, screen } from '@testing-library/react';
import ByDateTable from './ByDateTable';
import mockJSON from '../mockMatches.json';
import { parseData } from '../utils/MatchesData';
import ByGamesTable from './ByGamesTable';
import userEvent from '@testing-library/user-event';

const parsedData = parseData(mockJSON);
// test app header renders
describe('renders table, sorted by date correctly', () => {
  test('renders table data', () => {
    render(<ByDateTable leagues={parsedData}/>);
    const tableElement = screen.getByTestId('by-date-table');
    expect(tableElement).toBeInTheDocument();
  });
});

describe('renders table, sorted by game correctly', () => {
  test('renders table data', () => {
    render(<ByGamesTable leagues={parsedData.slice(0, 3)}/>);
    const tableElement = screen.getByTestId('by-games-table');
    expect(tableElement).toBeInTheDocument();
  });

  test('closes and opens collapsible element', async () => {
    render(<ByGamesTable leagues={parsedData.slice(0, 3)}/>);
    const expandButton = screen.getAllByTestId('expand-button')[0];
    const collapsibleElement = screen.getAllByTestId('collapsible')[0];
    userEvent.click(expandButton);
    const newCollapsibleElement = screen.getAllByTestId('collapsible')[0];
    expect(collapsibleElement).toEqual(newCollapsibleElement);
  });
});
