import { getMonday } from "./utils.js";

export function getWeeksForMonth(year, month) {
  const weeks = [];

  const firstDay = new Date(year, month, 1);
  let current = getMonday(firstDay);

  const lastDay = new Date(year, month + 1, 0);

  while (current <= lastDay) {
    weeks.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }

  return weeks;
}