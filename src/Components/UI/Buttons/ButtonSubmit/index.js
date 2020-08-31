import React from 'react';

// CSS
import './index.scss';

const ButtonSubmit = ({text}) => {

  return (
    <div
      className="submit-button"
      type='submit'
      >
      <p>{text}</p>
    </div>
  );
  
}


export default ButtonSubmit;


// IMPLEMENTATION

{/* <ButtonSubmit/> */}