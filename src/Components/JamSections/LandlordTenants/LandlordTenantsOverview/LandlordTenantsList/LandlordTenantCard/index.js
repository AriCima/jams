import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import StartChatButton from '../../../../../UI/Buttons/StartChatButton';

import "./index.scss";
import { setDocType, setDocId, setEditable } from "../../../../../../redux/actions/docsActions";

const LandlordTenantCard = ({ tL, setDocType, setDocId, setEditable }) => {

  const showTenantForm = (e) => {
    e.preventDefault();
    setDocType('TENANT-FORM');
    setDocId(tL.id);
    setEditable('true');
  }

  return (

    <div className="landlord-tenant-wrapper"
      onClick={e => showTenantForm(e)}
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
              user2Name={tL.firstName}
              user2Id={tL.id}
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



export default connect(null, { setDocType, setDocId, setEditable })(LandlordTenantCard);
