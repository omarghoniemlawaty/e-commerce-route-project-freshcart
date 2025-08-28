import { ErrorMessage , Field } from 'formik'
import React from 'react'

const Input = ({name , label , ...props}) => {    
  return (
    <div>
       {label !==undefined && <label htmlFor={name}>{label}</label>}
        <Field id={name} name={name} type='text' {...props}/>
        <ErrorMessage name={name}>
           {errorMsg=>  <p style={{ color: "#962118"} } >{errorMsg}</p>           }
          </ErrorMessage>
    </div>
  )
}


export default Input
