import React from 'react';
import PropTypes from 'prop-types';
import sprite from '../../assets/icons/sprite.svg';

const Icon = ({ iconName, classes }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={ classes }
  >
    <use xlinkHref={ `${sprite}#icon-${iconName}` } />
  </svg>
);

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Icon;
