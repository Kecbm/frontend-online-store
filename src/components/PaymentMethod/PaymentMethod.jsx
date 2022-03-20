import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from '../Radio/Radio';
import HeadingSecondary from '../HeadindSecondary/HeadingSecondary';
import styles from './styles.module.css';

class PaymentMethod extends Component {
  render() {
    const { onRadioChange } = this.props;
    return (
      <section className={ styles.PaymentContainer }>
        <div>
          <HeadingSecondary title="Método de Pagamento" />
        </div>
        <div className={ styles.RadioGroupContainer }>
          <div>
            <p>Boleto</p>
            <Radio
              radioId="boleto"
              iconName="barcode"
              radioValue="barcode"
              radioName="paymentmethod"
              radioLabel=""
              changed={ onRadioChange }
            />
          </div>
          <div className={ styles.CreditBox }>
            <p>Cartão de Crédito</p>
            <div className={ styles.RadioGroup }>
              <Radio
                radioId="boleto"
                iconName="credit-card"
                radioValue="visa"
                radioName="paymentmethod"
                radioLabel="Visa"
                changed={ onRadioChange }
              />
              <Radio
                radioId="boleto"
                iconName="credit-card1"
                radioValue="mastercard"
                radioName="paymentmethod"
                radioLabel="Master Card"
                changed={ onRadioChange }
              />
              <Radio
                radioId="boleto"
                iconName="creditcard"
                radioValue="elo"
                radioName="paymentmethod"
                radioLabel="Elo"
                changed={ onRadioChange }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PaymentMethod.propTypes = {
  onRadioChange: PropTypes.func,
};

PaymentMethod.defaultProps = {
  onRadioChange: () => '',
};

export default PaymentMethod;
