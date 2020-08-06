import React, {Fragment} from "react";

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// REDUX
import { connect } from 'react-redux';
import { selectJam } from '../../../../redux/actions/jamId';

// CSS
import "./index.css";

const Home = (props) => {

  const onSelectJam = (jamId) => {
    props.selectJam(jamId);
  };

  return (

    <button  className="home-button" onClick={()=> onSelectJam(null)}>
        <FontAwesomeIcon className="home-icon-style" icon={faHome} />
    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectJam: () => dispatch(selectJam(null)),
  }
}

export default connect(null, mapDispatchToProps)(Home)
