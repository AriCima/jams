import React from "react";

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// REDUX
import { connect } from 'react-redux';
import { setJamId } from '../../../../redux/actions/navigateActions.js';

// CSS
import "./index.css";

const Home = ({ setJamId }) => {

  const onsetJam = (jamId) => {
    setJamId(jamId);
  };

  return (

    <button  className="home-button" onClick={()=> onsetJam(null)}>
        <FontAwesomeIcon className="home-icon-style" icon={faHome} />
    </button>
  )
  
}

export default connect(null, setJamId)(Home)
