import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import BookingsGraphic from '../../../Bookings/BkgsGraphic';
import Calculations from '../../../services/Calculations';

// CSS
import './index.css';

const LandlordRoomInfo = ({ roomInfo }) => {


    const orderedBookings = Calculations.organizeBookings(roomInfo.bookingsSummary);
    const noNextBooking = isEmpty(orderedBookings.nextBooking);
    const noCurrentTenant = isEmpty(orderedBookings.currentBooking);

    const { bookingsSummary } = roomInfo;

    // const onNewInvitation = (roomId) => {
    //     alert('NEW INVITATION');
    // };

    return (
        <div className="room-info-wrapper">
            <div className="room-sections-wrapper">

                <div className="room-header">
                    <div className="room-header-title">
                        <h4>
                            Room Nr
                            {' '}
                            {roomInfo.roomNr}
                        </h4>
                    </div>

                    <div className="room-buttons-area">
                        <div className="room-button-block">
                            <p>Acá estaba el preBooking Form</p>
                        </div>
                        <div className="room-button-block">
                            
                        </div>
                    </div>
                </div>

                <div className="bookings-graphic">
                    <BookingsGraphic bookingsSummary={bookingsSummary} />

                </div>

                { !noCurrentTenant ? (
                    <div className="room-section">
                        <CurrentTenant orderedBookings={orderedBookings} />
                    </div>
                )
                    : (
                        <div className="room-section">
                            {!noNextBooking
                                ? (
                                    <div className="no-current-tenant-line">
                                        <p>
                                            Vacant until
                                            {' '}
                                            <span>{moment(orderedBookings.nextBooking.checkIn).format('DD MMM YYYY')}</span>
                                        </p>
                                    </div>
                                )
                                : (
                                    <div className="no-current-tenant-line">
                                        <p>
                                          This room is currently
                                            {' '}
                                            <span>VACANT</span>
                                        </p>
                                    </div>
                                )}
                        </div>
                    )}

                <div className="room-section">
                    <RoomBookings orderedBookings={orderedBookings} />
                </div>

            </div>

        </div>
    );
};

export default LandlordRoomInfo;
