import React from 'react';

// CSS
import './index.scss';

const ButtonPlain = (props) => {

  const handleClick = () => {
    props.clickHandle()
  }

  return (
    <div
      className="plain-button"
      onClick={(e) => {
        e.preventDefault(); 
        handleClick()
      }}
    >
      <p>{props.text}</p>
    </div>
  );
  
}


export default ButtonPlain;


// IMPLEMENTATION

{/* <ButtonPlain
  text="xxxxxxx"
  clickHandle={father fn}
/> */}