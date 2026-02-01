export function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (domingo) - 6
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatMonthYear(date) {
  return date.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatShortDate(date) {
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function formatDateDMY(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
