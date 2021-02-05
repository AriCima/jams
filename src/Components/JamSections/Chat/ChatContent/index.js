import React from 'react';
import { connect } from 'react-redux';

import Calculations from '../../../services/Calculations';
import moment from 'moment';

import './index.scss';

const ChatContent = ({ chatContent, userId }) => {


    const messageTime = Calculations.getMessageDate(chatContent.createdAt)
    const myMessage = chatContent.userId === userId

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
                    <div className={`board-message-item ${myMessage ? 'myMessage' : ''}`}>
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
        };

    }

    return (
        <>
            {renderMessage(chatContent.messageType)}
        </>
    );   
};

const mapStateToProps = state => {
    const { userId } = state.userInfo;

    return { userId };
}

export default connect(mapStateToProps, null)(ChatContent);
