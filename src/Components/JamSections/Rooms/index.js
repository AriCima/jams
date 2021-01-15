/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import isEmpty from 'lodash/isEmpty';

import LandlordRoomInfo from './LandlordRoomInfo';
import RoomsOverview from './RoomsOverview';

// CSS
import './index.scss';

const Rooms = ({ jamId, subSection, jammers, rooms }) => {

    const [roomInfo, setRoomInfo] = useState({});
    
    useEffect(() => {
        if (subSection !== '') {
            setRoomInfo(rooms[subSection]);
        }
    }, [subSection, jamId ]);

    const showOverview = subSection === '';

    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">

                {showOverview ?

                    <RoomsOverview
                        roomsTenants={jammers}
                        rooms={rooms}
                    />
                    :
                    <LandlordRoomInfo
                        roomInfo={roomInfo}
                        roomsTenants={rooms}
                    />
                }

            </div>

        </div>
    );
};



const mapStateToProps = (state) => {
    const { jamId, subSection } = state.nav;
    const { nrOfRooms } = state.jamInfo.jamDetails;
    const { jammers, rooms } = state.jamInfo;

    return { jamId, subSection, nrOfRooms, jammers, rooms }
    
};
export default connect(mapStateToProps, null)(Rooms);
