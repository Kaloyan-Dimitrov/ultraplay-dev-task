import { Game, Match, Bet } from '../components/MatchesTable';

const parseBet = (bet: any): Bet => {
  return bet.reduce((res: any, curr: any) => {
    res[curr.$.Name] = curr.$.Value;
    return res;
  }, {});
};

export const parseData = (dt: any): any => {
  const dataMatches = dt.XmlSports.Sport['0'].Event;
  return dataMatches.map((game: any): Game => {
    const gameName = game.$.Name.split(', ')[0];
    const leagueName = game.$.Name.split(', ')[1];
    return {
      game: gameName,
      league: leagueName,
      matches: game.Match.map((match: any): Match => {
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

export const allMatches = (games: Game[]): Match[] => {
  return games
    .map((game: Game) => game.matches)
    .flat()
    .sort((a: Match, b: Match) => a.date.getTime() - b.date.getTime());
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};
