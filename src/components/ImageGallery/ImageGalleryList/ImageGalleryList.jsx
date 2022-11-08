import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGalleryList.module.css';

const ImageGalleryList = ({ images, ...otherProps }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          original={largeImageURL}
          preview={webformatURL}
          description={tags}
          {...otherProps}
        />
      ))}
    </ul>
  );
};

ImageGalleryList.propTypes = {
  otherProps: PropTypes.any,
  images: PropTypes.array,
};

export default ImageGalleryList;
