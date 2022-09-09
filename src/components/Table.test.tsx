// test table rendering

import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchesTable from './MatchesTable';

test('renders table', () => {
  render(<MatchesTable />);
  const tableElement = screen.getByText(/Snow/i);
  expect(tableElement).toBeInTheDocument();
});
