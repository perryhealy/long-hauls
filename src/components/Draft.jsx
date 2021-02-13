import React from 'react';
import PropTypes from 'prop-types';

// Components
import { ListGroup } from 'react-bootstrap';

/** Stateless React component that displays a set of predictions. */
const Draft = ({ draft, queens }) => {
  const sortedPredictionList = draft
    .filter((entry) => entry.placement)
    .sort((a, b) => b.placement - a.placement)
    .map((entry) => queens.find((queen) => queen.id === entry.queen_id));

  const listGroupItems = sortedPredictionList.map((queen) => (
    <ListGroup.Item className='prediction-item' key={queen.id}>
      {queen.name}
    </ListGroup.Item>
  ));

  return <ListGroup horizontal>{listGroupItems}</ListGroup>;
};

const queenShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const entryShape = {
  congeniality: PropTypes.bool,
  placement: PropTypes.number,
  queen_id: PropTypes.number.isRequired,
  season_id: PropTypes.number.isRequired,
};

Draft.propTypes = {
  queens: PropTypes.arrayOf(PropTypes.shape(queenShape)),
  draft: PropTypes.arrayOf(PropTypes.shape(entryShape)),
};

export default Draft;
Draft.displayName = 'Draft';
