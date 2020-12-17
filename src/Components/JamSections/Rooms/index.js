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

const Rooms = ({ jamId, nrOfRooms, subSection, jammers}) => {
    const [rooms, setRooms] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [roomsTenants, setRoomsTenants] = useState([]);

    useEffect(() => {
        const editedJammers = Calculations.removeAmdinFromJammers(jammers);
        const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);
        const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms)
        setRoomsTenants(organizedTenantsByRoom);

        if (subSection === '') {
            getAllRoomsInfo(jamId);
        } else {
            getOneRoomInfo(jamId);
        }
    }, [subSection, jamId]);

    const getOneRoomInfo = async (jamId) => {
        const stringRoomNr = toString(subSection);
        const res = await DataService.getSingleRoomInfo(jamId, stringRoomNr);
        setRoomInfo(res);
    };
    
    const getAllRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        console.log('res: ', res);
        setRooms(res)
        const roomsInfoStatus = Calculations.missingRoomsInfo(res);   // PARA CUANDO FALTE INFO DE LA HAB
    };

    const showOverview = subSection === '';
    const bookingsAlreadyOrdered = roomsTenants.length > 0;
    const showRoomInfo = roomsTenants.length > 0;
    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">

                {showOverview ?
                    bookingsAlreadyOrdered ?
                        <RoomsOverview roomsTenants={roomsTenants} rooms={rooms}/>
                        :
                        <p>Loading</p>
                    :
                    showRoomInfo ?
                        <LandlordRoomInfo
                            roomInfo={roomInfo}
                            roomsTenants={roomsTenants}
                        />
                        :
                        <p>Loading Room Info</p>
                }

            </div>

        </div>
    );
};



const mapStateToProps = (state) => {
    const { jamId, subSection } = state.nav;
    const { nrOfRooms } = state.jamInfo.jamDetails;
    const { jammers } = state.jamInfo;

    return { jamId, subSection, nrOfRooms, jammers }
    
};
export default connect(mapStateToProps, null)(Rooms);
