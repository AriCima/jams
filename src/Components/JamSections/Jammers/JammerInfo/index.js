import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import useInviteJammerForm from '../../../Forms/InviteJammerForm';
import EditJammerForm from '../../../Forms/EditJammerForm';


import { connect } from 'react-redux';

// CSS
import './index.scss';

const JammerInfo = ({jamId, userRole, userId, jammerInfo, docId }) => {
  
  const [tenantInfo, setTenantInfo] = useState([]);

  useEffect(() => {
    let documentId;
    if (userRole === 'Admin'){
      documentId = docId;
    } else {
      documentId = userId
    }
    DataService.getJammerInfo(jamId, documentId)
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
  const { jamId, docId } = state.nav;
  const { userId , userRole } = state.userInfo
  return { jamId, docId, userId }
};
  
export default connect(mapStateToProps, null) (JammerInfo);
