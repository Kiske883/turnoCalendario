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
let events = [];
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

/*
async function loadConfig() {
  const res = await fetch("data/teams.json");
  const data = await res.json();
  teams = data.teams;
  startWeek = new Date(data.startWeek);
}
*/

async function loadConfig() {
  const resTeams = await fetch("data/teams.json");
  const dataTeams = await resTeams.json();

  teams = dataTeams.teams;
  startWeek = new Date(dataTeams.startWeek);

  const resEvents = await fetch("data/events.json");
  const dataEvents = await resEvents.json();

  events = dataEvents.events;
}

function getEventsForDate(date) {
  const iso = date.toISOString().split("T")[0];
  return events.filter((e) => e.date === iso);
}

function render() {
  calendarEl.innerHTML = "";

  monthEl.textContent = formatMonthYear(currentDate);

  const weeks = getWeeksForMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const monthCalendarEl = document.getElementById("monthCalendar");

  renderMonthCalendar(monthCalendarEl, currentDate, teams, startWeek, events);

  weeks.forEach((weekDate) => {
    const team = getTeamForWeek(weekDate, teams, startWeek);
    // const sunday = addDays(weekDate, 6);

    const saturday = addDays(weekDate, 5);
    const sunday = addDays(weekDate, 6);

    const saturdayEvents = getEventsForDate(saturday);
    const sundayEvents = getEventsForDate(sunday);

    const div = document.createElement("div");
    div.className = "week";
    div.style.backgroundColor = team.color || "#fff";

    /*
    div.innerHTML = `
    <h3>
      ${formatDateDMY(weekDate)} - ${formatDateDMY(sunday)}
    </h3>
    <strong>${team.name}</strong>
    <ul>
      ${team.members.map((m) => `<li>${m}</li>`).join("")}
    </ul>
  `;
    */

    div.innerHTML = `
                      <h3>
                        ${formatDateDMY(weekDate)} - ${formatDateDMY(sunday)}
                      </h3>

                      <strong>${team.name}</strong>

                      <ul>
                        ${team.members.map((m) => `<li>${m}</li>`).join("")}
                      </ul>

                      ${
                        saturdayEvents.length || sundayEvents.length
                          ? `<div class="events">
                              ${saturdayEvents.map((e) => `<p>Sabado: ${e.title}</p>`).join("")}
                              ${sundayEvents.map((e) => `<p>Domingo: ${e.title}</p>`).join("")}
                            </div>`
                          : ""
                      }
      `;

    calendarEl.appendChild(div);
  });
}

loadConfig().then(render);
