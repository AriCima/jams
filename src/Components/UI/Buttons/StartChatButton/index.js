import React from "react";
import { connect } from "react-redux";
import findIndex from 'lodash/findIndex';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'

import DataService from '../../../services/DataService';
import { setJamId } from '../../../../redux/actions/navigateActions.js';

import "./index.scss";

const StartChatButton = ({
  adminId,
  adminName,
  adminLastName,
  jammers,
  jamDesc,
  originJamId,
  setJamId,
  userJams,
}) => {

  const launchChat = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const jammerId = jammers[0].userId;

    const chatId = adminId + jammerId;
    const reverseChatId = jammerId + adminId;

    const existChat = findIndex(userJams, {'jamId': chatId}) !== -1;
    const existReverseChat = findIndex(userJams, {'jamId': reverseChatId}) !== -1;
    
    
    if(existChat){
      return setJamId(chatId)
    };
    
    if(existReverseChat){
      return setJamId(reverseChatId)
    }

    const chatInfo = { 
      createdAt: new Date(), 
      adminId,
      adminName, 
      adminLastName,
      jammers,
      jamId: chatId, 
      jamType: 'chat', 
      jamDesc,
      originJamId,
    }
    console.log('chatInfo: ', chatInfo);
    
    DataService.startChat(chatId, chatInfo, adminId, jammerId)
    .then(
      setJamId(chatId)
    );
  };

  return (

    <div className="contactButton"
        onClick={(e) => launchChat(e)}
    >
      <FontAwesomeIcon
        icon={faComments}
      />
      <p>Chat</p>

    </div>
  )
  
}

const mapStateToProps = state => {

    const { userJams } = state.userInfo;
    const { jamName } = state.jamInfo;

    return { userJams, jamName }
};

export default connect (mapStateToProps, { setJamId })(StartChatButton);
