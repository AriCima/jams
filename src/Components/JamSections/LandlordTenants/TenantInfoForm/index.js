import React, { useState, useEffect, Fragment } from 'react';

import DataService from '../../../services/DataService';
import TenantInfoForm from '../../../Forms/TenantInfoForm';

import { connect } from 'react-redux';

// CSS
import './index.scss';

const LandlordTenantInfo = ({jamId, docId }) => {

  const [tenantInfo, setTenantInfo] = useState([]);

  useEffect(() => {
    const jId = jamId.jamId;  // CHAPUZA
    DataService.getJammerInfo(jId, docId)
    .then(result => {
      setTenantInfo(result)
    })
    
  }, [jamId, docId])

  return(
    <div className="tenant-info-wrapper">
      <TenantInfoForm 
        tenantInfo={tenantInfo}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return { 
    auth: state.firebase.auth,
    jamId: state.jamId
  }
};
  
export default connect(mapStateToProps, null) (LandlordTenantInfo);
