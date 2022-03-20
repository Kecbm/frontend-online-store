import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating/Rating';

export default class Reviews extends Component {
  render() {
    const { reviews } = this.props;

    return (
      reviews.map((item, index) => (
        <div key={ index }>
          <p>
            {item.email}
          </p>

          <Rating rating={ item.rating } />

          <p>{item.comment}</p>
        </div>
      ))
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    comment: PropTypes.string,
    rating: PropTypes.number,
  })).isRequired,
};
