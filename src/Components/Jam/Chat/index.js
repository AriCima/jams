import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../services/DataService';
import ChatContent from './ChatContent';
import MessageForm from '../../../../../UI/MessageForm';
// CSS
import './index.css';

const Chat = (props) => {

    const {jamId} = props
    // const userId = props.user.uid;
    const [jamAdmin, setJamAdmin] = useState('');
    const [messages, setMessages] = useState([])

    useEffect(() => {
        DataService.getChatContent(jamId)
        .then((res) => {
            setMessages(messages);
            setJamAdmin(jamAdmin);
        })
    }, [jamId, jamAdmin, messages])

    const renderChatContent = () => {
        return messages.map((bC, i) => {
            return (
                <React.Fragment key={i}>
                    <ChatContent ChatContent={bC} />
                </React.Fragment>
            )
        })
    };

    const onSendMessage = () => {
        
    };

    // const isAdmin = (jamAdmin === userId);
    return (
        <div className="jam-Chat">
            {jamAdmin !== '' ? 
                <div className="jam-Chat-Chat">
                    {messages ? renderChatContent() : <div>LOADING</div>}
                </div>
                :
                <div>LOADING</div>
            }
            
            <div className="jam-Chat-form">
               <MessageForm 
                inputId={"messages"}
                placeholder={'message'}
                buttonText={'send'}
                onSubmit={onSendMessage()}
               />
            </div>
            
        </div>
    );   
};

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamid
    }
}
export default connect(mapStateToProps)(Chat);
