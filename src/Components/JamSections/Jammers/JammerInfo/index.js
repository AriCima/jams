import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import useInviteJammerForm from '../../../Forms/InviteJammerForm';
import EditJammerForm from '../../../Forms/EditJammerForm';


import { connect } from 'react-redux';

// CSS
import './index.scss';

const JammerInfo = ({jamId, docId }) => {
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
        <EditJammerForm 
          tenantInfo={tenantInfo}
          docId={docId}
          jamId={jamId}
        />
      ):(
        <useInviteJammerForm 
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
  
export default connect(mapStateToProps, null) (JammerInfo);
