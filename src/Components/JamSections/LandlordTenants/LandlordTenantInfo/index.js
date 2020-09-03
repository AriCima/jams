import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import EditTenantInfoForm from '../../../Forms/EditTenantInfoForm';
import NewTenantInfoForm from '../../../Forms/NewTenantInfoForm';
import ReactForm from '../../../Forms/ReactForm';


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
        <EditTenantInfoForm 
        tenantInfo={tenantInfo}
        docId={docId}
        jamId={jamId}
      />
      ):(
        // <NewTenantInfoForm 
        //   jamId={jamId}
        // />
        <ReactForm />
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
