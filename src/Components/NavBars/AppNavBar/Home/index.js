import React, {Fragment} from "react";

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// REDUX
import { connect } from 'react-redux';
import { setJam } from '../../../../redux/actions/jamId';

// CSS
import "./index.css";

const Home = (props) => {

  const onsetJam = (jamId) => {
    props.setJam(jamId);
  };

  return (

    <button  className="home-button" onClick={()=> onsetJam(null)}>
        <FontAwesomeIcon className="home-icon-style" icon={faHome} />
    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    setJam: () => dispatch(setJam(null)),
  }
}

export default connect(null, mapDispatchToProps)(Home)
