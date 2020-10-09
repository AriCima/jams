/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import isEmpty from 'lodash/isEmpty';

import RoomsList from '../../Lists/RoomsList';
import LandlordRoomInfo from './LandlordRoomInfo';
import RoomsOverview from './RoomsOverview';
// import CheckAvailability from '../../../../../../../Common/CheckAvailability';

// CSS
import './index.scss';
// import { setRoomId } from '../../../redux/actions/roomsId';

const Rooms = ({ jamId, subSection }) => {
    const [jamRoomsInfo, setJamRoomsInfo] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [jamOrderedBookings, setJamOrderedBookings] = useState([]);
    const [showRoomsList, setShowRoomsList] = useState(false);
    const [showRoomInfo, setShowRoomInfo] = useState(false);

    useEffect(() => {
        getJamRoomsInfo(jamId)
    }, [jamId]);

    const getJamRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        setJamRoomsInfo(res);

        const roomsBookings = [];
        for (let i = 0; i < res.length; i++) {
            if (!isEmpty(res[i].bookingsSummary)) {
                const jamOrderedBookings = Calculations.organizeBookings(res[i].bookingsSummary);
                const { roomNr } = res[i];
                const roomId = res[i].id;
                const roomBookingsSummary = { roomNr, roomId, bookings: jamOrderedBookings };
                roomsBookings.push(roomBookingsSummary);
            }
        }
        setJamOrderedBookings(roomsBookings);
        setShowRoomsList(true);
    };

    useEffect(() => {
        if (subSection !== '') {
            getRoomInfo(jamId, subSection);
        }
    }, [subSection]);

    const getRoomInfo = async (jamId) => {
        const res = await DataService.getRoomInfo(jamId, subSection);
        setRoomInfo(res);
        setShowRoomInfo(true);
    };

    const showOverview = subSection === '';
    const bookingsAlreadyOrdered = jamOrderedBookings.length > 0;

    return (
        <div className="landlord-rooms">

            <div className="landlord-rooms-list">
                {showRoomsList ? 
                    (
                        <RoomsList
                            jamId={jamId}
                            jamRoomsInfo={jamRoomsInfo}
                            roomsBookings={jamOrderedBookings}
                        />
                    )
                    : <p>Loading</p>
                }
            </div>

            <div className="landlord-room-info">
                {showOverview ?
                    bookingsAlreadyOrdered ?
                        <RoomsOverview roomsBookings={jamOrderedBookings} />
                        :
                        <p>Loading</p>
                    :
                    showRoomInfo ?
                        <LandlordRoomInfo roomInfo={roomInfo} />
                        :
                        <p>Loading Room Info</p>
                }
            </div>
        </div>
    );
};



const mapStateToProps = (state) => {
    const { jamId, subSection } = state.nav;

    return { jamId, subSection }
    
};
export default connect(mapStateToProps, null)(Rooms);
