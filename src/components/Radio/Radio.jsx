import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Icon from '../Icon/Icon';

const Radio = ({ radioId, iconName, radioValue, radioName, radioLabel, changed }) => {
  let labelEl;
  if (radioLabel.trim()) {
    labelEl = <label htmlFor={ radioId }>{radioLabel}</label>;
  }

  return (
    <div className={ styles.RadioGroup }>
      <input
        type="radio"
        id={ radioId }
        name={ radioName }
        value={ radioValue }
        onChange={ changed }
      />
      {labelEl}
      <Icon iconName={ iconName } classes="PaymentIcon" />
    </div>
  );
};

Radio.propTypes = {
  radioId: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  radioValue: PropTypes.string.isRequired,
  radioName: PropTypes.string.isRequired,
  radioLabel: PropTypes.string,
  changed: PropTypes.func,
};

Radio.defaultProps = {
  radioLabel: '',
  changed: () => '',
};

export default Radio;
