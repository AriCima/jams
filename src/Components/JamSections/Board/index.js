import React, { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import BoardContent from './BoardContent';


// REAL TIME DATABASE https://www.youtube.com/watch?v=noB98K6A0TY
import './index.scss';

const Board = ({ jamId, userId, adminName, userRole, section }) => {

    const [boardInfo, setBoardInfo] = useState([]);
   
    useEffect(() => {
        jamId && getBoardContent(jamId)
    }, [jamId])


    const getBoardContent = async (jamId) => {
        const res = await DataService.getBoardInfo(jamId, section);
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

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {        
        const date = new Date()

        const messageInfo = {
            messageText: data.message,
            userId: userId,
            adminName: adminName,
            jamId: jamId,
            section: section,
            createdAt: date,
            messageType: 'message'
        }

        DataService.saveMessage(jamId, section, messageInfo)
    };

    const showSenMessageForm = userRole === 'Admin' || section === 'Flatmates'
    
    return (
        <div className="landlord-board-wrapper">
            <div className="landlord-board">
                {renderBoardContent()}
            </div>
            {showSenMessageForm && 
                <div className="landlord-board-form">
                    <form
                        className="board-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <textarea
                            rows="1"
                            name="message"
                            ref={register({
                                required: true,
                            })}
                        />
                        <div className="board-buttonArea">
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </div>
            }
            {section === 'Flatmates' && (
                <div className="flatmates-board-message">
                    <p>Send messages to all your flatmates</p>
                </div>
            )}
        </div>

    );   
};



const mapStateToProps = state => {
    const { jamId } = state.nav;
    const { userId, userName, userRole } = state.userInfo;
    const { adminName } = state.jamInfo

    return { jamId, userId, userName, userRole, adminName  };
};

export default connect(mapStateToProps)(Board);
