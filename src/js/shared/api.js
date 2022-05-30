import axios from 'axios';

const cachedResults = {};
const cachedPredictions = {};

/**
 * Get all user info from database.
 *
 * @returns Array of users: {
 *  id: number,
 *  name: string,
 *  email: string,
 *  private: boolean
 * }
 */
const getAllUsers = async () =>
  (await axios.get(`${process.env.REACT_APP_API_URL}/users`)).data;

/**
 * Add a user to the database.
 *
 * @param user a user needs the following: {
 *  name: string,
 *  email: string,
 *  private: boolean
 * }
 */
const createUser = async (user) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/users`, user);

/**
 * Get all queen info from database.
 *
 * @returns Array of queens: { id: number, name: string }
 */
const getAllQueens = async () =>
  (await axios.get(`${process.env.REACT_APP_API_URL}/queens`)).data;

/**
 * Get all season info from database.
 *
 * @returns Array of seasons: { id: number, series: string }
 */
const getAllSeasons = async () =>
  (await axios.get(`${process.env.REACT_APP_API_URL}/seasons`)).data;

/**
 * Get info for season with given ID.
 *
 * @param seasonID The id of the desired season
 * @returns Array of queens: {
 *  congeniality: boolean OR null,
 *  placement: number,
 *  queen_id: number,
 *  season_id: number
 * }
 */
const getSeasonFromId = async (seasonId) => {
  if (cachedResults[seasonId]) {
    return cachedResults[seasonId];
  } else {
    cachedResults[seasonId] =
      (await axios.get(`${process.env.REACT_APP_API_URL}/seasons/${seasonId}`))
        .data.contestants || [];
    return cachedResults[seasonId];
  }
};

/**
 * Get all predictions for season with given id.
 *
 * @param seasonId
 * @returns Array of queens: {
 *  congeniality: boolean,
 *  placement: number,
 *  queen_id: number,
 *  season_id: number,
 *  user_id: number
 * }
 */
const getPredictionsBySeason = async (seasonId) => {
  if (cachedPredictions[seasonId]) {
    return cachedPredictions[seasonId];
  } else {
    cachedPredictions[seasonId] =
      (
        await axios.get(
          `${process.env.REACT_APP_API_URL}/predictions/season/${seasonId}`
        )
      ).data.contestants || [];
    return cachedPredictions[seasonId];
  }
};

export default {
  getAllUsers,
  createUser,
  getAllQueens,
  getAllSeasons,
  getSeasonFromId,
  getPredictionsBySeason,
};
