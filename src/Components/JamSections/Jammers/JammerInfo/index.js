import React, { useState, useEffect } from 'react';

import DataService from '../../../services/DataService';
import useInviteJammerForm from '../../../Forms/InviteJammerForm';
import PersonalInfoBlock from '../../../UI/PersonalInfoBlock';
import EditJammerForm from '../../../Forms/EditJammerForm';
import StartChatButton from '../../../UI/Buttons/StartChatButton';

import { connect } from 'react-redux';

// CSS
import './index.scss';

const JammerInfo = ({jamId, jamName, lastName, userRole, firstName, userId, docId }) => {
  
  const [tenantInfo, setTenantInfo] = useState([]);
  const [ address, setAddress ] = useState('');

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
      const complAdd = {address: res.street+' '+`${res.houseNr}`+', '+`${res.floor !== '' && (res.floor+' floor')}`+`${res.door !== '' && (', door '+res.door) }`, 
        city: res.zipCode+' - '+res.city,
        country: res.country
      };
      setAddress(complAdd);
    })
  }, [jamId, docId])

  return(
    <div className="jammer-info-wrapper">
      {docId && tenantInfo.length !== 0 ? (
        <>
          <div className="jammer-info-header">
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
          </div>

          <div className="jammer-info-section">
            <div className="jammer-info-section-title">
              <p>Personal Info</p>
            </div>
            <div className="jammer-info-section-content">
              <PersonalInfoBlock
                info={'Email'}
                data={tenantInfo.email}
              />
              <PersonalInfoBlock
                info={'Passport'}
                data={tenantInfo.passport}
              />
              <PersonalInfoBlock
                info={'Address'}
                data={address.address}
              />
               <PersonalInfoBlock
                info={'City'}
                data={address.city}
              />
              <PersonalInfoBlock
                info={'Country'}
                data={address.country}
              />
              <PersonalInfoBlock
                info={'Phone'}
                data={tenantInfo.homeTel}
              />
              <PersonalInfoBlock
                info={'Mobile'}
                data={tenantInfo.mobile}
              />

            </div>
          </div>

          <div className="jammer-info-section">
            <div className="jammer-info-section-title">

            </div>
            <div className="jammer-info-section-content">

            </div>
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
  const { jamName } = state.jamInfo;
  const { userId , firstName, lastName, userRole } = state.userInfo

  return { jamId, jamName, docId, userId, userRole, firstName, lastName }
};
  
export default connect(mapStateToProps, null) (JammerInfo);
