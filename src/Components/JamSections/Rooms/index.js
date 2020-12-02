/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import isEmpty from 'lodash/isEmpty';

import LandlordRoomInfo from './LandlordRoomInfo';
import RoomsOverview from './RoomsOverview';
import { setJamJammers } from '../../../redux/actions/jamActions';

// CSS
import './index.scss';

const Rooms = ({ jamId, nrOfRooms, subSection, setJamJammers, jamJammers }) => {
    const [jammers, setJammers] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});

    useEffect(() => {
        getJammersList(jamId);
        if (subSection === '') {
            getAllRoomsInfo(jamId);
        } else {
            getOneRoomInfo(jamId);
        }
    }, [subSection, jamId]);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        const jammers = Calculations.removeAmdinFromJammers(res);
        
        setJammers(jammers)

        if(jammers.length > 0) {

            const tenantsByRooms = Calculations.getTenantsByRooms(jammers, nrOfRooms)
            const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms)
            
            setJamJammers(organizedTenantsByRoom);
        
        };
    };


    const getOneRoomInfo = async (jamId) => {
        const stringRoomNr = toString(subSection);
        const res = await DataService.getSingleRoomInfo(jamId, stringRoomNr);
        setRoomInfo(res);
    };
    
    const getAllRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        const roomsInfoStatus = Calculations.missingRoomsInfo(res);
    };

    const showOverview = subSection === '';
    const bookingsAlreadyOrdered = jammers.length > 0;
    const showRoomInfo = jamJammers.length > 0;
    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">

                {showOverview ?
                    bookingsAlreadyOrdered ?
                        <RoomsOverview
                            rooms={jammers}
                        />
                        :
                        <p>Loading</p>
                    :
                    showRoomInfo ?
                        <LandlordRoomInfo
                            roomInfo={roomInfo}
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
    const { jamJammers } = state.jamInfo;

    return { jamId, subSection, nrOfRooms, jamJammers }
    
};
export default connect(mapStateToProps, { setJamJammers })(Rooms);
