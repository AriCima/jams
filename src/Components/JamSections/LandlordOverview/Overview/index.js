import React from 'react';
import moment from 'moment';

import Calculations from '../../../services/Calculations';

// CSS
import './index.css';

const RoomsOverview = ({ roomsInfo }) => {
    
    const isEmpty = (x) => {
        const empty = Calculations.isEmpty(x);
        return empty;
    };

    const renderRoomsChart = () => roomsInfo.map((room, i) => (
        <div className="rooms-charts-wrapper" key={i}>
            <div className="room-info-line">
                {isEmpty(room.bookings.currentBooking)
                    ? (
                        <div className="vacant-row">
                            <div className="vacant-row-roomName">
                                <div className="vacant-info-block">
                                    <p>{room.roomNr}</p>
                                </div>
                            </div>
                            <div className="room-info-vacant-row">
                                <div className="vacant-sign">
                                    <p>CURRENTLY VACANT</p>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <div className="room-info-block-center">
                                <p>{room.roomNr}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.bookingId}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.jammerName}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{moment(room.bookings.currentBooking.checkIn).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{moment(room.bookings.currentBooking.checkOut).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.rent}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.deposit}</p>
                            </div>
                        </>

                    )}
            </div>
        </div>
    ));

    return (
        <div className="rooms-overview-wrapper">
            <div className="rooms-info-chart">
                <div className="room-info-chart-header">
                    <div className="room-info-chart-header-block">
                        <p>Room Nr</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Type</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Rent €</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Deposit €</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Current State</p>
                    </div>
                </div>
                {roomsBookings.length !== 0 && renderRoomsChart()}
            </div>
        </div>
    );
};

export default RoomsOverview;
