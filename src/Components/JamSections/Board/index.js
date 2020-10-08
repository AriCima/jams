import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import BoardContent from './BoardContent';
import ButtonSubmit from '../../UI/Buttons/ButtonSubmit';
import CustomTextArea from '../../UI/CustomTextArea';


// REAL TIME DATABASE https://www.youtube.com/watch?v=noB98K6A0TY
import './index.scss';

const Board = ({ jamId, userName, userId, userRole }) => {

    const isAdmin = userRole === 'Admin';

    const [boardInfo, setBoardInfo] = useState([]);
    const [messageText, setMessageText ] = useState('');
   
    useEffect(() => {
        jamId && getBoardContent(jamId)
    }, [jamId])


    const getBoardContent = async (jamId) => {
        const res = await DataService.getBoardInfo(jamId, 'board');
        setBoardInfo(res);
    }

    const renderBoardContent = () => {
        return boardInfo.map((bC, i) => {
            return (
                <BoardContent 
                    key={i} 
                    boardContent={bC}
                />
            )
        })
    };

    const handleInputChange = (event) => {
        event.persist();
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

    const renderBoard = () => {
        return (
            <>
                
                <div className="landlord-board">
                    {renderBoardContent()}
                </div>
                {isAdmin && 
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
                }
            </>
        )
        
    }
    
    return (
        <div className="landlord-board-wrapper">
            {renderBoard()}
        </div>

    );   
};



const mapStateToProps = state => {
    const { jamId } = state.nav;
    const { userId, userName, userRole } = state.userInfo;

    return { jamId, userId, userName, userRole };
};

export default connect(mapStateToProps)(Board);
