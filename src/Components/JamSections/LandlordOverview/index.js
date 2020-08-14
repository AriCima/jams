/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

import Overview from './Overview';
// import CheckAvailability from '../../../../../../../Common/CheckAvailability';

// CSS
import './index.scss';
import { changeRoomId } from '../../../redux/actions/roomsId';
// import { setRoomId } from '../../../redux/actions/roomsId';

const LamndlordOverview = ({ jamId, roomId }) => {

    const [roomsInfo, setRoomsInfo] = useState([]);
    const [bookingsInfo, setBookingsInfo] = useState([]);

    useEffect(() => {
        DataService.getJamRooms(jamId)
        .then((res) => {
            setRoomsInfo(res);
            const roomsLength = res.length;
            if (roomsLength !== 0) {
                const roomsBookings = [];
                for (let i = 0; i < roomsLength; i++) {
                    const noBookings = Calculations.isEmpty(roomsInfo[i].bookingsSummary);
                    if (!noBookings) {
                        const jamOrderedBookings = Calculations.organizeBookings(roomsInfo[i].bookingsSummary);
                        const { roomNr } = roomsInfo[i];
                        const roomId = roomsInfo[i].id;
                        const roomBookingsSummary = { roomNr, roomId, bookings: jamOrderedBookings };
                        roomsBookings.push(roomBookingsSummary);
                    }
                }
                setBookingsInfo(roomsBookings);
            }
        });
    }, [jamId]);

    return (
        <div className="landlord-overview">
           
            <div className="landlord-room-info">

                <Overview
                    rooms={roomsInfo}
                />

            </div>

        </div>

    );
};

const mapDispatchToProps = (dispatch) => ({
    changeRoomId: (roomId) => dispatch(changeRoomId(roomId)),
    // setActiveScreen: (screen) => dispatch( setActiveScreen(screen))
});

const mapStateToProps = (state) => ({
    user: state.firebase.auth,
    roomId: state.roomId,
});
export default connect(mapStateToProps, mapDispatchToProps)(LamndlordOverview);
