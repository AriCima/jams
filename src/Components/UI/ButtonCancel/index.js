import React from 'react';

// CSS
import './index.css';

const ButtonCancel = (props) => {

  const handleClick = () => {
    props.clickHandle()
  }

  return (
    <button 
      id="cancelButton"
      onClick={(e) => {
        e.preventDefault(); 
        handleClick()}}
      >
      Cancel
    </button>
  );
  
}


export default ButtonCancel;


// IMPLEMENTATION

{/* <ButtonPlain 
  clickHandle={fn del padre}
/> */}