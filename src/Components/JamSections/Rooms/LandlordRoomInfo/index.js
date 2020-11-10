import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

import CurrentTenant from './CurrentTenant';
import RoomTenants from './RoomTenants';
import BookingsGraphic from '../../../Bookings/BkgsGraphic';


// CSS
import './index.css';

const LandlordRoomInfo = ({ roomJammers, roomInfo, roomNr}) => {

    const currentTenant = roomJammers.currentTenants;
    const futureTenants = roomJammers.futureTenants;
    const formerTenants = roomJammers.formerTenants;
    const nextTenant = roomJammers.futureTenants[0];

    const noNextTenant = undefined;
    const noCurrentTenant = isEmpty(currentTenant);
    const noFormerTenants = isEmpty(formerTenants);
    
    let tenantsList = currentTenant
    console.log('tenantsList: ', tenantsList);

    for (let i = 0; i < futureTenants.length; i++) {
        tenantsList.push(futureTenants[i]);
    }
    
    return (
        <div className="room-info-wrapper">
            <div className="room-sections-wrapper">

                <div className="room-header">
                    <div className="room-header-title">
                        <h4>
                            Room Nr
                            {' '}
                            {roomNr+1}
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
                    <BookingsGraphic bookingsSummary={tenantsList} />
                    
                </div>

                { !noCurrentTenant ? (
                    <div className="room-section">
                        <CurrentTenant currentTenant={currentTenant[0]} />
                    </div>
                )
                    : (
                        <div className="room-section">
                            {!noNextTenant
                                ? (
                                    <div className="no-current-tenant-line">
                                        <p>
                                            Vacant until
                                            {' '}
                                            <span>{moment(nextTenant.checkIn).format('DD MMM YYYY')}</span>
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
                    <RoomTenants
                        futureTenants={futureTenants}
                        formerTenants={formerTenants}
                        nextTenant={nextTenant}
                        noCurrentTenant={noCurrentTenant}
                    />
                </div>

            </div>

        </div>
    );
};

export default LandlordRoomInfo;
