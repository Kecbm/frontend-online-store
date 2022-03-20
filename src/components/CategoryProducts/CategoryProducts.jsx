import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import Card from '../Card/Card';
import styles from './styles.module.css';

class CategoryProducts extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const { categoryId } = this.props;
    const { results: products } = await getProductsFromCategoryAndQuery(categoryId);
    this.setState({ products });
  }

  render() {
    const { products } = this.state;
    const productsEl = products.map((prod) => (<Card
      id={ prod.id }
      key={ prod.id }
      dataTestId="product"
      cardName={ prod.title }
      cardPrice={ prod.price }
      cardImage={ prod.thumbnail.replace('I.jpg', 'W.webp') }
      { ...this.props }
    />
    ));
    return (
      <div className={ styles.ContainerCards }>
        {productsEl}
      </div>
    );
  }
}

CategoryProducts.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default CategoryProducts;
