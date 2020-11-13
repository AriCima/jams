import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'

import DataService from '../../../services/DataService';
import { setJamId } from '../../../../redux/actions/navigateActions.js';

import "./index.scss";

const StartChatButton = ({ userJams, user1Name, user1Id, user2Name, user2LastName, user2Id, jamName}) => {

  const launchChat = (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('launchChat: ', user1Id, ' / ', user2Id);

      const chatId = user1Id + user2Id;
      const reverseChatId = user2Id + user1Id;

      if(userJams.includes(chatId)){
      return setJamId(chatId)
      };
      
      if(userJams.includes(reverseChatId)){
      return setJamId(reverseChatId)
      }

      const chatInfo = { 
          createdAt: new Date(), 
          adminId: user1Id,
          adminName: user1Name, 
          user2Id: user2Id,
          user2Name: user2Name,
          user2LastName: user2LastName,
          jamId: chatId, 
          jamType: 'chat', 
          jamName: jamName,
      }

      console.log('justo antes 1 / 2: ', user1Id, ' / ', user2Id)
      DataService.startChat(chatId, chatInfo, user1Id, user2Id);
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

    const { userJams } = state.userInfo

    return { userJams }
};

export default connect (mapStateToProps, { setJamId })(StartChatButton);
