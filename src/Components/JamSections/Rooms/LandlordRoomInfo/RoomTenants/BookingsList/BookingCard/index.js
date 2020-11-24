import React from "react";
import { connect } from 'react-redux';

import moment from 'moment';

import { setDocType, setDocId, setEditable } from "../../../../../../../redux/actions/docsActions";
import { setSection } from '../../../../../../../redux/actions/navigateActions';

// CSS
import "./index.css";

const BookingCard = ({ 
  bI,
  setDocType,
  setSection,
  setDocId,
  setEditable
}) => {


  const takeMeToTenantInfo = (e, userId) => {
    e.preventDefault();
    setSection('Tenants')
    setDocType('TENANT-FORM');
    setDocId(userId); // tenant's userId
    setEditable('true');
};

  return (
    <tr
      onClick={(e) => takeMeToTenantInfo(e, bI.userId)}
    >
      <td id="number-column">{bI.roomNr}</td>
      <td>{bI.firstName} {bI.lastName}</td>
      <td>{bI.checkIn}</td>
      <td>{bI.checkOut}</td>
      <td>{bI.rent}</td>
      <td>{bI.deposit}</td>
    </tr>

  )
  
}

export default connect(null, { setDocType, setSection, setDocId, setEditable })(BookingCard);

