import React from 'react';

import { connect } from 'react-redux';
import { setSubSection } from '../../../../redux/actions/navigateActions';

import './index.scss';

const LandlordRoomCard = ({ rI, roomId, setSubSection }) => {

    const onShowRoomInfo = (roomId) => {
        setSubSection(roomId)
    };
    
    const isVacant = rI.bookings.currentBooking.jammerName === undefined;
    
    return (
        <div
            className={`landlord-room-card-container ${roomId === rI.roomId && 'roomActive'}`}
            onClick={() => onShowRoomInfo(rI.roomId)}
        >
            <div className="landlord-room-card-roomNr">
                <p>{rI.roomNr}</p>
            </div>

            {isVacant ? (
                <div className="landlord-room-card-info">
                    <p>currently vacant</p>
                </div>
            ) : (
                <div className="landlord-room-card-info">
                    <div className="landlord-room-card-upperline">
                        <p>{rI.bookings.currentBooking.jammerName}</p>
                    </div>
                    <div className="landlord-room-card-lowerline">
                        <p>{rI.bookings.currentBooking.jammerCountry}</p>
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
