import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import useInviteTenantForm from '../../../Forms/InviteTenantForm';
import EditTenantForm from '../../../Forms/EditTenantForm';


import { connect } from 'react-redux';

// CSS
import './index.scss';

const LandlordTenantInfo = ({jamId, docId }) => {
  const [tenantInfo, setTenantInfo] = useState([]);

  useEffect(() => {
    const jId = jamId.jamId;  // CHAPUZA
    docId && DataService.getJammerInfo(jId, docId)
    .then(result => {
      setTenantInfo(result)
    })
    
  }, [jamId, docId])

  return(
    <div className="tenant-info-wrapper">
      {docId && tenantInfo.length !== 0 ? (
        <EditTenantForm 
          tenantInfo={tenantInfo}
          docId={docId}
          jamId={jamId}
        />
      ):(
        <useInviteTenantForm 
          jamId={jamId}/>
     )}
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
