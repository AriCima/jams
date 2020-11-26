import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import CurrentTenant from './CurrentTenant';
import RoomTenants from './RoomTenants';
import BookingsGraphic from '../../../Bookings/BkgsGraphic';


// CSS
import './index.scss';

const LandlordRoomInfo = ({ roomJammers, jamId, subSection}) => {

    const currentTenant = roomJammers.currentTenants;
    const futureTenants = roomJammers.futureTenants;
    const formerTenants = roomJammers.formerTenants;
    let nextTenant = [];

    const noFutureTenants = isEmpty(futureTenants);
    const noCurrentTenant = isEmpty(currentTenant);
    const noFormerTenants = isEmpty(formerTenants);
    
    if(!noFutureTenants) {
        nextTenant = roomJammers.futureTenants[0];
    }
    
    const noNextTenant = nextTenant.length === 0;

    let tenantsList = currentTenant

    for (let i = 0; i < futureTenants.length; i++) {
        tenantsList.push(futureTenants[i]);
    }
    
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
                        jammers={roomJammers}
                    />
                </div>

            </div>

        </div>
    );
};


const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    return { jamId }
    
};
export default connect(mapStateToProps, null)(LandlordRoomInfo);
