// create tests for MatchesData.ts

import { parseData } from './MatchesData';
import mockJSON from '../mockMatches.json';

describe('MatchesData utils working correctly', () => {
  it('should parse the JSON data and returns and array of leagues', () => {
    const leagues = parseData(mockJSON);
    expect(leagues[0]).toHaveProperty('matches');
    expect(leagues[0]).toHaveProperty('game');
    expect(leagues[0]).toHaveProperty('name');
    expect(leagues[0].matches).toBeInstanceOf(Array);
  });
});

export {};
