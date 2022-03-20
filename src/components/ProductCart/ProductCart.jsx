import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ButtonPlusMinus from '../ButtonPlusMinus/ButtonPlusMinus';
import styles from './styles.module.css';

export default class ProductCart extends Component {
  getLocalStorageCart = () => {
    const { id } = this.props;
    const LsCartProductList = JSON.parse(localStorage.getItem('CartProductList'));
    const itemInCart = LsCartProductList.find((item) => item.id === id);
    return itemInCart.quantity;
  };

  render() {
    const {
      id,
      title,
      imageUrl,
      price,
      moreOneQuantity,
      availableQuantity,
      updateCartItem,
    } = this.props;
    const isDisabledAddOne = moreOneQuantity >= availableQuantity;

    return (
      <div className={ styles.CartItemContainer }>
        <button
          onClick={ () => updateCartItem('remove', id) }
          type="button"
          id={ id }
          name="remove"
        >
          remover
        </button>
        <img src={ imageUrl } className={ styles.TagImg } alt={ title } />
        <div
          data-testid="shopping-cart-product-name"
          style={ {
            display: '-webkit-box',
            overflow: 'hidden',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
          } }
        >
          <abbr
            title={ title }
          >
            {title}

          </abbr>
        </div>
        <ButtonPlusMinus
          operator="minus"
          onClick={ () => updateCartItem('less', id) }
          dataTestId="product-decrease-quantity"
        />
        <span
          data-testid="shopping-cart-product-quantity"
        >
          {moreOneQuantity}
        </span>
        <ButtonPlusMinus
          operator="add"
          onClick={ () => updateCartItem('add', id) }
          className={ `${isDisabledAddOne ? 'disabled' : null}` }
          isDisabled={ isDisabledAddOne }
          dataTestId="product-increase-quantity"
        />
        <span className={ styles.Price }>
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    );
  }
}

ProductCart.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  moreOneQuantity: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  updateCartItem: PropTypes.func.isRequired,
};
