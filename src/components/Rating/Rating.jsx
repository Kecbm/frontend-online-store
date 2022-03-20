import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default class Rating extends Component {
  constructor(props) {
    super(props);

    const { rating } = this.props;

    this.state = {
      rating,
      hover: 0,
    };
  }

  handleMouseEnter = (index) => {
    const { onChange } = this.props;

    if (onChange) {
      this.setState({ hover: index + 1 });
    }
  }

  handleMouseLeave = (rating) => {
    const { onChange } = this.props;

    if (onChange) {
      this.setState({ hover: rating });
    }
  }

  handleClick = (index) => {
    const { onChange } = this.props;

    if (onChange) {
      const rating = index + 1;

      this.setState({ rating });
      onChange(rating);
    }
  }

  render() {
    const { rating, hover } = this.state;
    const amountOfStars = 5;

    return (
      <div>
        {[...Array(amountOfStars)].map((star, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index + 1}-rating` }
            className={
              `${styles.StarButton} ${index + 1 <= (hover || rating)
                ? styles.on
                : styles.off}
              `
            }
            onClick={ () => this.handleClick(index) }
            onMouseEnter={ () => this.handleMouseEnter(index) }
            onMouseLeave={ () => this.handleMouseLeave(rating) }
          >
            &#9733;
          </button>
        ))}
      </div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Rating.defaultProps = {
  onChange: () => '',
};

// Source: https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
// (componente funcional refatorado para class component).
