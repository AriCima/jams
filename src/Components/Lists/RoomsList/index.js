
import React from 'react';

// COMPONENTS
import RoomCard from './RoomCard';
import Calculations from '../../services/Calculations';

// CSS
import './index.scss';

const LandlordRoomsList = ({ rooms }) => {

    const renderRoomsList = () => {
        return rooms.map((jI, i) => {
            return (
                <React.Fragment key={i}>
                    <RoomCard
                        jI={jI}
                        roomNr={ i + 1 }
                    />
                </React.Fragment>
            )
        })
    };

    return (

        <>
            <div className="rooms-list">
                { rooms ? renderRoomsList() : <p>Loading</p>}
            </div>
        </>

    );   
};

export default LandlordRoomsList;