import React, { useState, useEffect, useRef } from 'react';
import {useForm} from "react-hook-form";

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import BoardContent from './BoardContent';


// REAL TIME DATABASE https://www.youtube.com/watch?v=noB98K6A0TY
import './index.scss';

const Board = ({ jamId, userId, adminName, adminId, userRole, section }) => {

    const [boardInfo, setBoardInfo] = useState([]);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        // messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        if(boardInfo.length > 0 ) {
            scrollToBottom()
        }
       
    }, [boardInfo]);

    useEffect(() => {
        if(jamId) {
            const unsubscribe = DataService.getBoardInfo(jamId, {
                next: querySnapshot => {
                    const messages = [];
                    const result = querySnapshot.docs.map(docSnapshot => {
                        const j = docSnapshot.data();
                        j.id = docSnapshot.id;
                        messages.push(j);
                    });
                    setBoardInfo(messages)
                },
                error: () => console.log('failure')
            })
            return unsubscribe
        }
    }, [jamId])



    const renderBoardContent = () => {
        return boardInfo.map((bC, i) => {
            return (
                <BoardContent 
                    key={i} 
                    boardContent={bC}
                    ref={messagesEndRef}
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
        DataService.saveBoardMessage(jamId, section, messageInfo);
        document.getElementById("board-message-form").reset();
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
                        autocomplete="off"
                        className="board-form"
                        onSubmit={handleSubmit(onSubmit)}
                        id="board-message-form"
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
    const { adminName, adminId } = state.jamInfo

    return { jamId, userId, userName, userRole, adminName, adminId  };
};

export default connect(mapStateToProps)(Board);
