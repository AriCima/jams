import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import EditTenantInfoForm from '../../../Forms/EditTenantInfoForm';
import NewTenantForm from '../../../Forms/NewTenantForm';
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
      {docId ? (
      //   <EditTenantInfoForm 
      //   tenantInfo={tenantInfo}
      //   docId={docId}
      //   jamId={jamId}
      // />
      <EditTenantForm 
        tenantInfo={tenantInfo}
        docId={docId}
        jamId={jamId}
      />
      ):(
        <NewTenantForm 
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
