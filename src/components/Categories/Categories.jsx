import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default class Categories extends Component {
  render() {
    const {
      categories,
      onInputClick,
    } = this.props;

    return (
      <nav className={ styles.CategoryContainer }>
        <h1>Categorias:</h1>
        {categories
          ?.map((item) => (
            <label key={ item.id } data-testid="category" htmlFor={ item.id }>
              <input
                type="radio"
                id={ item.id }
                onClick={ onInputClick }
                name="category"
                value={ item.id }
              />
              <span className={ styles.CategoryTitle }>
                { item.name }
              </span>
            </label>
          ))}
      </nav>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onInputClick: PropTypes.func,
};

Categories.defaultProps = {
  onInputClick: () => '',
};
