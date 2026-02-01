import { getMonday } from "./utils.js";
import { getTeamForWeek } from "./rotation.js";

export function renderMonthCalendar(container, date, teams, startWeek) {
  container.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekday = (firstDay.getDay() + 6) % 7; // lunes = 0

  const grid = document.createElement("div");
  grid.className = "month-grid";

  const dayNames = ["Equipo", "L", "M", "X", "J", "V", "S", "D"];
  dayNames.forEach((d) => {
    const el = document.createElement("div");
    el.className = "day-name";
    el.textContent = d;
    grid.appendChild(el);
  });

  // hueco inicial para la columna "Equipo" de la primera semana
  grid.appendChild(document.createElement("div"));

  // huecos antes del día 1 (L–D)
  for (let i = 0; i < startWeekday; i++) {
    grid.appendChild(document.createElement("div"));
  }
  /*
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const current = new Date(year, month, day);
    const monday = getMonday(current);
    const team = getTeamForWeek(monday, teams, startWeek);

    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;
    cell.style.backgroundColor = team.color || "#eee";

    const today = new Date();
    if (current.toDateString() === today.toDateString()) {
      cell.classList.add("today");
    }

    grid.appendChild(cell);
  }
  */

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const current = new Date(year, month, day);
    const weekday = (current.getDay() + 6) % 7; // lunes = 0

    // Si es lunes, pintamos antes la celda del equipo
    if (weekday === 0) {
      const monday = getMonday(current);
      const team = getTeamForWeek(monday, teams, startWeek);

      const teamCell = document.createElement("div");
      teamCell.className = "day team-cell";
      teamCell.innerHTML = `
        <span class="team-name">${team.name}</span>
        <div class="team-tooltip">
        ${team.members.join("<br>")}
        </div>
        `;
      teamCell.style.backgroundColor = team.color || "#eee";

      grid.appendChild(teamCell);
    }

    const monday = getMonday(current);
    const team = getTeamForWeek(monday, teams, startWeek);

    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;
    cell.style.backgroundColor = team.color || "#eee";

    const today = new Date();
    if (current.toDateString() === today.toDateString()) {
      cell.classList.add("today");
    }

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
