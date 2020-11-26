import React from 'react';
import isEmpty from 'lodash/isEmpty';

import BookingsList from './BookingsList';
import TenantsChart from '../../../../Reusables/TenantsChart';

// CSS
import './index.scss';


const RoomTenants = ({ 
    futureTenants,
    formerTenants,
    nextTenant,
    noCurrentTenant,
    jammers
}) => {
    const noFutureTenants = isEmpty(futureTenants);
    const noFormerTenants = isEmpty(formerTenants);
    const noNextTenant = isEmpty(nextTenant);
    
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

            <TenantsChart rooms jammers={jammers}/>


        </div>
    );
};

export default RoomTenants;
