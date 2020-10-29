import React, { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import BoardContent from './BoardContent';


// REAL TIME DATABASE https://www.youtube.com/watch?v=noB98K6A0TY
import './index.scss';

const Board = ({ jamId, userId, userRole }) => {

    const isAdmin = userRole === 'Admin';

    const [boardInfo, setBoardInfo] = useState([]);
   
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

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log('data: ', data);

        
        const date = new Date()

        const messageInfo = {
            messageText: data.message,
            userId: userId,
            jamId: jamId,
            section: 'board',
            createdAt: date,
            messageType: 'message'
        }

        DataService.saveMessage(jamId, 'board', messageInfo)
    };
    
    return (
        <div className="landlord-board-wrapper">
            <div className="landlord-board">
                {renderBoardContent()}
            </div>
            {isAdmin && 
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
        </div>

    );   
};



const mapStateToProps = state => {
    const { jamId } = state.nav;
    const { userId, userName, userRole } = state.userInfo;

    return { jamId, userId, userName, userRole };
};

export default connect(mapStateToProps)(Board);
