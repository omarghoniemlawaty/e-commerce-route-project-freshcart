import React from 'react'

const SamplePrevArrow = ({ className , style, onClick , display}) => {
    return (
      <div
        className={className}
        style={{ ...style , display}}
        onClick={onClick}
      />
    );
}

export default SamplePrevArrow
