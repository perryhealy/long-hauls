import React from 'react';
import PropTypes from 'prop-types';
import { seasonShape } from '../js/shared/dataShapes';
import { getSeasonName } from '../js/shared/utils';

const SeasonSelector = ({seasons, setSeason}) => {
  const onChange = (event) => {
    event.preventDefault();

    const selectedIndex = event.target.options.selectedIndex;
    const seasonKey = event.target.options[selectedIndex]
      .getAttribute('seasonkey')
      .split(':');
    const selectedSeason = seasons.find(
      (season) =>
        season.series === seasonKey[0] && season.num === parseInt(seasonKey[1])
    );

    setSeason(selectedSeason);
  };

  return (
    <div align='center'>
      <select onChange={onChange}>
        {seasons.map((season) => (
          <option
            key={season.series + ':' + season.num}
            seasonkey={season.series + ':' + season.num}
          >
            {getSeasonName(season.series)} Season {season.num}
          </option>
        ))}
      </select>
    </div>
  )
}

SeasonSelector.propTypes = {
  seasons: PropTypes.arrayOf(PropTypes.shape(seasonShape)).isRequired,
  setSeason: PropTypes.func.isRequired,
};

export default SeasonSelector;