import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import './index.scss';
import { setSection, setSubSection } from '../../../../redux/actions/navigateActions';

const RoomsOverview = ({ roomsFullInfo }) => {
    
    const showOverviewChart = !isEmpty(roomsFullInfo);

    const handleClick = (section, subSection) => {
        console.log('CLICK :', section, ' / ', subSection)
        setSection(section);
        setSubSection(subSection)
    };

    const renderRoomsChart = () => roomsFullInfo.map((room, i) => (
        <div className="overview-charts-wrapper" key={i}>
            <div className="overview-info-line" 
                onCLick={() => handleClick('Rooms', room.roomId)}
            >
                {isEmpty(room.bookings.currentBooking)
                    ? (
                        <div className="vacant-row">
                            <div className="vacant-row-roomName">
                                <div className="vacant-info-block">
                                    <p>{room.roomNr}</p>
                                </div>
                            </div>
                            <div className="overview-info-vacant-row">
                                <p>Vacant</p>
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <div className="overview-info-block-center">
                                <p>{room.roomNr}</p>
                            </div>
                            <div className="overview-info-block">
                                <p>{room.bookings.currentBooking.bookingId}</p>
                            </div>
                            <div className="overview-info-block">
                                <p>{room.bookings.currentBooking.jammerName}</p>
                            </div>
                            <div className="overview-info-block">
                                <p>{moment(room.bookings.currentBooking.checkIn).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="overview-info-block">
                                <p>{moment(room.bookings.currentBooking.checkOut).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="overview-info-block">
                                <p>{room.bookings.currentBooking.rent}</p>
                            </div>
                            <div className="overview-info-block">
                                <p>{room.bookings.currentBooking.deposit}</p>
                            </div>
                        </>

                    )}
            </div>
        </div>
    ));

    return (
        <div className="overview-wrapper">
            <div className="overview-info-chart">
                <div className="overview-info-chart-header">
                    <div className="overview-info-chart-header-block">
                        <p>Room Nr</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Type</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Rent €</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Deposit €</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Current State</p>
                    </div>
                </div>
                {showOverviewChart ? renderRoomsChart() : <p>Loading</p>}
            </div>
        </div>
    );
};

export default RoomsOverview;
