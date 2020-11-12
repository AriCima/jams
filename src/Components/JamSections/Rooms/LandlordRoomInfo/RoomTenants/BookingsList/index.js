
import React from 'react';
import moment from 'moment';

// COMPONENTS
import BookingCard from './BookingCard';

// CSS
import './index.scss';

const BookingsList = ({bookings}) => {

    const bookingsLength = bookings.length;
    const isArray = bookingsLength > 0;

    const renderBookingsList = () => bookings.map((bI, i) => (
        <React.Fragment key={i}>
            <BookingCard
                bI={bI}
            />
        </React.Fragment>
    ));

    const renderBooking = () => (
        <tr>
            <td id="number-column">{bookings.roomNr}</td>
            <td>{bookings.firstName} {bookings.LastName}</td>
            <td>{moment(bookings.checkIn).format('DD MMM YYYY')}</td>
            <td>{moment(bookings.checkOut).format('DD MMM YYYY')}</td>
            <td>{bookings.rent}</td>
            <td>{bookings.deposit}</td>
        </tr>
    );

    return (
        <>
            { bookings
                ? (
                    <table id="bookings-chart">
                        <tr>
                            <th id="number-column">Room Nr</th>
                            <th>Tenant Name</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Rent €</th>
                            <th>Deposit €</th>
                        </tr>
                        { isArray
                            ? renderBookingsList()
                            : renderBooking()}
                    </table>
                )
                : <p>Loading</p>}
        </>

    );
};


export default BookingsList;
