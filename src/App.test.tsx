import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// test app header renders
test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Esports/i);
  expect(headerElement).toBeInTheDocument();
});
