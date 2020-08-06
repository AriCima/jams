import React from 'react';

// CSS
import './index.css';

const ButtonContactJammer = (onContactJammer, jammerName) => {

  const handleClick = (event) => {
    onContactJammer(event)
  }

  return (
    <button 
      id="submit"
      type='submit'
      onClick={handleClick}
      >
      <p>contact</p>
    </button>
  );
  
}


export default ButtonContactJammer;


// IMPLEMENTATION

{/* <ButtonContactJammer
  jammername={jammerName}
  onContactJammer = {parent function name}
/> */}