import { getWeeksForMonth } from "./calendar.js";
import { getTeamForWeek } from "./rotation.js";
import {
  formatMonthYear,
  addDays,
  formatShortDate,
  formatDateDMY,
} from "./utils.js";
import { renderMonthCalendar } from "./monthCalendar.js";

let currentDate = new Date();
let teams = [];
let startWeek;

const calendarEl = document.getElementById("calendar");
const monthEl = document.getElementById("currentMonth");

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  render();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  render();
});

async function loadConfig() {
  const res = await fetch("data/teams.json");
  const data = await res.json();
  teams = data.teams;
  startWeek = new Date(data.startWeek);
}

function render() {
  calendarEl.innerHTML = "";

  monthEl.textContent = formatMonthYear(currentDate);

  const weeks = getWeeksForMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const monthCalendarEl = document.getElementById("monthCalendar");

  renderMonthCalendar(monthCalendarEl, currentDate, teams, startWeek);

  weeks.forEach((weekDate) => {
    const team = getTeamForWeek(weekDate, teams, startWeek);
    const sunday = addDays(weekDate, 6);

    const div = document.createElement("div");
    div.className = "week";
    div.style.backgroundColor = team.color || "#fff";

    div.innerHTML = `
    <h3>
      ${formatDateDMY(weekDate)} - ${formatDateDMY(sunday)}
    </h3>
    <strong>${team.name}</strong>
    <ul>
      ${team.members.map((m) => `<li>${m}</li>`).join("")}
    </ul>
  `;

    calendarEl.appendChild(div);
  });
}

loadConfig().then(render);
