import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import CurrentTenant from './CurrentTenant';
import RoomTenants from './RoomTenants';
import BookingsGraphic from '../../../Bookings/BkgsGraphic';


// CSS
import './index.scss';

const LandlordRoomInfo = ({ jamJammers, jamId, roomDetails, subSection}) => {

    const roomJammers = jamJammers[subSection];

    const currentTenant = roomJammers.currentTenants;
    const futureTenants = roomJammers.futureTenants;
    const formerTenants = roomJammers.formerTenants;
    const nextTenant = roomJammers.nextTenant
    const noCurrentTenant = isEmpty(currentTenant);
    
    const roomNr = subSection + 1;
    roomNr.toString();

    return (
        <div className="room-info-wrapper">
            <div className="room-sections-wrapper">

                <div className="room-header">
                    <div className="room-buttons-area">
                        <div className="jammers-button">
                            <InviteJammerButton jamId={jamId} roomNr={roomNr}/>                
                        </div>
                    </div>
                    <div className="room-header-title">
                        <h4>
                            Room Nr
                            {' '}
                            {roomNr}
                        </h4>
                    </div>

                </div>

                <div className="bookings-graphic">
                    <BookingsGraphic
                        tenants={roomJammers}
                    />
                    
                </div>

                { !noCurrentTenant && (
                    <div className="room-section">
                        <CurrentTenant
                            currentTenant={currentTenant}
                        />
                    </div>
                )}

                <div className="room-section">
                    <RoomTenants
                        futureTenants={futureTenants}
                        formerTenants={formerTenants}
                        currentTenant={currentTenant}
                        nextTenant={nextTenant}
                        noCurrentTenant={noCurrentTenant}
                        jammers={roomJammers}
                    />
                </div>

            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { jamJammers } = state.jamInfo;
    const { subSection } = state.nav
    return { jamId, jamJammers, subSection }
    
};
export default connect(mapStateToProps, null)(LandlordRoomInfo);
