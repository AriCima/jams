import React from 'react';

// CSS
import './index.scss';

const ButtonCancel = (props) => {

  const handleClick = () => {
    props.clickHandle()
  }

  return (
    <div 
      className="cancel-button"
      onClick={(e) => {
        e.preventDefault(); 
        handleClick()}}
      >
      Cancel
    </div>
  );
  
}


export default ButtonCancel;


// IMPLEMENTATION

{/* <ButtonPlain 
  clickHandle={fn del padre}
/> */}