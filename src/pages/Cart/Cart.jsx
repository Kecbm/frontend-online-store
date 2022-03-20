import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCart from '../../components/ProductCart/ProductCart';
import styles from './styles.module.css';
import { CartButton } from '../../components/CartButton/CartButton';

export default class Cart extends Component {
  handleGoToCheckout = () => {
    const { history: { push } } = this.props;
    push('/checkout');
  }

  render() {
    const { cartProductList, history: { goBack } } = this.props;

    return (
      <div className={ styles.CartContainer }>
        <button type="button" onClick={ goBack }>go back</button>
        <CartButton
          className={ styles.CartButton }
          cartList={ cartProductList.length }
        />
        <h2>Carrinho de Compras</h2>

        <section className={ styles.CartItemsContainer }>
          {cartProductList.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> : (
              cartProductList.map((product) => (
                <ProductCart
                  key={ product.id }
                  id={ product.id }
                  imageUrl={ product.imageUrl }
                  title={ product.title }
                  moreOneQuantity={ product.quantity }
                  price={ product.totalPrice }
                  availableQuantity={ product.availableQuantity }
                  { ...this.props }
                />
              ))
            )}
        </section>

        <h2>
          Valor Total da Compra:
          {' '}
          {cartProductList.reduce((acc, item) => acc + item.totalPrice, 0)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h2>
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.handleGoToCheckout }
        >
          Finalizar Compra
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  cartProductList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func,
  }).isRequired,
};
