import React from 'react';

// CSS
import './index.scss';

const ButtonSubmit = (props) => {

  const handleClick = () => {
    props.clickHandle()
  }

  return (
    <div
      className="submit-button"
      type='submit'
      onClick={(e) => {
        e.preventDefault(); 
        handleClick()
      }}
    >
      <p>{props.text}</p>
    </div>
  );
  
}


export default ButtonSubmit;


// IMPLEMENTATION

{/* <ButtonSubmit/> */}