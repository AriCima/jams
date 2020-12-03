import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import Calculations from '../../../services/Calculations';
import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import CurrentTenant from './CurrentTenant';
import TenantsChart from '../../../Reusables/TenantsChart';
import BookingsGraphic from '../../../Bookings/BkgsGraphic';


// CSS
import './index.scss';

const LandlordRoomInfo = ({ roomsTenants, nrOfRooms, jamId, jammers, roomDetails, subSection}) => {

    const roomJammers = roomsTenants[subSection];

    const editedJammers = Calculations.removeAmdinFromJammers(jammers);
    const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);
    const editedTenants = Calculations.getOrganizedTenants(tenantsByRooms)
    const currentTenant = editedTenants[subSection].currentTenants;
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
                    <BookingsGraphic />
                    
                </div>

                { !noCurrentTenant && (
                    <div className="room-section">
                        <CurrentTenant
                            currentTenant={currentTenant}
                        />
                    </div>
                )}

                <div className="room-section">
                    <TenantsChart
                        jammersList={editedTenants[subSection]}
                    />
                </div>

            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { subSection } = state.nav;
    const { jammers } = state.jamInfo;
    const { nrOfRooms } = state.jamInfo.jamDetails;

    return { jamId, jammers, subSection, nrOfRooms }
    
};
export default connect(mapStateToProps, null)(LandlordRoomInfo);
