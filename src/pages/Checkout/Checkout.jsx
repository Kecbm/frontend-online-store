import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuyerInfo from '../../components/BuyerInfo/BuyerInfo';
import CheckoutProduts from '../../components/CheckoutProducts/CheckoutProduts';
import styles from './style.module.css';
import Icon from '../../components/Icon/Icon';

class Checkout extends Component {
  state = {
  //   fullName: '',
  //   email: '',
  //   cpf: '',
  //   phone: '',
  //   cep: '',
  //   address: '',
  //   paymentmethod: '',
    isDisabled: false,
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    // const { fullName, email,
    //   cpf,
    //   phone,
    //   cep,
    //   address, paymentmethod } = this.state;
    // const data = {
    //   fullName,
    //   email,
    //   cpf,
    //   phone,
    //   cep,
    //   address,
    //   paymentmethod,
    // };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  render() {
    const { isDisabled } = this.state;
    const { location: { state }, history: { goBack } } = this.props;

    return (
      <div className={ styles.CheckoutContainer }>
        <div className={ styles.CheckoutOptions }>
          <button type="button" onClick={ goBack } className={ styles.GoBack }>
            <Icon iconName="undo2" classes="CheckoutIcon" />
            <span>Voltar</span>
          </button>
          <CheckoutProduts products={ state } />
          <BuyerInfo
            onInputChange={ this.handleInputChange }
            onFormSubmit={ this.handleSubmitForm }
            isDisabled={ isDisabled }
          />
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default Checkout;
