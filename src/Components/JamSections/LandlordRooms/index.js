/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

import LandlordRoomsList from './LandlordRoomsList';
import LandlordRoomInfo from './LandlordRoomInfo';
import RoomsOverview from './RoomsOverview';
// import CheckAvailability from '../../../../../../../Common/CheckAvailability';

// CSS
import './index.scss';
import { changeRoomId } from '../../../redux/actions/roomsId';
// import { setRoomId } from '../../../redux/actions/roomsId';

const LandlordRooms = ({ jamId, roomId, subSection }) => {
    console.log('subSection: ', subSection);
    const [roomInfo, setRoomInfo] = useState({});
    const [showRoomInfo, setShowRoomInfo] = useState(false);
    const [jamRoomsInfo, setJamRoomsInfo] = useState([]);
    const [jamOrderedBookings, setJamOrderedBookings] = useState([]);

    useEffect(() => {
        getJamRoomsInfo(jamId)
    }, [jamId]);

    const getJamRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        console.log('res: ', res);
        setJamRoomsInfo(res);
    }



    useEffect(() => {
        if (subSection !== '') {
            // DataService.getRoomBookings(jamId, roomId)
            // .then((res) => {
            //     setRoomBookings(res)
            // })
            getRoomInfo(jamId, subSection)
            // DataService.getRoomInfo(jamId, subSection)
            //     .then((res) => {
            //         setRoomInfo(res);
            //         setShowRoomInfo(true);
            //     });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subSection]);

    const getRoomInfo = async (jamId) => {
        const res = await DataService.getRoomInfo(jamId, subSection);
        console.log('res: ', res);
        setRoomInfo(res);
    };

    useEffect(() => {
        if (subSection === '') {
            if (showRoomsList) {
                const roomsBookings = [];
                console.log('jamRoomsInfo[i]: ', jamRoomsInfo);

                for (let i = 0; i < jamRoomsInfo.length; i++) {
                    if (!Calculations.isEmpty(jamRoomsInfo[i].bookingsSummary)) {
                        const jamOrderedBookings = Calculations.organizeBookings(jamRoomsInfo[i].bookingsSummary);
                        const { roomNr } = jamRoomsInfo[i];
                        const roomId = jamRoomsInfo[i].id;
                        const roomBookingsSummary = { roomNr, roomId, bookings: jamOrderedBookings };
                        roomsBookings.push(roomBookingsSummary);
                    }
                }
                setJamOrderedBookings(roomsBookings);
            }
        }
    }, [jamRoomsInfo]);

    const showOverview = subSection === '';
    const showRoomsList = jamRoomsInfo.length !== 0;
    const bookingsAlreadyOrdered = jamOrderedBookings.length !== 0;

    return (
        <div className="landlord-rooms">

            <div className="landlord-rooms-list">
                {showRoomsList ? 
                    (
                        <LandlordRoomsList
                            jamId={jamId}
                            jamRoomsInfo={jamRoomsInfo}
                            roomsBookings={jamOrderedBookings}
                        />
                    )
                    : <p>Loading</p>}
            </div>

            <div className="landlord-room-info">
                {showOverview ?
                    bookingsAlreadyOrdered ?
                        <RoomsOverview roomsBookings={jamOrderedBookings} />
                        :
                        <p>Loading</p>
                    :
                    <LandlordRoomInfo roomInfo={roomInfo} />
                }
            </div>
           


        </div>

    );
};

const mapDispatchToProps = (dispatch) => ({
    changeRoomId: (roomId) => dispatch(changeRoomId(roomId)),
    // setActiveScreen: (screen) => dispatch( setActiveScreen(screen))
});

const mapStateToProps = (state) => {
    const { subSection } = state.nav;
    return { subSection }
    
};
export default connect(mapStateToProps, mapDispatchToProps)(LandlordRooms);
