import React, { useState, useEffect, Fragment } from 'react';

import DataService from '../../../services/DataService';
import ButtonContactTenant from '../../../UI/ButtonContactTenant';
import StudentInfoForm from '../../../Forms/StudentInfoForm';

import { connect } from 'react-redux';
import { selectJam } from "../../../../redux/actions/jamId";
import { setJamSection } from "../../../../redux/actions/jamSection";

// CSS
import './index.scss';

const LandlordTenantInfo = ({ auth, jamId, tenantId, userJams }) => {
  const userId = auth.uid;

  const [tenantInfo, setTenantInfo ] = useState({})

  useEffect(() => {
    tenantId && DataService.getJammerInfo(jamId, tenantId)
    .then(result => {
      setTenantInfo(result)
    })
    
  }, [jamId, tenantId])


  // const contactTenant = () => {

  //     const chatId = userId + tenantId;
  //     const reverseChatId = tenantId + userId;

  //     const tenantName = tenantInfo.name
  
  //     if(userJams.includes(chatId)){
  //       return selectJam(chatId)
  //     };
      
  //     if(userJams.includes(reverseChatId)){
  //       return selectJam(reverseChatId)
  //     }
  
  //     const chatInfo = { 
  //       createdAt: new Date(), 
  //       adminId: userId, 
  //       user2Id: tenantId,
  //       user2Name: tenantName,
  //       jamId: chatId, 
  //       jamType: 'chat', 
  //       messages: [] 
  //     }
  
  //     DataService.startChat(chatId, chatInfo)
  //     .then(res => {
  //       //console.log('res del startChat = ', res)
  //     })
  //     DataService.addJamToUser(userId, chatInfo);
  //     DataService.addJamToUser(tenantId, chatInfo);
  //     setJamSection('chat')
  // }

  return(
    <div className="tenant-info-wrapper">
      { tenantInfo !== undefined ? 
        <Fragment>
          <div className="tenant-info-form">
            <StudentInfoForm 
              tenantInfo={tenantInfo}
            />
          </div>
          <div className="tenant-info-contact-button-area">
            <ButtonContactTenant
              tenantName={tenantInfo.tenantName}
              // onContactTenant={contactTenant}
            />
          </div>
        </Fragment>
        :
        <div>select a tenant !</div>
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    settenantId: (tenantId) => dispatch(setJamSection(tenantId)),
  }
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      tenantId: state.tenantId
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps) (LandlordTenantInfo);
