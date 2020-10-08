
import React from 'react';

// COMPONENTS
import RoomCard from './RoomCard';
import Calculations from '../../services/Calculations';

// CSS
import './index.scss';

const LandlordRoomsList = ({ roomsBookings }) => {
    const orderedRooms = Calculations.sortAscRooms(roomsBookings)
    const renderRoomsList = () => {
        return orderedRooms.map((rI, i) => {
            return (
                <React.Fragment key={i}>
                    <RoomCard
                        rI={rI} 
                    />
                </React.Fragment>
            )
        })
    };

    return (

        <>
            <div className="rooms-list">
                { roomsBookings ? renderRoomsList() : <p>Loading</p>}
            </div>
        </>

    );   
};

export default LandlordRoomsList;