import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import DataService from '../../../services/DataService';
// import useInviteJammerForm from '../../../Forms/InviteJammerForm';
// import PersonalInfoBlock from '../../../UI/PersonalInfoBlock';
// import EditJammerForm from '../../../Forms/EditJammerForm';
import StartChatButton from '../../../UI/Buttons/StartChatButton';
import JammerContractInfo from '../../../Reusables/JammerContractInfo';
import JammerPersonalInfo from '../../../Reusables/JammerPersonalInfo';

import { connect } from 'react-redux';

// CSS
import './index.scss';

const JammerInfo = ({jamId, jamName, lastName, userRole, firstName, userId, docId }) => {
  
  const [tenantInfo, setTenantInfo] = useState([]);
  // const [ address, setAddress ] = useState('');

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
      // const complAdd = {address: res.street+' '+`${res.houseNr}`+', '+`${res.floor !== '' && (res.floor+' floor')}`+`${res.door !== '' && (', door '+res.door) }`, 
      //   city: res.zipCode+' - '+res.city,
      //   country: res.country
      // };
      // setAddress(complAdd);
    })
  }, [jamId, docId])

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
          </div>
          <JammerPersonalInfo personalInfo={tenantInfo}/>
          <JammerContractInfo contractInfo={tenantInfo}/>
          {/* <div className="jammer-info-section">
            <div className="jammer-info-section-title">
              <p>Personal Info</p>
            </div>
            <div className="jammer-info-section-personalInfo">
              <PersonalInfoBlock
                info={'Email'}
                data={tenantInfo.email}
                backColor={'buttonPrimary'}
              />
              <PersonalInfoBlock
                info={'Passport'}
                data={tenantInfo.passport}
                backColor={'buttonPrimary'}
              />
              <PersonalInfoBlock
                info={'Address'}
                data={address.address}
                backColor={'buttonPrimary'}
              />
               <PersonalInfoBlock
                info={'City'}
                data={address.city}
                backColor={'buttonPrimary'}
              />
              <PersonalInfoBlock
                info={'Country'}
                data={address.country}
                backColor={'buttonPrimary'}
              />
              <PersonalInfoBlock
                info={'Phone'}
                data={tenantInfo.homeTel}
                backColor={'buttonPrimary'}
              />
              <PersonalInfoBlock
                info={'Mobile'}
                data={tenantInfo.mobile}
                backColor={'buttonPrimary'}
              />

            </div>
          </div>

          <div className="jammer-info-section">
            <div className="jammer-info-section-title">
              <p>Contract Info</p>
            </div>
            <div className="jammer-info-section-contractInfo">
              <PersonalInfoBlock
                info={'Check-In'}
                data={moment(tenantInfo.checkIn).format('DD-MMM-YYYY')}
                backColor={'checkIn'}
              />
              <PersonalInfoBlock
                info={'Check-Out'}
                data={moment(tenantInfo.checkOut).format('DD-MMM-YYYY')}
                backColor={'checkOut'}
              />
              <PersonalInfoBlock
                info={'Room Nr'}
                data={tenantInfo.roomNr}
                backColor={'secondary'}
              />
              <PersonalInfoBlock
                info={'Rent'}
                data={tenantInfo.rent}
                backColor={'secondary'}
              />
              <PersonalInfoBlock
                info={'Deposit'}
                data={tenantInfo.deposit}
                backColor={'secondary'}
              />
            </div>
          </div> */}

          {/* <EditJammerForm 
            tenantInfo={tenantInfo}
            docId={docId}
            jamId={jamId}
          /> */}
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
