import axios from 'axios';

const API_URL = 'https://rpdr-party-games.herokuapp.com/api';

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
const getAllUsers = async () => (await axios.get(`${API_URL}/users`)).data;

/**
 * Get all queen info from database.
 *
 * @returns Array of queens: { id: number, name: string }
 */
const getAllQueens = async () => (await axios.get(`${API_URL}/queens`)).data;

/**
 * Get all season info from database.
 *
 * @returns Array of seasons: { id: number, series: string }
 */
const getAllSeasons = async () => (await axios.get(`${API_URL}/seasons`)).data;

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
const getSeasonFromId = async (seasonId) =>
  (await axios.get(`${API_URL}/seasons/${seasonId}`)).data.contestants;

/**
 * Get all predictions for season with given id.
 *
 * @param seasonId
 * @returns Array of queens: {
 *  congeniality: boolean,
 *  placement: number,
 *  queen_id: number,
 *  season_id: number
 * }
 */
const getPredictionsBySeason = async (seasonId) =>
  (await axios.get(`${API_URL}/predictions/season/${seasonId}`)).data;

export default {
  getAllUsers,
  getAllQueens,
  getAllSeasons,
  getSeasonFromId,
  getPredictionsBySeason,
};
