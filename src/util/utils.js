const SeasonNaming = {
  AU: 'Drag Race Down Under',
  US: "RuPaul's Drag Race",
  UK: "RuPaul's Drag Race UK",
  CA: "Canada's Drag Race",
  AS: 'All Stars',
};

export const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newAuthRes:', newAuthRes);
    // saveUserToken(newAuthRes.access_token); <-- save new token
    console.log('new auth token', newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};

export function getSeasonName(series) {
  const abbrev = series.split('_');
  return abbrev.reduce((result, val) => result + ' ' + SeasonNaming[val], '');
}

/**
 * Filters all predictions for those made by a given user.
 *
 * @param user User to get predictions for
 * @param predictions Array of all predicted results
 */
export function getUserPredictions(user, predictions) {
  return predictions.filter((prediction) => prediction.user_id === user.id);
}

/**
 * Given actual and predicted results, returns score.
 *
 * Each array element is assumed to have at least the following properties:
 *  queen: { queen_id: number, placement: number }
 *
 * @param results Array of actual results
 * @param predictions Array of predicted results
 * @returns Number score
 */
export function getScore(results, predictions) {
  if (!results || !predictions) {
    return -1;
  }

  const pointsPerEpisodeByQueen = predictions.reduce((acc, queen) => {
    const pointsPerEpisode = predictions.length - queen.placement + 1;
    return { ...acc, [queen.queen_id]: pointsPerEpisode };
  }, {});

  const resultsSoFar = results
    .filter((queen) => queen.placement)
    .reduce(
      (acc, queen) => ({ ...acc, [queen.queen_id]: queen.placement }),
      {}
    );

  const numEliminated = Object.keys(resultsSoFar).length;

  return Object.keys(pointsPerEpisodeByQueen).reduce((acc, queenId) => {
    if (resultsSoFar[queenId]) {
      const episodes = predictions.length - resultsSoFar[queenId] + 1;
      const points = episodes * pointsPerEpisodeByQueen[queenId];
      return acc + points;
    }

    return acc + numEliminated * pointsPerEpisodeByQueen[queenId];
  }, 0);
}
