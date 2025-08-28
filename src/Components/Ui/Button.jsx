import React from 'react'

const Button = ({children , ...prop}) => {
  return (
    <button {...prop}>
      {children}
    </button>
  )
}

export default Button
