import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FreeShippingTag extends Component {
  render() {
    const { className } = this.props;
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/1611/1611780.png"
        alt="free-shipping"
        data-testid="free-shipping"
        className={ className }
      />
    );
  }
}

export default FreeShippingTag;

FreeShippingTag.propTypes = {
  className: PropTypes.string.isRequired,
};
