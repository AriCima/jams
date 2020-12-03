
import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

// COMPONENTS
import BookingCard from './BookingCard';
import { setDocType, setDocId, setEditable } from "../../../../redux/actions/docsActions";
import { setSection } from '../../../../redux/actions/navigateActions';


// CSS
import './index.scss';

const BookingsList = ({
        bookings,
        setDocType,
        setSection,
        setDocId,
        setEditable
    }) => {

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
        <tr
            onClick={(e) => takeMeToTenantInfo(e, bookings.userId)}
        >
            <td id="number-column">{bookings.roomNr}</td>
            <td>{bookings.firstName} {bookings.LastName}</td>
            <td>{moment(bookings.checkIn).format('DD MMM YYYY')}</td>
            <td>{moment(bookings.checkOut).format('DD MMM YYYY')}</td>
            <td>{bookings.rent}</td>
            <td>{bookings.deposit}</td>
        </tr>
    );

    const takeMeToTenantInfo = (e, userId) => {
        e.preventDefault();
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(userId); // tenant's userId
        setEditable('true');
    };

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


const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId } = state.userInfo;
    const { jamDetails } = state.jamInfo

    return { jamId, jamDetails, userId };
};
export default connect(mapStateToProps, { setDocType, setSection, setDocId, setEditable })(BookingsList);
