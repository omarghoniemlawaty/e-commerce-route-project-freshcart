import React from 'react'

const SampleNextArrow = (props) => {
    const { className , style, onClick , display } = props;

    return (
      <div
        className={className}
        style={{ ...style , display }}
        onClick={onClick}
      />
    );
}

export default SampleNextArrow
