import React from 'react';

// CSS
import './index.css';

const BoardContent = (props) => {

    const { boardContent } = props
    //console.log('boardContent = ', boardContent)
    return (

        <div className="board-content-item">
        { boardContent.messageType === 'message' &&
            <div className="board-message">
                <p>User ID: {boardContent.userId}</p>
            </div>
        }
        { boardContent.messageType === 'post' &&
            <div className="board-post">
               <div className="board-post-image">
                    <h4>user Id: {boardContent.userId}</h4>
               </div>
               <div className="board-post-text">
                    <p>{boardContent.messageContent}</p>
               </div>
            </div>
        }
    </div>

    );   
};



export default BoardContent;
