import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

// Styles
import './Main.css';

// Utilities
import { getSeasonName, getScore } from './utils';
import api from './api';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      queens: [],
      seasons: [],
      selectedSeason: {},
      result: [],
      predictions: [],
    };

    this.updatePage = this.updatePage.bind(this);
  }

  /** Use API call to get users, and get result based on season. */
  async componentDidMount() {
    const users = await api.getAllUsers();
    const queens = await api.getAllQueens();
    const seasons = await api.getAllSeasons();
    const selectedSeason = seasons[0];
    const result = await api.getSeasonFromId(selectedSeason.id);
    const predictions = await api.getPredictionsBySeason(selectedSeason.id);

    this.setState({
      users,
      queens,
      seasons,
      selectedSeason,
      result,
      predictions,
    });
  }

  /** Update the draft list and scoreboard for the selected season. */
  async updatePage(event) {
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
  }

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
          <ListGroup className='scoreboard'>
            <h4>Scoreboard</h4>
            {this.state.users.map((user) => (
              <ListGroup.Item key={user.id}>
                {user.name} - {getScore()}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className='line-ups'>
            <div>
              <h4>Results</h4>
              <Draft draft={this.state.result} queens={this.state.queens} />
            </div>
            <div>
              <h4>All Users</h4>
              {this.state.users.map((user) => (
                <UserEntry
                  key={user.id}
                  user={user}
                  draft={this.state.predictions.filter(
                    (draft) => draft.user_id === user.id
                  )}
                  queens={this.state.queens}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function UserEntry(props) {
  return (
    <div>
      <h6>{props.user.name}</h6>
      <Draft draft={props.draft} queens={props.queens} />
    </div>
  );
}

function Draft(props) {
  const sortedPredictionList = props.draft
    .filter((entry) => entry.placement !== null)
    .sort((a, b) => b.placement - a.placement)
    .map((prediction) =>
      props.queens.find((queen) => queen.id === prediction.queen_id)
    );

  return (
    <ListGroup horizontal>
      {sortedPredictionList.map((queen) => {
        return (
          <ListGroup.Item className='prediction-item' key={queen.id}>
            {queen.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default Main;
