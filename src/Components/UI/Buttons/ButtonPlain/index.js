import React from 'react';

// CSS
import './index.scss';

const ButtonPlain = ({text, fn}) => {

  const handleClick = () => {
    fn()
  }

  return (
    <div
      className="plain-button"
      onClick={(e) => {
        e.preventDefault(); 
        handleClick();
      }}
    >
      <p>{text}</p>
    </div>
  );
  
}


export default ButtonPlain;


// IMPLEMENTATION

{/* <ButtonPlain
  text="xxxxxxx"
  clickHandle={father fn}
/> */}