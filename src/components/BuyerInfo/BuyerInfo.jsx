import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import HeadingSecondary from '../HeadindSecondary/HeadingSecondary';
import styles from './styles.module.css';

class BuyerInfo extends Component {
  state = {}

  render() {
    const { onInputChange, onFormSubmit, isDisabled } = this.props;

    return (
      <form className={ styles.Form } onSubmit={ onFormSubmit }>
        <div className={ styles.BuyerInfoContainer }>
          <HeadingSecondary title="Informações do comprador" />
          <div className={ styles.FormContainer }>
            <Input
              type="text"
              name="fullname"
              inputLabel="Nome Completo:"
              placeholder="João da Silva"
              onChange={ onInputChange }
              dataTestId="checkout-fullname"
            />
            <Input
              type="email"
              name="email"
              inputLabel="Email:"
              placeholder="joao@email.com"
              onChange={ onInputChange }
              dataTestId="checkout-email"
            />
            <Input
              type="text"
              name="cpf"
              inputLabel="CPF:"
              placeholder="000.000.000-00"
              onChange={ onInputChange }
              dataTestId="checkout-cpf"
            />
          </div>
          <div className={ styles.FormContainer }>
            <Input
              type="phone"
              name="phone"
              inputLabel="Telefone:"
              placeholder="(00) 1234-5678"
              onChange={ onInputChange }
              dataTestId="checkout-phone"
            />
            <Input
              type="text"
              name="cep"
              inputLabel="CEP:"
              placeholder="00.000-000"
              onChange={ onInputChange }
              dataTestId="checkout-cep"
            />
            <Input
              type="text"
              name="address"
              inputLabel="Endereço:"
              placeholder="Rua Principal"
              onChange={ onInputChange }
              dataTestId="checkout-address"
            />
          </div>
        </div>
        <PaymentMethod onRadioChange={ onInputChange } />
        <div className={ styles.CheckoutButton }>
          <button
            type="submit"
            className={ styles.BtnSubmit }
            onSubmit={ onFormSubmit }
            disabled={ isDisabled }
          >
            Comprar
          </button>
        </div>
      </form>

    );
  }
}

BuyerInfo.propTypes = {
  onInputChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  isDisabled: PropTypes.bool,
};

BuyerInfo.defaultProps = {
  onInputChange: () => '',
  onFormSubmit: () => '',
  isDisabled: false,
};

export default BuyerInfo;
