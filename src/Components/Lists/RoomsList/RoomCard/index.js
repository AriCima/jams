import React from 'react';

import { connect } from 'react-redux';
import { setSubSection } from '../../../../redux/actions/navigateActions';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

const LandlordRoomCard = ({ jI, roomId, roomNr, setSubSection }) => {

    const onShowRoomInfo = (roomNr) => {
        setSubSection(roomNr)
    };
    
    const isVacant = isEmpty(jI.currentTenants);
    
    return (
        <div
            className={`landlord-room-card-container ${roomId === jI.roomId && 'roomActive'}`}
            onClick={() => onShowRoomInfo(roomNr)}
        >
            <div className="landlord-room-card-roomNr">
                <p>{roomNr}</p>
            </div>

            {isVacant ? (
                <div className="landlord-room-card-info">
                    <p>currently vacant</p>
                </div>
            ) : (
                <div className="landlord-room-card-info">
                    <div className="landlord-room-card-upperline">
                        <p>{jI.currentTenants.firstName}</p>
                    </div>
                    <div className="landlord-room-card-lowerline">
                        <p>{jI.currentTenants.jammerCountry}</p>
                    </div>
                </div>

            )}
            {/* <div className="landlord-room-card-info">
                <div className="landlord-room-card-upperline">
                    {rI.bookings.currentBooking.jammerName
                        ? <p>{rI.bookings.currentBooking.jammerName}</p>
                        : <p>Vacant</p>}
                </div>
                <div className="landlord-room-card-lowerline">
                    <p>{rI.bookings.currentBooking.jammerCountry}</p>
                </div>
            </div> */}
        </div>
    );
};

export default connect(null, { setSubSection })(LandlordRoomCard);
