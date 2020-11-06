
import React from 'react';
import moment from 'moment';

// COMPONENTS
import BookingCard from './BookingCard';

// CSS
import './index.css';

const BookingsList = (props) => {
    const { bookings } = props;
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
        <div className="booking-chart-row">
            <div className="booking-chart-row-block">
                <p>{bookings.bookingId}</p>
            </div>
            {/* <div className="booking-chart-row-block">
                    <p>{bookings.bookingCode}</p>
                </div> */}
            <div className="booking-chart-row-block">
                <p>
                    {bookings.jammerName}
                    {' '}
                    {bookings.jammerSurname}
                </p>
            </div>
            <div className="booking-chart-row-block">
                <p>{moment(bookings.checkIn).format('DD MMM YYYY')}</p>
            </div>
            <div className="booking-chart-row-block">
                <p>{moment(bookings.checkOut).format('DD MMM YYYY')}</p>
            </div>
            <div className="booking-chart-row-block">
                <p>{bookings.rent}</p>
            </div>
            <div className="booking-chart-row-block">
                <p>{bookings.deposit}</p>
            </div>
        </div>
    );
    return (
        <>
            { bookings
                ? (
                    <div className="bookings-chart">
                        <div className="booking-chart-header">
                            {/* <div className="booking-chart-block">
                            <p>Room</p>
                        </div> */}
                            <div className="booking-chart-block">
                                <p>ID</p>
                            </div>
                            <div className="booking-chart-block">
                                <p>Tenant</p>
                            </div>
                            <div className="booking-chart-block">
                                <p>Check-In</p>
                            </div>
                            <div className="booking-chart-block">
                                <p>Check-Out</p>
                            </div>
                            <div className="booking-chart-block">
                                <p>Rent €</p>
                            </div>
                            <div className="booking-chart-block">
                                <p>Deposit €</p>
                            </div>
                        </div>
                        { isArray
                            ? renderBookingsList()
                            : renderBooking()}
                    </div>
                )
                : <p>Loading</p>}
        </>

    );
};


export default BookingsList;
