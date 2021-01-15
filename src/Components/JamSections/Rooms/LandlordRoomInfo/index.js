import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import Calculations from '../../../services/Calculations';
import DataService from '../../../services/DataService';

import EditRoomForm from '../../../Forms/EditRoomForm';
import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import CurrentTenant from './CurrentTenant';
import TenantsChart from '../../../Reusables/TenantsChart';
import BookingsGraphic from '../../../Bookings/BkgsGraphic';


// CSS
import './index.scss';

const LandlordRoomInfo = ({ jamId, rooms, subSection}) => {

    const roomSelected = rooms.filter(e => e.roomNr === subSection)
    console.log('roomSelected: ', roomSelected);
    const noCurrentTenant = isEmpty(roomSelected .currentTenant);

    const roomNr = subSection;

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
                            currentTenant={roomSelected.currentTenant}
                        />
                    </div>
                )}

                <div className="room-section">
                    <TenantsChart
                        jammersList={roomSelected}
                    />
                </div>

                <div className="editRoomForm-wrapper">
                    <EditRoomForm
                        roomInfo={roomSelected}
                    />
                </div>

            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { subSection } = state.nav;
    const { jammers, rooms } = state.jamInfo;
    const { nrOfRooms } = state.jamInfo.jamDetails;

    return { jamId, jammers, rooms, subSection, nrOfRooms }
    
};
export default connect(mapStateToProps, null)(LandlordRoomInfo);
