import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class CartButton extends Component {
  render() {
    const { className, quantity, ProductsDetails } = this.props;

    return (
      <div className={ className }>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <span
            role="img"
            aria-label="shopping-cart"
          >
            🛒
          </span>
          <span
            data-testid="shopping-cart-size"
          >
            { ProductsDetails || quantity }
          </span>
        </Link>
      </div>
    );
  }
}

export default CartButton;

CartButton.propTypes = {
  className: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  ProductsDetails: PropTypes.number.isRequired,
};
