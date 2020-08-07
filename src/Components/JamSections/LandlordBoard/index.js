import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import LandlordBoardContent from './LandlordBoardContent';
import ButtonSubmit from '../../UI/ButtonSubmit';
import CustomInputField from '../../UI/CustomInputField'
import CustomTextArea from '../../UI/CustomTextArea';


// CSS
import './index.scss';

const LandlordBoard = (props) => {

    const { jamId } = props;
    const userId = props.auth.uid;

    const [sectionInfo, setSectionInfo] = useState([]);
    const [messageText, setMessageText ] = useState('');
   
    useEffect(() => {
        DataService.getBoardInfo(jamId, 'board')
        .then((res) => {
            setSectionInfo(res)
        })
    }, [jamId])

    const renderLandlordBoardContent = () => {
        return sectionInfo.map((bC, i) => {
            return (
                <LandlordBoardContent 
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
        message.preventDefault();
        const date = new Date()
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

        DataService.saveMessage(jamId, 'board', messageInfo)
    }
    
    return (
        <div className="landlord-board-wrapper">

            <div className="landlord-board">
                {renderLandlordBoardContent()}
            </div>
            
            <form className="landlord-board-input-form" onSubmit={onSubmit}>
               
               <div className="landlord-board-input-field">
                    <CustomTextArea
                        width='100%'
                        cols=''
                        rows='3'
                        placeholder='Type your message ...'
                        type="text"
                        id='inputTest'
                        changeControl={handleInputChange}
                    />
                </div>

                <div className="landlord-board-button-area">
                    <ButtonSubmit/>
                </div>

            </form>
        
        </div>

    );   
};



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        jamId: state.jamId,
        // jamActiveSection: state.jamSection,
    }
}
export default connect(mapStateToProps)(LandlordBoard);
