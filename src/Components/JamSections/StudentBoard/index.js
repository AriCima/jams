import React, { useState, useEffect } from 'react';
import moment from 'moment';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import StudentBoardContent from './StudentBoardContent';

// CSS
import './index.css';

const StudentBoard = (props) => {

    const { jamId, jamActiveSection, jamInfo } = props;
    const userId = props.auth.uid;
    const jamAdmin = jamInfo.adminId;
    const [sectionInfo, setSectionInfo] = useState([]);
    const [messageText, setMessageText ] = useState([]);
   
    useEffect(() => {
        DataService.getJamSectionInfo(jamId, 'board')
        .then((res) => {
            setSectionInfo(res)
        })
    }, [jamId])

    const renderStudentBoardContent = () => {
        //console.log('sectionInfo = ', sectionInfo)
        return sectionInfo.map((bC, i) => {
            //console.log('bC = ', bC)
            return (
                <StudentBoardContent 
                    key={i} 
                    boardContent={bC}
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
        const date = new Date()
        const messageInfo = {
            messageText: message,
            userId: userId,
            jamId: jamId,
            section: 'board',
            createdAt: date,
            messageType: 'post'
        }
        DataService.saveMessage(jamId, 'board', messageInfo)
    }
    
    return (
        <div className="student-board-wrapper">

            <div className="student-board">
                {renderStudentBoardContent()}
            </div>
            
            {/* <form className="student-board-input-form" onSubmit={onSubmit}>
                <div className="student-board-input-field">
                    <CustomInputField
                        width='500px'
                        label='input custom test'
                        placeholder='input info'
                        type="text"
                        value={messageText}
                        id='text' 
                        onChange = {handleInputChange}
                    />
                </div>

            <div className="student-board-button-area">
                <ButtonSubmit/>
            </div>

            </form> */}
        </div>

    );   
};



const mapStateToProps = (state) => {
    //console.log('state en el jamNavBar = ', state)
    return {
        auth: state.firebase.auth,
        jamId: state.jamId,
        jamActiveSection: state.jamSection,
    }
}
export default connect(mapStateToProps)(StudentBoard);
