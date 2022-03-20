import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';
import styles from './styles.module.css';
import Categories from '../../components/Categories/Categories';
// import CategoryProducts from '../../components/CategoryProducts/CategoryProducts';
import { CartButton } from '../../components/CartButton/CartButton';

export default class Home extends Component {
  state = {
    categories: [],
    hasSearched: false,
  }

  async componentDidMount() {
    const list = await getCategories();

    this.setState({ categories: list });
  }

  handleClick = async () => {
    const { inputSearch, updateState } = this.props;
    const { results } = await getProductsFromCategoryAndQuery(null, inputSearch) || [];
    updateState('productList', results);
    this.setState(() => ({ hasSearched: true }));
  }

  handleCategoryClick = async ({ target }) => {
    const { updateState } = this.props;

    const categoryId = target.id;
    const { results: products } = await getProductsFromCategoryAndQuery(categoryId);
    updateState('productList', products);
  }

  render() {
    const { inputSearch, productList, updateState } = this.props;
    const { hasSearched, categories } = this.state;
    return (
      <>
        <div className={ styles.Header }>
          <div className={ styles.SearchDiv }>
            <Input
              name="inputSearch"
              dataTestId="query-input"
              value={ inputSearch }
              className={ styles.SearchInput }
              { ...this.props }
            />
            <button
              type="submit"
              data-testid="query-button"
              onClick={ this.handleClick }
            >
              <span
                role="img"
                aria-label="search-butto"
              >
                🔎
              </span>
            </button>
          </div>

          <CartButton
            className={ styles.CartButton }
            { ...this.props }
          />

        </div>
        {!hasSearched && (
          <p
            className={ styles.TagP }
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}

        <div className={ styles.MenuAndCards }>
          <Categories
            categories={ categories }
            onInputClick={ this.handleCategoryClick }
          />
          <main className={ styles.ContainerCards }>
            {productList?.length > 0
              && (
                productList.map(({
                  id,
                  price,
                  title,
                  thumbnail,
                  shipping,
                  available_quantity: availableQuantity,
                }) => (
                  <Card
                    key={ id }
                    dataTestId="product"
                    cardName={ title }
                    cardPrice={ price }
                    cardImage={ thumbnail.replace('I.jpg', 'W.webp') }
                    id={ id }
                    freeShipping={ shipping.free_shipping }
                    updateState={ updateState }
                    availableQuantity={ availableQuantity }
                    { ...this.props }
                  />
                )))}
            {hasSearched && productList
            && productList.length === 0 ? <p>Nenhum produto foi encontrado</p> : null }
          </main>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
