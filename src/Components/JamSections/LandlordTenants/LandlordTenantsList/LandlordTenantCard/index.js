import React from "react";
import { connect } from 'react-redux';

import { setJammerId } from "../../../../../redux/actions/jammersActions";
import "./index.scss";

const LandlordTenantCard = ({jI, setJammerId, tenantId}) => {

  const onShowTenantInfo = (tenantId) => {
    setJammerId(tenantId)
  }

  return (
    <div className={`tenant-card-container ${tenantId === jI.id && 'tenantActive'}`} 
      onClick={()=> onShowTenantInfo(jI.id)}>

      <div className="tenant-img">
        <img src={"/"} alt="img" />
      </div>

      <div className="student-info">

        <div className="student-info-upperLine">
          <p>{jI.tenantName} - {jI.tenantCountry}</p>
        </div>
        <div className="student-info-lowerLine">
          <p>{jI.tenantStudy}, {jI.tenantSchool}</p>
        </div>
      </div>
    </div>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    setJammerId: (tenantId) => dispatch(setJammerId(tenantId)),
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.firebase.auth,
      jamId: state.jamId,
      userJams: state.userJams,
      tenantId: state.jammerId
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordTenantCard);
