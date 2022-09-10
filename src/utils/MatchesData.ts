import { League, Match, Bet } from '../App';

const parseBet = (bet: any): Bet => {
  return bet.reduce((res: any, curr: any) => {
    res[curr.$.Name] = curr.$.Value;
    return res;
  }, {});
};

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

export const allMatches = (leagues: League[]): Match[] => {
  return leagues
    .map((league: League) => league.matches)
    .flat()
    .sort((a: Match, b: Match) => a.date.getTime() - b.date.getTime());
};

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
