import React, { Component } from 'react';
import { ReactComponent as CircleIcon } from '../../Icons/circleUp.svg';
import IconButton from '../../Buttons/IconButton/IconButton';

export default class ScrollToTop extends Component {
  state = {
    isScroll: false,
  };

  scrollBy() {
    const { height: cardHeight } = document
      .querySelector('#gallery')
      .firstElementChild.getBoundingClientRect();

    return window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  scrollToTop() {
    const start = document.querySelector('#header');
    return window.scrollTo({ top: start, behavior: 'smooth' });
  }

  render() {
    return (
      <IconButton
        type="button"
        variant="scroll-to-top"
        aria-label="Arrow up"
        onClick={this.scrollToTop}
      >
        <CircleIcon width="30" heigth="30" />
      </IconButton>
    );
  }
}
