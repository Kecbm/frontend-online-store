import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default class Input extends Component {
  render() {
    const {
      type,
      name,
      className,
      placeholder,
      value,
      onChange,
      dataTestId,
      inputLabel,
    } = this.props;

    let inputEl;

    if (inputLabel.trim()) {
      inputEl = (
        <label htmlFor={ dataTestId } className={ styles.InputLabel }>
          { inputLabel }
          <input
            name={ name }
            id={ dataTestId }
            data-testid={ dataTestId }
            className={ styles.InputText }
            placeholder={ placeholder }
            type={ type }
            value={ value }
            onChange={ onChange }
          />
        </label>
      );
    } else {
      inputEl = (
        <div>
          <input
            name={ name }
            data-testid={ dataTestId }
            className={ className }
            placeholder={ placeholder }
            type={ type }
            value={ value }
            onChange={ onChange }
          />
        </div>
      );
    }

    return inputEl;
  }
}
Input.defaultProps = {
  type: 'text',
  placeholder: '',
  className: '',
  inputLabel: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputLabel: PropTypes.string,
};
