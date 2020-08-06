import React from 'react';
import Calculations from '../../../../../../../../services/Calculations';

import moment from 'moment';

// CSS
import './index.css';

const BoardContent = (props) => {

    const { boardContent } = props;

    const messageTime = Calculations.getMessageDate(boardContent.createdAt)

    return (

        <div className="board-content-item">

            <div className="board-message-info">
                
                <div className="board-message-sender">
                    <h6>Ariel</h6>
                </div>

                <div className="board-message-time">
                    <p>{messageTime}</p>
                </div>

            </div>

            <div className="board-message">
                <p>{boardContent.messageText}</p>
            </div>

        </div>

    );   
};
export default BoardContent;
