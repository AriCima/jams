import React from 'react';

// CSS
import './index.css';

const ButtonPlain = (props) => {

  const { text, type } = props;

  const handleClick = () => {
    props.clickHandle()
  }

  return (
    <button 
      id="plain"
      type={type}
      onClick={() => handleClick()}
      >
      {text}
    </button>
  );
  
}


export default ButtonPlain;


// IMPLEMENTATION

{/* <ButtonPlain 
  type='submit'
  text='submit'
  clickHandle={fn del padre}
/> */}