
import React from 'react';

// COMPONENTS
import LandlordRoomCard from './LandlordRoomCard';
import ButtonPlain from '../../../UI/ButtonPlain';
import ModalNewRoom from '../../../UI/ModalNewRoom';
import Calculations from '../../../services/Calculations'

// CSS
import './index.scss';

const LandlordRoomsList = ({ roomsBookings }) => {
    const orderedRooms = Calculations.sortAscRooms(roomsBookings)
    const renderRoomsList = () => {
        return orderedRooms.map((rI, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordRoomCard
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