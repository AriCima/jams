import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { setSection, setSubSection } from '../../../../redux/actions/navigateActions';
import { setDocType, setDocId, setEditable } from '../../../../redux/actions/docsActions';

import "./index.scss";

const InviteTenantButton = ({ setSection, setSubSection, setDocType, setDocId, setEditable }) => {

  const sendInvitation = () => {
    setSection('Tenants');
    setSubSection('');
    setDocType('INVITE-TENANT');
    setDocId('');
    setEditable(true);
  }

  return (

    <div className="invite-button"
        onClick={e => sendInvitation(e)}
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
      />
      <p>Invite a tenant</p>

    </div>
  )
  
}


export default connect (null, {setSection, setSubSection, setDocType, setDocId, setEditable})(InviteTenantButton);
