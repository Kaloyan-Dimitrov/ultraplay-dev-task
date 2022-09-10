import { League, Match, Bet } from '../App';

/**
 * Converts the bet data from an array of bets,
 * into an object with a property name for who the bet is
 * and a value of its odds
 * @param bet the raw bet data to parse
 * @returns {Bet} the resulting object
 */
const parseBet = (bet: any): Bet => {
  return bet.reduce((res: any, curr: any) => {
    res[curr.$.Name] = curr.$.Value;
    return res;
  }, {});
};

/**
 * Parses the data, returned from the API, removing the unnecessary properties
 * and returns an array of all the leagues, containing the matches
 * @param dt the raw JSON data to parse
 * @returns {League[]} the resulting array of leagues
 */
export const parseData = (dt: any): League[] => {
  const dataMatches = dt.XmlSports.Sport['0'].Event;
  return dataMatches.map((league: any): League => {
    const gameName = league.$.Name.split(', ')[0];
    const leagueName = league.$.Name.split(', ')[1];
    return {
      game: gameName,
      name: leagueName,
      matches: league.Match.map((match: any): Match => {
        return {
          id: match.$.ID,
          date: new Date(match.$.StartDate),
          name: match.$.Name,
          bet: parseBet(match.Bet[0].Odd),
          game: gameName,
          league: leagueName
        };
      })
    };
  });
};

/**
 * Returns all the matches from each game in a single array
 * @param {League[]} leagues
 * @returns {Match[]} the resulting array of matches
 */
export const allMatches = (leagues: League[]): Match[] => {
  return leagues
    .map((league: League) => league.matches)
    .flat()
    .sort((a: Match, b: Match) => a.date.getTime() - b.date.getTime());
};

/**
 * Returns all the leagues from a specific game
 * @param {League[]} leagues
 * @param {string} game
 * @returns {Match[]} the resulting array of leagues
 */
export const getLeaguesByGame = (leagues: League[], game: string): League[] => {
  return leagues.filter((l: League) => l.game === game);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString(navigator.language, {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};
