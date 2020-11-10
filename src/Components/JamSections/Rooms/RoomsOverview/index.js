import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import DataService from '../../../services/DataService';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {setSubSection } from '../../../../redux/actions/navigateActions';
import './index.css';

const RoomsOverview = ({ rooms, setSubSection }) => {
    
    const showRoomInfo = (roomNr) => {
        console.log('roomNr: ', roomNr);
        setSubSection(roomNr)
    };

    const renderRoomsChart = () => rooms.map((room, i) => {
        const currentTenant = room.currentTenants[0];
        const roomNr =i+1;
        const stringNr = roomNr.toString();
        return(
            <div className="rooms-charts-wrapper" key={i}>
                <div className="room-info-line"
                    onClick={() => {
                        showRoomInfo(i)
                    }}
                >
                    {isEmpty(currentTenant)
                        ? (
                            <div className="vacant-row">
                                <div className="vacant-row-roomName">
                                    <div className="vacant-info-block">
                                        <p>{stringNr}</p>
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
                                    <p>{stringNr}</p>
                                </div>
                                <div className="room-info-block">
                                    <p>{currentTenant.firstName} {currentTenant.lastName}</p>
                                </div>
                                <div className="room-info-block">
                                    {/* <p>{currentTenant.checkIn}</p> */}

                                    <p>{moment(currentTenant.checkIn).format('DD-MMM-YYYY')}</p>
                                </div>
                                <div className="room-info-block">
                                    {/* <p>{currentTenant.checkOut}</p> */}

                                    <p>{moment(currentTenant.checkOut).format('DD-MMM-YYYY')}</p>
                                </div>
                                <div className="room-info-block">
                                    <p>{currentTenant.rent}</p>
                                </div>
                                <div className="room-info-block">
                                    <p>{currentTenant.deposit}</p>
                                </div>
                            </>
    
                        )}
                </div>
            </div>
        )

    }
    );

    return (
        <div className="rooms-overview-wrapper">
            <div className="rooms-info-chart">
                <div className="room-info-chart-header">
                    <div className="room-info-chart-header-block">
                        <p>Room Name</p>
                    </div>
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
const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    return { jamId }
    
};
export default connect(mapStateToProps, { setSubSection })(RoomsOverview);