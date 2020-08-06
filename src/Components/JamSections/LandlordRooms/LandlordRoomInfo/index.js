import React from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import ButtonPlain from '../../../../../../../../UI/ButtonPlain';
import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import BookingsGraphic from '../../../../../../../../Bookings/BkgsGraphic';
import Calculations from '../../../../../../../../services/Calculations';
import PrebBookingForm from '../../../../../../../../UI/Forms/StudentsFlat/PreBookingForm';

// CSS
import './index.css';

const LandlordRoomInfo = ({ roomInfo, jamId, roomId }) => {
    console.log('roomInfo: ', roomInfo);
    const orderedBookings = Calculations.organizeBookings(roomInfo.bookingsSummary);
    const noNextBooking = Calculations.isEmpty(orderedBookings.nextBooking);
    const noCurrentTenant = Calculations.isEmpty(orderedBookings.currentBooking);

    const { bookingsSummary } = roomInfo;

    const onNewInvitation = (roomId) => {
        alert('NEW INVITATION');
    };

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
                            <PrebBookingForm
                                jamId={jamId}
                                roomId={roomId}
                                roomNr={roomInfo.roomNr}
                                bookingsSummary={bookingsSummary}
                            />
                        </div>
                        <div className="room-button-block">
                            <ButtonPlain
                                type="button"
                                text="Invite"
                                clickHandle={onNewInvitation}
                            />
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

const mapStateToProps = state => ({
    jamId: state.jamId,
    roomId: state.roomId,
});

export default connect(mapStateToProps)(LandlordRoomInfo);
// export default LandlordRoomInfo;
