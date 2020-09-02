import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

import DataService from '../../../services/DataService';

import "./index.scss";

const InviteTenantButton = ({ jamId, jamName }) => {

  const sendInvitation = () => {

  }

  return (

    <div className="inviteButton"
        onClick={e => sendInvitation(e)}
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
      />
      <p>Invite a tenant</p>

    </div>
  )
  
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
    }
};

export default connect (mapStateToProps, null)(InviteTenantButton);
