
import React, { useState, useEffect, Fragment } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import StudentJammersList from './StudentJammersList';
import StudentJammersContent from './StudentJammersContent';
import ButtonSubmit from '../../UI/Buttons/ButtonSubmit';
import CustomInputField from '../../UI/CustomInputField'


// CSS
import './index.css';

const StudentJammers = ({jamId, jammers, userId}) => {
    
    const [jammersMessages, setJammersMessages] = useState([]);
    const [messageText, setMessageText ] = useState('');
    
    useEffect(() => {

        DataService.getJammersMessages(jamId)
        .then((res) => {
            //console.log('jammers msgs = ', res)
            setJammersMessages(res)
        })
    }, [jamId])
    
    // useEffect(() => {
    //     DataService.getJammers(jamId)
    //     .then((res) => {
    //         console.log('jammers = ', res)
    //         setJammers(res)
    //     })
    //     DataService.getJammersMessages(jamId)
    //     .then((res) => {
    //         //console.log('jammers msgs = ', res)
    //         setJammersMessages(res)
    //     })
    // }, [jamId])


    const renderStudentJammersContent = () => {
        return jammersMessages.map((jM, i) => {
            return (
                <StudentJammersContent 
                    key={i} 
                    jMessages={jM}
                />
            )
        })
    };

    const handleInputChange = (event) => {
        event.persist();
        // setaccInfo(boardMessage.text => ({...boardMessage, [event.target.id]: event.target.value}));
        setMessageText(event.target.value)
    
    }

    const onSubmit = (message) => {
        message.preventDefault();

        const date = new Date()
        console.log(messageText)
        if (messageText === '') {
            alert('the message is empty')
            return
        }

        const messageInfo = {
            messageText: messageText,
            userId: userId,
            jamId: jamId,
            section: 'board',
            createdAt: date,
            messageType: 'message'
        }

        DataService.saveMessage(jamId, 'jammersMessages', messageInfo)
    }

    return (

        <div className="student-jammers-wrapper">

            <div className="student-jammers-chat-wrapper">

                <div className="student-jammers-chat">
                    {renderStudentJammersContent()}
                </div>

                <form
                    autocomplete="off"
                    className="student-jammers-input-form" onSubmit={onSubmit}>
                
                    <div className="student-jammers-input-field">
                            <CustomInputField
                                width='500px'
                                label='input custom test'
                                placeholder='input info'
                                type="text"
                                value={messageText}
                                id='text' 
                                changeControl = {handleInputChange}
                            />
                        </div>

                    <div className="student-jammers-button-area">
                        <ButtonSubmit/>
                    </div>

                </form>
        
            </div>
           
            <div className="student-jammers-list">
                {jammers ? 
                    <StudentJammersList 
                        jamInfo={jamInfo} 
                        jammers={jammers} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

           
        </div>

    );   
};

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        jamActiveSection: state.jamSection,
    }
}

const mapStateToProps = (state) => {
    const { userId } = state.userInfo;
    const { jamId, section, subSection } = state.nav;

    return { userId, jamId, section, subSection, jammers }
    
};
export default connect(mapStateToProps)(StudentJammers);