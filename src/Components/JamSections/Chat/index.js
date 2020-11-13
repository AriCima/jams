import React, { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import ChatContent from './ChatContent';


// REAL TIME DATABASE https://www.youtube.com/watch?v=noB98K6A0TY
import './index.scss';

const Chat = ({ jamId, userId, adminName, userRole }) => {

    const isAdmin = userRole === 'Admin';
    const [chatInfo, setChatInfo] = useState([]);
   
    useEffect(() => {
        jamId && getChatContent(jamId)
    }, [jamId])


    const getChatContent = async (jamId) => {
        const res = await DataService.getChatMessages(jamId);
        setChatInfo(res);
    }

    const renderChatContent = () => {
        return chatInfo.map((bC, i) => {
            return (
                <ChatContent 
                    key={i} 
                    ChatContent={bC}
                />
            )
        })
    };

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {        
        const date = new Date()

        const messageInfo = {
            messageText: data.message,
            userId: userId,
            adminName: adminName,
            jamId: jamId,
            createdAt: date,
            messageType: 'message'
        }

        DataService.saveChatMessage(jamId, messageInfo)
    };

    
    return (
        <div className="landlord-Chat-wrapper">
            <div className="landlord-Chat">
                {renderChatContent()}
            </div>
            <div className="landlord-Chat-form">
                <form
                    className="Chat-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <textarea
                        rows="1"
                        name="message"
                        ref={register({
                            required: true,
                        })}
                    />
                    <div className="Chat-buttonArea">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
            
        </div>

    );   
};



const mapStateToProps = state => {
    const { jamId } = state.nav;
    const { userId, userName, userRole } = state.userInfo;
    const { adminName } = state.jamInfo

    return { jamId, userId, userName, userRole, adminName  };
};

export default connect(mapStateToProps)(Chat);
