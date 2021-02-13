const SeasonNaming = {
  US: "RuPaul's Drag Race",
  UK: "RuPaul's Drag Race UK",
  CA: "Canada's Drag Race",
  AS: "All Stars"
};

export function getSeasonName(series) {
  const abbrev = series.split("_");
  return abbrev.reduce((result, val) => result + " " + SeasonNaming[val], "");
}

// TODO: Implement this
export function getScore(results, predictions) {
  return 16;
}