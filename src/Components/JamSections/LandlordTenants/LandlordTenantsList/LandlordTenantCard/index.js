import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { setSubSection } from '../../../../../redux/actions/navigateActions';

import "./index.scss";
import { setDocType, setDocId, setEditable } from "../../../../../redux/actions/docsActions";

const LandlordTenantCard = ({ tL, setDocType, setDocId, setEditable }) => {
  console.log('tL: ', tL);

  const showTenantForm = (e) => {
    e.preventDefault();
    setDocType('TENANT-FORM');
    setDocId(tL.id);
    setEditable('true');
  }

  const launchChat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('launch chat');
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
            <h4>{tL.jammerName} {tL.jammerSurname}</h4> <p>- {tL.jammerCity}, {tL.jammerCountry}</p>
          </div>
          <div className="landlord-tenant-contact">
            <div className="contactButton"
              onClick={e => launchChat(e)}
            >
              <p>Chat</p>
            </div>
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
