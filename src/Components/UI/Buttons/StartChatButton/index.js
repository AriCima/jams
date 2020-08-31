import React from "react";
import { connect } from "react-redux";
import DataService from '../../../services/DataService';
import { setJam } from '../../../../redux/actions/jamId';

import "./index.scss";

const StartChatButton = ({ auth, userJams, user2Name, user2Id, userId, tenantId, setJam}) => {

    const user1Id = auth.uid;

    const launchChat = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const chatId = userId + tenantId;
        const reverseChatId = tenantId + userId;

        if(userJams.includes(chatId)){
        return setJam(chatId)
        };
        
        if(userJams.includes(reverseChatId)){
        return setJam(reverseChatId)
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
        <p>Chat</p>
    </div>
  )
  
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      userJams: state.userJams,
    }
};

export default connect (mapStateToProps, { setJam })(StartChatButton);
