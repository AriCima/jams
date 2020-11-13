import React from 'react';
import isEmpty from 'lodash/isEmpty';

import BookingsList from './BookingsList';

// CSS
import './index.css';


const RoomTenants = ({ 
    futureTenants,
    formerTenants,
    nextTenant,
    noCurrentTenant
}) => {
    const noFutureTenants = isEmpty(futureTenants);
    const noFormerTenants = isEmpty(formerTenants);
    const noNextTenant = isEmpty(nextTenant);
    
    console.log('formerTenants: ', formerTenants);
    const noRooms = noFutureTenants && noFormerTenants && noNextTenant && noCurrentTenant;

    return (

        <div className="room-bookings-wrapper">

            <div className="room-booking-section">
                <div className="room-section-title">
                    <p>Next Booking</p>
                </div>
                <div className="room-booking-section-content">
                    {!noNextTenant ?
                        <BookingsList bookings={nextTenant} />
                        : <p>There are no future bookings for this room yet</p>}
                </div>
            </div>

            <div className="room-booking-section">
                <div className="room-section-title">
                    <p>Future Bookings</p>
                </div>
                <div className="room-booking-section-content">
                    {!noFutureTenants ?
                        <BookingsList bookings={futureTenants} />
                        : <p>There are no future bookings for this room yet</p>}
                </div>
            </div>

            <div className="room-booking-section">
                <div className="room-section-title">
                    <p>Due contracts</p>
                </div>
                <div className="room-booking-section-content">
                    {!noFormerTenants  ?
                        <BookingsList bookings={formerTenants} />
                        : <p>There are contracts history this room yet</p>
                    }
                </div>
            </div>

        </div>
    );
};

export default RoomTenants;
