export const userShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  private: PropTypes.bool.isRequired,
};

export const teamShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export const teamMemberShape = {
  user_id: PropTypes.number.isRequired,
  team_id: PropTypes.number.isRequired,
};

export const queenShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export const seasonShape = {
  id: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  series: PropTypes.string.isRequired,
};

export const contestantShape = {
  congeniality: PropTypes.bool,
  placement: PropTypes.number,
  queen_id: PropTypes.number.isRequired,
  season_id: PropTypes.number.isRequired,
};

export const predictionShape = {
  congeniality: PropTypes.bool,
  placement: PropTypes.number,
  queen_id: PropTypes.number.isRequired,
  season_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
};
