import React, { Component } from 'react';
import { ReactComponent as CircleIcon } from '../../Icons/circleUp.svg';
import IconButton from '../../Buttons/IconButton/IconButton';

export default class ScrollToTop extends Component {
  state = {
    isScroll: false,
  };

  scrollToTop() {
    const start = document.querySelector('#header');
    return window.scrollTo({ top: start, behavior: 'smooth' });
  }

  handleScrollToTop() {
    const GOLDEN_RATIO = 0.5;
    document.documentElement.scrollTop > GOLDEN_RATIO
      ? this.setState({ isScroll: true })
      : this.setState({ isScroll: false });
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
