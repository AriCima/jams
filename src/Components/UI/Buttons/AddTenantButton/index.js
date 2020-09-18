import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { setSection, setSubSection } from '../../../../redux/actions/navigateActions';
import { setDocType, setDocId, setEditable } from '../../../../redux/actions/docsActions';

import "./index.scss";

const AddTenantButton = ({ setSection, setSubSection, setDocType, setDocId, setEditable }) => {

  const addTenant = () => {
    setSection('Tenants');
    setSubSection('');
    setDocType('ADD-TENANT');
    setDocId('');
    setEditable(true);
  }

  return (

    <div className="add-button"
        onClick={e => addTenant(e)}
    >
      <FontAwesomeIcon
        icon={faUserPlus}
      />
      <p>Add tenant</p>

    </div>
  )
  
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
    }
};

export default connect (mapStateToProps, { setSection, setSubSection, setDocType, setDocId, setEditable})(AddTenantButton);
