import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';

export default class ProductReview extends Component {
  state = {
    email: '',
    comment: '',
    rating: 0,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSaveReview = () => {
    const { onSaveReview, productId } = this.props;
    const { email, comment, rating } = this.state;
    const review = {
      productId,
      email,
      comment,
      rating,
    };

    onSaveReview(review);

    this.setState({
      email: '',
      comment: '',
      rating: 0,
    });
  }

  handleRating = (rating) => {
    this.setState({ rating });
  }

  render() {
    const { email, comment, rating } = this.state;

    return (
      <form>
        <h2>Avaliações</h2>

        <Input
          name="email"
          dataTestId="product-detail-email"
          value={ email }
          className={ styles.Input }
          placeholder="Email"
          onChange={ this.handleChange }
        />

        <Rating rating={ rating } onChange={ this.handleRating } />

        <textarea
          name="comment"
          data-testid="product-detail-evaluation"
          value={ comment }
          className={ styles.Input }
          placeholder="Mensagem (opcional)"
          onChange={ this.handleChange }
        />

        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ this.handleSaveReview }
        >
          Avaliar

        </button>
      </form>
    );
  }
}

ProductReview.propTypes = {
  onSaveReview: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};
