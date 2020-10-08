import React from "react";

// import DataService from "../../../../../../../../../services/DataService";

import { connect } from 'react-redux';

// CSS
import "./index.css";
import {setJammerId} from "../../../../../../../../../../redux/actions/jammersActions"

const LandlordJammerCard = (props) => {

  const { jI  } = props
  
  const jammerId = jI.userId;

  const onShowJammerInfo = (jammerId) => {
    props.setJammerId(jammerId)
  }

  return (

    <button className="landlord-jammer-card-container" onClick={()=> onShowJammerInfo(jammerId)}>

      <div className="landlord-jammer-img">
        <img src={"/"} alt="img" />
      </div>

      <div className="landlord-student-info">

        <div className="landlord-student-info-upperLine">
          <div className="landlord-student-info-upperLine-block">
            <p>{jI.firstName} - {jI.country}</p>
          </div>
        </div>
        <div className="landlord-student-info-lowerLine">
          <div className="landlord-student-info-lowerLine-block">
            <p>{jI.study}, {jI.school}</p>
          </div>
        </div>
      </div>

    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      // nombre de la función que paso como prop: (arg) => 
      // dispatch(nombre del action creator(argumento))
      setJammerId: (jammerId) => dispatch(setJammerId(jammerId)),
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.firebase.auth,
      jamId: state.jamId,
      userJams: state.userJams,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordJammerCard);
