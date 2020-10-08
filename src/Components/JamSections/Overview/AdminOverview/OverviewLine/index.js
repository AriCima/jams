import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import { setSection, setSubSection } from '../../../../../redux/actions/navigateActions';
import './index.scss';

const OverviewLine = ({ room }) => {

    const vacantRoom = isEmpty(room.bookings.currentBooking);
    const bookInfo = room.bookings.currentBooking;
    const roomId = room.roomId;

    const handleClick = (e, roomId) => {
        console.log('CLICK :', roomId)
        setSection('Rooms');
        setSubSection(roomId)
    };

    return (
        <div className="overview-info-line"
            onCLick={e => handleClick(e, roomId)}
        >
            <div className="overview-info-block">
                <p>{room.roomNr}</p>
            </div>
            <div className="overview-info-block">
                <p>{room.roomType}</p>
            </div>
            <div className="overview-info-block">
                {vacantRoom ?  <span>vacant</span>: <p>{bookInfo.jammerName}</p>}
            </div>
            <div className="overview-info-block">
                {vacantRoom ? <p>-</p> : <p>{bookInfo.deposit}</p>}
            </div>
            <div className="overview-info-block">
                {vacantRoom ? <p>-</p> : <p>{bookInfo.rent}</p>}
            </div>
        </div>
    )
};

export default OverviewLine;
