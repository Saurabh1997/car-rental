const seasons = {
  peak: { start: "06-01", end: "09-15" },
  mid1: { start: "03-01", end: "06-01" },
  mid2: { start: "09-15", end: "10-31" },
};

function getSeasonForDate(date) {
  const mmdd = date.toISOString().slice(5, 10);
  if (mmdd >= seasons.peak.start && mmdd <= seasons.peak.end) return "peak";
  if (
    (mmdd >= seasons.mid1.start && mmdd < seasons.peak.start) ||
    (mmdd >= seasons.mid2.start && mmdd <= seasons.mid2.end)
  )
    return "mid";
  return "off";
}

function getAllDatesInRange(start, end) {
  const dates = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

module.exports = {
  getSeasonForDate,
  getAllDatesInRange,
};
