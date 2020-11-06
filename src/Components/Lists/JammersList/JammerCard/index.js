import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import StartChatButton from '../../../UI/Buttons/StartChatButton';

import "./index.scss";
import { setDocType, setDocId, setEditable } from "../../../../redux/actions/docsActions";

const JammerCard = ({ userId, firstName, jamName, tL, setDocType, setDocId, setEditable }) => {

  const showJammerForm = (e) => {
    e.preventDefault();
    setDocType('TENANT-FORM');
    setDocId(tL.id); // tenant's userId
    setEditable('true');
  }

  return (

    <div className="landlord-tenant-wrapper"
      onClick={e => showJammerForm(e)}
    >
      <div className="landlord-tenant-picture">
        <img></img>
      </div>
      <div className="landlord-tenant-info">
        <div className="landlord-tenant-info-line">
          <div className="line-name">
            <h4>{tL.firstName} {tL.lastName}</h4> <p>- {tL.city}, {tL.country}</p>
          </div>
          <div className="landlord-tenant-contact">
            <StartChatButton 
              user1Name={firstName}
              user1Id={userId}
              user2Name={tL.firstName}
              user2Id={tL.userId}
              jamName={jamName}
            />
          </div>
        </div>
        <div className="landlord-tenant-info-line-roomInfo">
          <p>Check-In: {moment(tL.checkIn).format('DD-MMM-YYYY')}</p>
          <p>Check-Out: {moment(tL.checkOut).format('DD-MMM-YYYY')}</p>
          <p>Room Nr: {tL.roomNr}</p>
          <p>Rent: €/Mo {tL.rent}</p>
          <p>Deposit: € {tL.deposit}</p>
        </div>
      </div>
    </div>
  )
  
}

const mapStateToProps = state => {

  const jamId = state.nav.jamId;
  const { userId, userRole, firstName } = state.userInfo;
  const { jamName } = state.jamInfo

  return { jamId, userId, userRole, firstName, jamName };
};


export default connect(mapStateToProps, { setDocType, setDocId, setEditable })(JammerCard);
