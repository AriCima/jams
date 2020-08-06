import React from 'react';

// CSS
import './index.css';

const RoomInfo = ({ roomInfo }) => {
    console.log('roomInfo en RoomInfo: ', roomInfo);

    return (
        <div className="room-section-wrapper">
            <div className="room-section-title">
                <p>Room Info</p>
                <div className="separator-line" />
            </div>

            <div className="room-info-content">
                <div className="room-info-block">
                    <p>
                        Room Name:
                        {' '}
                        <span>{roomInfo.roomNr}</span>
                    </p>
                </div>
                <div className="room-info-block">
                    <p>
                        Room size:
                        {' '}
                        <span>{roomInfo.sqm}</span>
                        {' '}
                        sqm
                    </p>
                </div>
                <div className="room-info-block">
                    <p>
                        Exterior:
                        {' '}
                        <span>{roomInfo.exterior ? 'Yes' : 'No'}</span>
                    </p>
                </div>
                <div className="room-info-block">
                    <p>
Balcony:
                        {' '}
                        <span>{roomInfo.ebalcony ? 'Yes' : 'No'}</span>
                    </p>
                </div>
                <div className="room-info-block">
                    <p>
Private Bathroom:
                        {' '}
                        <span>{roomInfo.privateBathroom}</span>
                    </p>
                </div>
            </div>
        </div>


    );
};

export default RoomInfo;
