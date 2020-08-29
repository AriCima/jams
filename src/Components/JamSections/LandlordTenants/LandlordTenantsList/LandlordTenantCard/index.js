import React from "react";
import { connect } from 'react-redux';

import { setSubSection } from '../../../../../redux/actions/navigateActions';

import "./index.scss";

const LandlordTenantCard = ({ tL, setSubsection }) => {
  console.log('tL: ', tL);

  const handleClick = (e) => {
    e.preventDefault();
    alert('go to TENANT FORM');

    // setSubSection(tL.id)
  }

  const handleContact = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('launch chat');
  }

  return (

    <div className="landlord-tenant-wrapper"
      onClick={e => handleClick(e)}
    >
      <div className="landlord-tenant-picture">
        <img></img>
      </div>
      <div className="landlord-tenant-info">
        <div className="landlord-tenant-info-line">
          <h4>{tL.jammerName} {tL.jammerSurname}</h4> <p>- {tL.jammerCity}, {tL.jammerCountry}</p>
        </div>
        <div className="landlord-tenant-info-line-roomInfo">
          <p>Room Nr: {tL.roomNr}</p> <p>Rent: {tL.rent}</p> <p>Deposit: {tL.deposit}</p>
        </div>
        <div className="landlord-tenant-info-line">
          <div className="contactButton"
             onClick={e => handleContact(e)}
          >
            <p>Contact {tL.jammerName} </p>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default connect(null, { setSubSection })(LandlordTenantCard);
