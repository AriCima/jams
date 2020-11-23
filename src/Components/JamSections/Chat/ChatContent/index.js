import React from 'react';
import Calculations from '../../../services/Calculations';

import moment from 'moment';

import './index.scss';

const ChatContent = ({ chatContent}) => {


    const messageTime = Calculations.getMessageDate(chatContent.createdAt)

    const renderMessage = (messageType) => { 
        switch (messageType){
            case 'publi':
                return (
                    <div className="board-publi-item">
                        <div className="publi-img">
                        </div>
                        <div className="publi-info">
                            <div className="publi-title">

                            </div>
                            <div className="publi-text">
                            
                            </div>
                            <div className="publi-time">
                            
                            </div>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="board-message-item">
                        <div className="board-message">
                            <p>{chatContent.messageText}</p>
                        </div>
                        <div className="board-message-info">
                            <div className="board-message-time">
                                <p>{chatContent.adminName} - {messageTime}</p>
                            </div>
                        </div>
                    </div>
                )
                //console.log('no navbar item matched')
        };

    }

    return (
        <>
            {renderMessage(chatContent.messageType)}
        </>
    );   
};
export default ChatContent;
