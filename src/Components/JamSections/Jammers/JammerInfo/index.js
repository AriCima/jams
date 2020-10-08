import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import useInviteJammerForm from '../../../Forms/InviteJammerForm';
import EditJammerForm from '../../../Forms/EditJammerForm';
import StartChatButton from '../../../UI/Buttons/StartChatButton';

import { connect } from 'react-redux';

// CSS
import './index.scss';

const JammerInfo = ({jamId, userRole, userId, docId }) => {
  
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
    <div className="jammer-info-wrapper">
      {docId && tenantInfo.length !== 0 ? (
        <>
          <div className="start-chatButton">
            <StartChatButton 
              user2Name={tenantInfo.firstName}
              user2Id={docId}
            />
          </div>
          <EditJammerForm 
            tenantInfo={tenantInfo}
            docId={docId}
            jamId={jamId}
          />
        </>
      ):(
        <useInviteJammerForm 
          jamId={jamId}/>
     )}
    </div>
  )
}


const mapStateToProps = state => {
  const { jamId } = state.nav;
  const { docId } = state.doc;
  const { userId , userRole } = state.userInfo
  return { jamId, docId, userId, userRole }
};
  
export default connect(mapStateToProps, null) (JammerInfo);
