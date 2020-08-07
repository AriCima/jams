import React from 'react';

// import DataService from "../../../../../../../../../services/DataService";

import { connect } from 'react-redux';
import { changeRoomId } from '../../../../../redux/actions/roomsId';
// import {setActiveScreen} from "../../../../../../redux/actions/roomScreen"

// CSS
import './index.scss';

const LandlordRoomCard = ({ changeRoomId, rI, roomId }) => {

    const onShowRoomInfo = (roomId) => {
    // props.setActiveScreen('roomInfo');
        changeRoomId(roomId);
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

const mapDispatchToProps = (dispatch) => ({
    // nombre de la función que paso como prop: (arg) =>
    // dispatch(nombre del action creator(argumento))
    changeRoomId: (roomId) => dispatch(changeRoomId(roomId)),
    // setActiveScreen: (roomInfo) => dispatch(setActiveScreen(roomInfo))
});


const mapStateToProps = (state) => ({
    user: state.firebase.auth,
    jamId: state.jamId,
    userJams: state.userJams,
    roomId: state.roomId,
});
export default connect(mapStateToProps, mapDispatchToProps)(LandlordRoomCard);
