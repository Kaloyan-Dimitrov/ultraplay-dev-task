import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import mockJSON from './mockMatches.json';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

// test app header renders
describe('renders app correctly', () => {
  test('renders app header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Esports/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders default by date table', () => {
    const { getByTestId } = render(<App />);
    const tableElement = getByTestId('by-date-table');
    expect(tableElement).toBeInTheDocument();
  });

  test('changes views based on button click', async () => {
    const { getByTestId } = render(<App />);
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    const gamesTableElement = await getByTestId('by-games-table');
    expect(gamesTableElement).toBeInTheDocument();
    userEvent.click(buttonElement);
    const dateTableElement = await getByTestId('by-date-table');
    expect(dateTableElement).toBeInTheDocument();
  });

  test('makes and receives api data call', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockJSON));
    const { getByTestId } = render(<App />);
    const tableElement = await getByTestId('by-date-table');
    expect(tableElement).toBeInTheDocument();
  });

  test('shows error message when api call fails', async () => {
    fetchMock.mockRejectOnce(new Error('fake error message'));
    const { getByTestId } = render(<App />);
    await waitForElementToBeRemoved(() => getByTestId('by-date-table'));
    const errorElement = await getByTestId('error');
    expect(errorElement).toBeInTheDocument();
  });
});
