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

const Rooms = ({ jamId, nrOfRooms, subSection, jammers, rooms }) => {

    const [roomInfo, setRoomInfo] = useState({});
    // const [roomsTenants, setRoomsTenants] = useState([]);
    // const [roomsFullInfo, setRoomsFullInfo ] = useState([]);
    
    useEffect(() => {
        // const editedJammers = Calculations.removeAmdinFromJammers(jammers);
        // const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);
        // const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms, rooms);
        // setRoomsTenants(organizedTenantsByRoom);
        
        // const oTL = organizedTenantsByRoom.length; 

        // if(oTL > 0) {
        //     for (let i = 0; i < rooms.length; i++) {
        //         if(i <= oTL-1) {
        //             const oT = organizedTenantsByRoom[i];
        //             rooms[i].currentTenant = oT.currentTenants;
        //             rooms[i].formerTenants = oT.formerTenants;
        //             rooms[i].futureTenants = oT.futureTenants;
        //         } else {
        //             rooms[i].currentTenant = [];
        //             rooms[i].formerTenants = [];
        //             rooms[i].futureTenants = [];
        //         }
        //     }
        //     setRoomsFullInfo(rooms);
        // }

        if (subSection !== '') {
            setRoomInfo(rooms[subSection]);
        }

    }, [subSection, jamId ]);

    const showOverview = subSection === '';
    // const bookingsAlreadyOrdered = roomsTenants.length > 0;
    // const showRoomInfo = roomsTenants.length > 0;

    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">

                {showOverview ?
                    // bookingsAlreadyOrdered ?
                        <RoomsOverview
                            roomsTenants={roomsTenants}
                            rooms={roomsFullInfo}
                        />
                        // :
                        // <p>Loading</p>
                    :
                    // showRoomInfo ?
                        <LandlordRoomInfo
                            roomInfo={roomInfo}
                            roomsTenants={roomsTenants}
                        />
                        // :
                        // <p>Loading Room Info</p>
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
