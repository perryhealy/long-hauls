import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import ListGroup from 'react-bootstrap/ListGroup';
import Draft from '../components/Draft';

// Styles
import '../style/Main.css';

// Utilities
import api from './shared/api';
import { getSeasonName, getUserPredictions, getScore } from './shared/utils';
import { userShape } from './shared/dataShapes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queens: [],
      seasons: [],
      selectedSeason: {},
      result: [],
      predictions: [],
    };
  }

  /** Use API calls to get data, and get result based on season. */
  async componentDidMount() {
    const queens = await api.getAllQueens();
    const seasons = await api.getAllSeasons();
    const selectedSeason = seasons[0];
    const result = await api.getSeasonFromId(selectedSeason.id);
    const predictions = await api.getPredictionsBySeason(selectedSeason.id);

    this.setState({
      queens,
      seasons,
      selectedSeason,
      result,
      predictions,
    });
  }

  /** Update the draft list and scoreboard for the selected season. */
  updatePage = async (event) => {
    event.preventDefault();

    const selectedIndex = event.target.options.selectedIndex;
    const seasonKey = event.target.options[selectedIndex]
      .getAttribute('seasonkey')
      .split(':');
    const selectedSeason = this.state.seasons.find(
      (season) =>
        season.series === seasonKey[0] && season.num === parseInt(seasonKey[1])
    );

    const result = await api.getSeasonFromId(selectedSeason.id);
    const predictions = await api.getPredictionsBySeason(selectedSeason.id);

    this.setState({ selectedSeason, result, predictions });
  };

  /**
   * Renders the the Scoreboard for the users.
   *
   * @returns ListGroup of Users and their scores
   */
  renderScoreboard = () => {
    const userScores = this.props.users
      .map((user) => {
        const userPredictions = getUserPredictions(
          user,
          this.state.predictions
        );

        return {
          user,
          score: getScore(this.state.result, userPredictions),
        };
      })
      .sort((a, b) => b.score - a.score);

    const listItems = userScores.map(({ user, score }) => (
      <ListGroup.Item key={user.id}>
        {user.name} <br /> {score}
      </ListGroup.Item>
    ));

    return (
      <ListGroup className='scoreboard'>
        <h4>Scoreboard</h4>
        {listItems}
      </ListGroup>
    );
  };

  /**
   * Renders the the Drafts for each user sorted by score.
   *
   * @returns Array of UserEntry
   */
  renderUserDrafts = () => {
    const drafts = this.props.users.map((user) => {
      const draft = getUserPredictions(user, this.state.predictions);
      return { user, draft };
    });

    return (
      drafts
        // Rank drafts by Score
        .sort(
          (a, b) =>
            getScore(this.state.result, b.draft) -
            getScore(this.state.result, a.draft)
        )
        .map(({ user, draft }) => (
          <UserEntry
            key={user.id}
            user={user}
            draft={draft}
            queens={this.state.queens}
          />
        ))
    );
  };

  render() {
    return (
      <div>
        <div align='center'>
          <select onChange={this.updatePage}>
            {this.state.seasons.map((season) => (
              <option
                key={season.series + ':' + season.num}
                seasonkey={season.series + ':' + season.num}
              >
                {getSeasonName(season.series)} Season {season.num}
              </option>
            ))}
          </select>
        </div>
        <div>
          {this.renderScoreboard()}
          <div className='line-ups'>
            <div>
              <h4>Results</h4>
              <Draft draft={this.state.result} queens={this.state.queens} />
            </div>
            <div>
              <h4>All Users</h4>
              {this.renderUserDrafts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  user: PropTypes.shape(userShape),
  users: PropTypes.arrayOf(PropTypes.shape(userShape)),
};

function UserEntry(props) {
  return (
    <div>
      <h6>{props.user.name}</h6>
      <Draft draft={props.draft} queens={props.queens} />
    </div>
  );
}

export default Main;
Main.displayName = 'Main';
