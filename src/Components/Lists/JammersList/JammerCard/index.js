import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import StartChatButton from '../../../UI/Buttons/StartChatButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { setDocType, setDocId, setEditable } from "../../../../redux/actions/docsActions";

import "./index.scss";
const JammerCard = ({ userId, userRole, firstName, lastName, jamName, tL, setDocType, setDocId, setEditable }) => {

  const showJammerForm = (e) => {
    e.preventDefault();
    setDocType('TENANT-FORM');
    setDocId(tL.userId); // tenant's userId
    setEditable('true');
  }

  return (
    <>
    {userRole === 'Admin' ? (
      <div className="landlord-tenant-wrapper"
      onClick={e => showJammerForm(e)}
    >
      <div className="landlord-tenant-picture">
        <FontAwesomeIcon
          className="userCircle-icon"
          icon={faUserCircle}
        />
      </div>
      <div className="landlord-tenant-info">
        <div className="landlord-tenant-info-line">
          <div className="line-name">
            <h4>{tL.firstName} {tL.lastName}</h4> <p>- {tL.city}, {tL.country}</p>
          </div>
          <div className="landlord-tenant-contact">
            <StartChatButton 
              user1Name={firstName}
              user1LastName={lastName}
              user1Id={userId}
              user2Name={tL.firstName}
              user2LastName={tL.lastName}
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
    ) :(
      <div className="tenant-tenant-wrapper">
        <div className="tenant-tenant-picture">
          <FontAwesomeIcon
            className="userCircle-icon"
            icon={faUserCircle}
          />
        </div>
        <div className="tenant-tenant-info-line">
          <div className="line-name">
            <h4>{tL.firstName} {tL.lastName}</h4> <p>- {tL.city}, {tL.country}</p>
          </div>
          <div className="tenant-tenant-contact">
            <StartChatButton 
              user1Name={firstName}
              user1LastName={lastName}
              user1Id={userId}
              user2Name={tL.firstName}
              user2LastName={tL.lastName}
              user2Id={tL.userId}
              jamName={jamName}
            />
          </div>
        </div>
    </div>
    ) }
    
    </>
  )
  
}

const mapStateToProps = state => {

  const jamId = state.nav.jamId;
  const { userId, userRole, firstName, lastName } = state.userInfo;
  const { jamName } = state.jamInfo

  return { jamId, userId, userRole, firstName, lastName, jamName };
};


export default connect(mapStateToProps, { setDocType, setDocId, setEditable })(JammerCard);
