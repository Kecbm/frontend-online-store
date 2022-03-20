import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import ProductsDetails from './pages/ProductsDetails/ProductsDetails';
import Checkout from './pages/Checkout/Checkout';

export default class App extends React.Component {
  state = {
    inputSearch: '',
    productList: [],
    cartProductList: [],
    quantity: 0,
  }

  componentDidMount() {
    this.checkLocalStorage();
  }

  checkLocalStorage = () => {
    if (!localStorage.getItem('CartProductList')) {
      localStorage.setItem('CartItensQuantity', JSON.stringify(0));
    } else {
      this.setState({
        quantity: JSON.parse(localStorage.getItem('CartItensQuantity')),
        cartProductList: JSON.parse(localStorage.getItem('CartProductList')),
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.updateState(name, value);
  }

  updateState = (key, value) => {
    this.setState(() => ({
      [key]: value,
    }), () => {
      if (key === 'cartProductList') {
        this.getCartQuantity();
      }
    });
  }

  updateCartItem = (name, id, quantity = 0) => {
    this.setState(({ cartProductList }) => {
      let i;
      const productList = JSON.parse(JSON.stringify(cartProductList));
      productList.forEach((product, index) => { if (product.id === id) i = index; });
      if (name === 'less' || name === 'remove') {
        if (name === 'remove' || productList[i].quantity === 1) {
          return {
            cartProductList: cartProductList.filter((item) => item.id !== id),
          };
        }
        productList[i].quantity -= +quantity || 1;
      }
      if (name === 'add') productList[i].quantity += +quantity || 1;
      productList[i].totalPrice = productList[i].price * productList[i].quantity;
      return { cartProductList: productList };
    }, () => {
      this.getCartQuantity();
    });
  }

  getCartQuantity = () => {
    const {
      cartProductList,
    } = this.state;
    const cartQuantity = cartProductList.map((product) => product.quantity)
      .reduce((a, b) => a + b, 0);
    this.setState({
      quantity: cartQuantity,
    });
    localStorage.setItem('CartItensQuantity', JSON.stringify(cartQuantity));
    localStorage.setItem('CartProductList', JSON.stringify(cartProductList));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Home
                { ...this.state }
                onChange={ this.handleChange }
                updateState={ this.updateState }
                updateCartItem={ this.updateCartItem }
              />
            ) }
          />
          <Route
            path="/cart"
            render={ (props) => (
              <Cart
                { ...props }
                { ...this.state }
                updateCartItem={ this.updateCartItem }
              />
            ) }
          />
          <Route
            path="/checkout"
            component={ Checkout }
          />
          <Route
            path="/productDetails/:productId"
            render={ (props) => (
              <ProductsDetails
                { ...props }
                { ...this.state }
                updateState={ this.updateState }
                updateCartItem={ this.updateCartItem }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
