import React from 'react';
import css from './FeatureImage.module.css';

const FeatureImage = ({ children }) => {
  return (
    <div className={css.featureImageContainer}>
      {children}
    </div>
  )
}

export default FeatureImage;