import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadingSecondary from '../HeadindSecondary/HeadingSecondary';
import styles from './styles.module.css';

class CheckoutProduts extends Component {
  calculateTotal = (products) => {
    let total = 0;
    if (products && products.length > 0) {
      total = products
        .map(({ price, quantity }) => price * quantity)
        .reduce((prev, curr) => prev + curr);
    }
    return total;
  }

  render() {
    const { products } = this.props;
    const total = this.calculateTotal(products);
    let produtsList;
    if (products?.length) {
      produtsList = products.map((prod) => (
        <li key={ prod.id } className={ styles.ProductItem }>
          <img
            src={ prod.imageUrl }
            alt={ `Produto ${prod.title}` }
            className={ styles.ProductImg }
          />
          <p className={ styles.ProductDescription }>{ prod.title }</p>
          <h5 className={ styles.ProductPrice }>
            R$
            {' '}
            {(prod.price * prod.quantity).toFixed(2)}
          </h5>
        </li>
      ));
    } else {
      produtsList = <h1>No products</h1>;
    }

    return (
      <section className={ styles.ProductContainer }>
        <HeadingSecondary title="Revise seus produtos" />
        <ul>
          { produtsList }
        </ul>
        <h5 className={ styles.Total }>
          Total
          {' '}
          <span>{ `R$${total.toFixed(2)}` }</span>
        </h5>
      </section>
    );
  }
}

CheckoutProduts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CheckoutProduts;
