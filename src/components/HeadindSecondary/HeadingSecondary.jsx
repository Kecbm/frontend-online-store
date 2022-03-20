import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class HeadingSecondary extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={ styles.HeadingSecondary }>{ title }</div>
    );
  }
}

HeadingSecondary.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadingSecondary;
