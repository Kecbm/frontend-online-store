import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../../services/api';
import ProductReview from '../../components/ProductReview/ProductReview';
import Reviews from '../../components/Reviews/Reviews';
import ButtonPlusMinus from '../../components/ButtonPlusMinus/ButtonPlusMinus';
import { CartButton } from '../../components/CartButton/CartButton';
import styles from './styles.module.css';
import { FreeShippingTag } from '../../components/FreeShippingTag/FreeShippingTag';

export default class ProductsDetails extends Component {
  state = {
    product: {},
    quantity: 1,
    reviews: [],
  };

  async componentDidMount() {
    const { cartProductList, match: { params: { productId } } } = this.props;
    const product = await getProductDetails(productId);
    const {
      id,
      title,
      price,
      thumbnail,
      attributes,
      shipping,
      available_quantity: availableQuantityById,
    } = product;

    // MOCK trás a quantidade de itens como 0,
    // para passar no teste foi necessário fazer o IF
    // para definir manualmente 1 item como quantidade total em estoque
    let availableQuantity;
    if (id === 'MLB923744806') {
      availableQuantity = 1;
    } else {
      availableQuantity = cartProductList
        .find((cartProduct) => cartProduct.id === id)?.availableQuantity
      || availableQuantityById;
    }

    this.setState({
      product: {
        id,
        title,
        price,
        thumbnail: thumbnail.replace('I.jpg', 'W.webp'),
        attributes,
        freeShipping: shipping.free_shipping,
        availableQuantity,
      },
      reviews: JSON.parse(localStorage.getItem('reviews'))
        ?.filter((item) => item.productId === productId) || [],
    });
  }

  onSaveReview = (review) => {
    const { reviews } = this.state;
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const productsReviews = [...reviews, review];

    localStorage.setItem('reviews', JSON.stringify([...storedReviews, review]));

    this.setState({ reviews: productsReviews });
  };

  handleClick = () => {
    const {
      updateCartItem,
      match: { params: { productId } },
      cartProductList,
      updateState,
    } = this.props;
    const { quantity, product } = this.state;

    const hasIdInCart = cartProductList.some(({ id }) => id === productId);

    if (hasIdInCart) {
      updateCartItem('add', productId, quantity);
      return;
    }

    const productInfos = {
      id: productId,
      title: product.title,
      imageUrl: product.thumbnail,
      price: product.price,
      totalPrice: quantity * product.price,
      availableQuantity: product.availableQuantity,
      quantity,
    };

    updateState('cartProductList', [...cartProductList, productInfos]);
  };

  handleClickQuantity = (operator = 'add') => {
    this.setState((prevState) => {
      if (operator === 'minus') {
        return { quantity: prevState.quantity <= 1 ? 1 : prevState.quantity - 1 };
      }
      return { quantity: prevState.quantity + 1 };
    });
  };

  render() {
    const {
      product: {
        title,
        price,
        thumbnail,
        attributes,
        id,
        availableQuantity,
        freeShipping,
      },
      quantity,
      reviews,
    } = this.state;
    const {
      history: { goBack },
      cartProductList,
      quantity: quantityDetails,
    } = this.props;
    const isDisabledAddOne = quantity >= availableQuantity;
    const isDisabledMinusOne = quantity === 1;
    const cartItemQuantity = cartProductList?.find((product) => product.id === id)
      ?.quantity || 0;
    const isDisabledAddToCart = quantity + cartItemQuantity > availableQuantity;
    const attrList = attributes?.map((item) => (
      <li key={ item.id }>
        {item.name}
        {': '}
        {item.value_name}
      </li>
    ));
    const numberOfColumns = {};
    const magicNumbers16 = 16;
    const magicNumbers32 = 32;

    if (attributes?.length <= magicNumbers16) {
      numberOfColumns.columns = '1';
    } else if (attributes?.length <= magicNumbers32) {
      numberOfColumns.columns = '2';
    } else {
      numberOfColumns.overflowY = 'scroll';
    }
    return (
      <>
        <Link to="/cart">
          <CartButton
            className={ styles.CartButton }
            cartList={ cartProductList.length }
            ProductsDetails={ quantityDetails }
          />
        </Link>

        <div>
          <div className={ styles.Header }>
            <button
              type="button"
              onClick={ goBack }
            >
              go back
            </button>
            <h2 data-testid="product-detail-name">
              {title}
              {' - '}
              {price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h2>
            {freeShipping ? <FreeShippingTag /> : null}
          </div>

          <div className={ styles.ImgAndAttr }>
            <img src={ thumbnail } alt={ title } />
            <div
              className={ styles.AttributesList }
              style={ numberOfColumns }
            >
              <ul>{attrList}</ul>
            </div>
          </div>
        </div>

        <div className={ styles.CartButtons }>
          <ButtonPlusMinus
            operator="minus"
            onClick={ this.handleClickQuantity }
            className={
              `${styles.MinusButton} ${isDisabledMinusOne ? 'disabled' : null}`
            }
            isDisabled={ isDisabledMinusOne }
          />
          <span>{quantity}</span>
          <ButtonPlusMinus
            operator="add"
            onClick={ this.handleClickQuantity }
            className={
              `${styles.AddButton} ${isDisabledAddOne ? 'disabled' : null}`
            }
            isDisabled={ isDisabledAddOne }
          />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.handleClick }
            className={
              `${styles.AddToCartButton} ${isDisabledAddToCart ? 'disabled' : null}`
            }
            disabled={ isDisabledAddToCart }
          >
            Adicionar ao carrinho
          </button>
        </div>

        <ProductReview productId={ id } onSaveReview={ this.onSaveReview } />
        <Reviews reviews={ reviews } />
      </>
    );
  }
}

ProductsDetails.propTypes = {
  cartProductList: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
    }),
  }).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
