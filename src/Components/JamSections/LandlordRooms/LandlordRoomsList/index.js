
import React from 'react';

// COMPONENTS
import LandlordRoomCard from './LandlordRoomCard';
import ButtonPlain from '../../../UI/ButtonPlain';
import ModalNewRoom from '../../../UI/ModalNewRoom';
import Calculations from '../../../services/Calculations'

// CSS
import './index.scss';

const LandlordRoomsList = ({ jamId, roomsBookings }) => {

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

    // const onNewRoom = () => {
    //     const roomId = 'newRoomForm'
    //     // setActiveScreen(roomId)
    //     changeRoomId(roomId)
    // };

    return (

        <>
            <div className="rooms-list">
                { roomsBookings ? renderRoomsList() : <p>Loading</p>}
            </div>
            {/* <div className="rooms-list-addRoom-area">
                <ModalNewRoom 
                    jamId={jamId}
                />
            </div> */}
        </>

    );   
};

export default LandlordRoomsList;