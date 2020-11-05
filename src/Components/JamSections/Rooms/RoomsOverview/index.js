import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import './index.css';

const RoomsOverview = ({ rooms }) => {

    const renderRoomsChart = () => rooms.map((room, i) => (
        <div className="rooms-charts-wrapper" key={i}>
            <div className="room-info-line">
                {isEmpty(room.currentTenants)
                    ? (
                        <div className="vacant-row">
                            <div className="vacant-row-roomName">
                                <div className="vacant-info-block">
                                    <p>{i + 1}</p>
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
                                <p>{i + 1}</p>
                            </div>
                            {/* <div className="room-info-block">
                                <p>{room.currentTenants.bookingId}</p>
                            </div> */}
                            <div className="room-info-block">
                                <p>{room.bookings.currentTenants.firstName}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{moment(room.bookings.currentTenants.checkIn).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{moment(room.bookings.currentTenants.checkOut).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentTenants.rent}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentTenants.deposit}</p>
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
                        <p>Room Name</p>
                    </div>
                    {/* <div className="room-info-chart-header-block">
                        <p>Booking ID</p>
                    </div> */}
                    <div className="room-info-chart-header-block">
                        <p>Tenant Name</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Check-In</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Check-Out</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Rent €</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Deposit €</p>
                    </div>
                </div>
                {rooms.length !== 0 && renderRoomsChart()}
            </div>
        </div>
    );
};

export default RoomsOverview;
