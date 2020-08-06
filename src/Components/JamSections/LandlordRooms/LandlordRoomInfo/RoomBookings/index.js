import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';
import BookingsList from './BookingsList';
import BookingCard from './BookingsList/BookingCard';
// CSS
import './index.css';


const RoomBookings = ({ orderedBookings }) => {

    const existsDueContracts = orderedBookings.dueBookings.length;
    // console.log('existsDueContracts: ', existsDueContracts);
    const existsNextBooking = Calculations.isEmpty(orderedBookings.nextBooking);
    // console.log('existsNextBooking: ', existsNextBooking);
    const existsFutureBookings = orderedBookings.futureBookings.length;
    // console.log('existsFutureBookings: ', existsFutureBookings);

    return (
        <>
            {!Object.keys(orderedBookings).length
                ? <h1>no rooms</h1>
                : (
                    <div className="room-bookings-wrapper">

                        <div className="room-booking-section">
                            <div className="room-section-title">
                                <p>Next Booking</p>
                            </div>
                            <div className="room-booking-section-content">
                                {!existsNextBooking ?
                                    <BookingsList bookings={orderedBookings.nextBooking} />
                                    : <p>There are no future bookings for this room yet</p>}
                            </div>
                        </div>

                        <div className="room-booking-section">
                            <div className="room-section-title">
                                <p>Future Bookings</p>
                            </div>
                            <div className="room-booking-section-content">
                                {existsFutureBookings > 1 ?
                                    <BookingsList bookings={orderedBookings.futureBookings} />
                                    : <p>There are no future bookings for this room yet</p>}
                            </div>
                        </div>

                        <div className="room-booking-section">
                            <div className="room-section-title">
                                <p>Due contracts</p>
                            </div>
                            {existsDueContracts >= 1 ?
                                <BookingsList bookings={orderedBookings.dueBookings} />
                                : <p>There are contracts history this room yet</p>}
                        </div>

                    </div>
                )}

        </>

    );
};

export default RoomBookings;
