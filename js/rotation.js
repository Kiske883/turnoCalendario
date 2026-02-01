export function getTeamForWeek(weekDate, teams, startDate) {
  const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
  const diffWeeks = Math.floor(
    (weekDate - startDate) / MS_WEEK
  );

  const index =
    ((diffWeeks % teams.length) + teams.length) % teams.length;

  return teams[index];
}