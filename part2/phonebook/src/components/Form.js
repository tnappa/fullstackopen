import React from 'react'
import Input from './Input'

const Form = ({ onSubmit, props }) => {
  return(
    <form onSubmit={onSubmit}>
      {props.map(prop =>
        <Input 
        key={prop.text}
        text={prop.text}
        value={prop.value}
        onChange={prop.onChange}
        />
      )}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form