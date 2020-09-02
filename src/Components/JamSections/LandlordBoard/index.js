import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import LandlordBoardContent from './LandlordBoardContent';
import ButtonSubmit from '../../UI/Buttons/ButtonSubmit';
import CustomTextArea from '../../UI/CustomTextArea';


// REAL TIME DATABASE https://www.youtube.com/watch?v=noB98K6A0TY
import './index.scss';

const LandlordBoard = ({ jamId, auth}) => {

    const userId = auth.uid;

    const [boardInfo, setBoardInfo] = useState([]);
    const [messageText, setMessageText ] = useState('');
   
    useEffect(() => {
        jamId && getBoardContent(jamId)
    }, [jamId])


    const getBoardContent = async (jamId) => {
        const res = await DataService.getBoardInfo(jamId, 'board');
        setBoardInfo(res);
    }
    const renderLandlordBoardContent = () => {
        return boardInfo.map((bC, i) => {
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
                        placeholder='Type your message . . .'
                        type="text"
                        id='inputTest'
                        changeControl={handleInputChange}
                    />
                </div>

                <div className="landlord-board-button-area">
                <ButtonSubmit
                    text='Send Message'
                    clickHandle={onSubmit}
                />
                </div>

            </form>
        
        </div>

    );   
};



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        // jamId: state.jamId,
        // jamActiveSection: state.jamSection,
    }
}
export default connect(mapStateToProps)(LandlordBoard);
