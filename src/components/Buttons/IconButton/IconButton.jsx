import React from 'react';
import PropTypes from 'prop-types';
import css from './IconButton.module.css';

export const IconButton = ({
  type,
  variant,
  children,
  onClick,
  ...anyProps
}) => (
  <button
    className={css.button_icon}
    type={type}
    variant={variant}
    onClick={onClick}
    {...anyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  type: 'button',
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
