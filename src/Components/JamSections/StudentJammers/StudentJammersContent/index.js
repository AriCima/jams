import React from 'react';

import Calculations from '../../../services/Calculations';
// import moment from 'moment';

// CSS
import './index.css';

const StudentJammersContent = (props) => {

    const { jMessages } = props;
    const messageTime = Calculations.getMessageDate(jMessages.createdAt)

    return (

        <div className="student-jammers-content-item">

            <div className="student-jammers-message-info">
                
                <div className="student-jammers-message-sender">
                    <h6>Ariel</h6>
                </div>

                <div className="student-jammers-message-time">
                    <p>{messageTime}</p>
                </div>

            </div>

            <div className="student-jammers-message">
                <p>{jMessages.messageText}</p>
            </div>

        </div>

    );   
};
export default StudentJammersContent;
