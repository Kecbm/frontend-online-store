import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import styles from './styles.module.css';
import { FreeShippingTag } from '../FreeShippingTag/FreeShippingTag';

export default class Card extends Component {
  handleAddToCartClick = () => {
    const {
      updateState,
      id,
      cardName,
      cardImage,
      cardPrice,
      cartProductList,
      updateCartItem,
      availableQuantity,
    } = this.props;
    const productInfos = {
      id,
      title: cardName,
      imageUrl: cardImage,
      price: cardPrice,
      totalPrice: cardPrice,
      quantity: 1,
      availableQuantity,

    };
    const hasIdInCart = cartProductList.some((product) => product.id === id);

    if (hasIdInCart) {
      updateCartItem('add', id);
      return;
    }

    updateState('cartProductList', [...cartProductList, productInfos]);
  };

  render() {
    const {
      cardName,
      cardPrice,
      cardImage,
      dataTestId,
      id,
      freeShipping,
    } = this.props;

    return (
      <div data-testid={ dataTestId } className={ styles.CardContainer }>
        <div className={ styles.CardTitleContainer }>
          <Link
            to={ { pathname: `/productDetails/${id}` } }
            data-testid="product-detail-link"
          >
            <span
              className={ styles.CardTitle }
              style={ {
                display: '-webkit-box',
                overflow: 'hidden',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
              } }
            >
              {cardName}
            </span>
          </Link>
        </div>
        <img src={ cardImage } alt={ cardName } className={ styles.CardImg } />
        {freeShipping ? (
          <FreeShippingTag className={ styles.FreeShippingTag } />
        ) : null}
        <button
          className={ styles.Button }
          type="submit"
          data-testid="product-add-to-cart"
          onClick={ this.handleAddToCartClick }
        >
          <span role="img" aria-label="add-cart">
            {' '}
            Adicionar ao Carrinho 🛒
          </span>
        </button>
        <p className={ styles.Price }>
          {cardPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    );
  }
}

Card.defaultProps = {
  updateState: () => {},
  updateCartItem: () => {},
  cartProductList: [],
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardPrice: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  updateState: PropTypes.func,
  updateCartItem: PropTypes.func,
  cartProductList: PropTypes.arrayOf(PropTypes.object),
  freeShipping: PropTypes.bool.isRequired,
};
