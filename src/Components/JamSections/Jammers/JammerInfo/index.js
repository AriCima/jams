import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import DataService from '../../../services/DataService';
import StartChatButton from '../../../UI/Buttons/StartChatButton';
import ButtonPlain from '../../../UI/Buttons/ButtonPlain';
import JammerContractInfo from '../../../Reusables/JammerContractInfo';
import JammerPersonalInfo from '../../../Reusables/JammerPersonalInfo';
import { setModalContent, setModalState } from '../../../../redux/actions/modalActions';

// CSS
import './index.scss';

const JammerInfo = ({
    jamId,
    jamName,
    lastName,
    userRole,
    firstName,
    userId,
    docId,
    setModalState,
    setModalContent
  }) => {
  
  const [tenantInfo, setTenantInfo] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let documentId;
    if (userRole === 'Admin'){
      documentId = docId;
    } else {
      documentId = userId
    }
    DataService.getJammerInfo(jamId, documentId)
    .then(res => {
      setTenantInfo(res)
    })
  }, [jamId, docId])


  const enableForm = () => {
    setDisabled(false)
  }


  return(
    <div className="jammer-info-wrapper">
      {docId && tenantInfo.length !== 0 ? (
        <>
          <div className="jammer-info-header">
            <div className="landlord-tenant-picture">
              <FontAwesomeIcon
                className="userCircle-icon"
                icon={faUserCircle}
              />
            </div>
            <div className="jammer-info-header-name">
              <p>{tenantInfo.firstName} {tenantInfo.lastName}</p>
            </div>
            <div className="start-chatButton">
              <StartChatButton 
                user1Name={firstName}
                user1LastName={lastName}
                user1Id={userId}
                user2Name={tenantInfo.firstName}
                user2LastName={tenantInfo.lastName}
                user2Id={docId}
                jamName={jamName}
              />
            </div>
            <div className="editInfo-button">
              <ButtonPlain text={'Edit Info'} fn={enableForm}/>
            </div>
          </div>
          <JammerPersonalInfo
            personalInfo={tenantInfo}
            disabled={disabled}
          />
          <JammerContractInfo 
            contractInfo={tenantInfo}
            disabled={disabled}
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
  const { jamName } = state.jamInfo;
  const { userId , firstName, lastName, userRole } = state.userInfo

  return { jamId, jamName, docId, userId, userRole, firstName, lastName }
};
  
export default connect(mapStateToProps, { setModalContent, setModalState }) (JammerInfo);
