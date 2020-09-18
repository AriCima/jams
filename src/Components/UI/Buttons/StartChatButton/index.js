import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'

import DataService from '../../../services/DataService';
import { setJamId } from '../../../../redux/actions/navigateActions.js';

import "./index.scss";

const StartChatButton = ({ userId, userJams, user2Name, user2Id, user1Id, tenantId, setJamId}) => {

    const launchChat = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const chatId = userId + tenantId;
        const reverseChatId = tenantId + userId;

        if(userJams.includes(chatId)){
        return setJamId(chatId)
        };
        
        if(userJams.includes(reverseChatId)){
        return setJamId(reverseChatId)
        }

        const chatInfo = { 
            createdAt: new Date(), 
            adminId: user1Id, 
            user2Id,
            user2Name,
            jamId: chatId, 
            jamType: 'chat', 
            messages: [] 
        }

        DataService.startChat(chatId, chatInfo)
        .then(res => {
        })
        DataService.addJamToUser(userId, chatInfo);
        DataService.addJamToUser(tenantId, chatInfo);
    }

  return (

    <div className="contactButton"
        onClick={e => launchChat(e)}
    >
      <FontAwesomeIcon
        icon={faComments}
      />
      <p>Chat</p>

    </div>
  )
  
}

const mapStateToProps = state => {
    return { 
      userId: state.userInfo.userId,
      userJams: state.userJams,
    }
};

export default connect (mapStateToProps, { setJamId })(StartChatButton);
