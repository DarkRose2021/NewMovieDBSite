import React, { useState } from 'react';

const StarRating = ({ rating,onChange }) => {

  const handleClick = (value) => {
    onChange(value);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={index < rating ? 'star filled' : 'star'}
          onClick={() => handleClick(index + 1)}
        >
          <i className="bi bi-star-fill"></i>
        </span>
      ))}
    </div>
  );
};

export default StarRating;
