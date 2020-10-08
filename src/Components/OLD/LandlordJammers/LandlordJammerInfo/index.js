import React, { useState, useEffect, Fragment } from 'react';

import DataService from '../../../../../../../../services/DataService';
import ButtonContactJammer from '../../../../../../../../UI/ButtonContactJammer';
import StudentInfoForm from '../../../../../../../../UI/Forms/StudentsFlat/StudentInfoForm';

import { connect } from 'react-redux';
import { setJam } from "../../../../../../../../../redux/actions/jamId";

// CSS
import './index.css';

const LandlordJammerInfo = (props) => {

  const { auth, jamId, jammerId, userJams } = props;
  const userId = auth.uid;

  const [jammerInfo, setJammerInfo ] = useState({})

  useEffect(() => {
    jammerId && DataService.getJammerInfo(jamId, jammerId)
    .then(result => {
      console.log('result =', result)
      setJammerInfo(result)
    })
    
  }, [jamId, jammerId])


  const contactJammer = () => {

      const chatId = userId + jammerId;
      const reverseChatId = jammerId + userId;

      const jammerName = jammerInfo.name
  
      if(userJams.includes(chatId)){
        return setJam(chatId)
      };
      
      if(userJams.includes(reverseChatId)){
        return setJam(reverseChatId)
      }
  
      const chatInfo = { 
        createdAt: new Date(), 
        adminId: userId, 
        user2Id: jammerId,
        user2Name: jammerName,
        jamId: chatId, 
        jamType: 'chat', 
        messages: [] 
      }
  
      DataService.startChat(chatId, chatInfo)
      .then(res => {
        //console.log('res del startChat = ', res)
      })
      DataService.addJamToUser(userId, chatInfo);
      DataService.addJamToUser(jammerId, chatInfo);
      props.setJamSection('chat')
  }

  console.log('jammerInfo.jamName ', jammerInfo.jamName)
  return(
    <div className="jammer-info-wrapper">
      { jammerInfo !== undefined ? 
        <Fragment>
          <div className="jammer-info-form">
            <StudentInfoForm 
              jammerInfo={jammerInfo}
            />
          </div>
          <div className="jammer-info-contact-button-area">
            <ButtonContactJammer
              jammerName={jammerInfo.jammerName}
              onContactJammer={contactJammer}
            />
          </div>
        </Fragment>
        :
        <div>select a tenant !</div>
      }
    </div>
  )
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      jammerId: state.jammerId
    }
};
  
export default connect(mapStateToProps) (LandlordJammerInfo);
