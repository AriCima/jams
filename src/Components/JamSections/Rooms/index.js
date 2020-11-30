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

const Rooms = ({ jamId, nrOfRooms, subSection }) => {
    // const [roomInfo, setRoomInfo] = useState(false);
    const [jammers, setJammers] = useState([]);
    // const [allRoomsInfo, setAllRoomsInfo] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [roomJammers, setRoomJammers] = useState([]);
    


    useEffect(() => {
        if (subSection === '') {
            getJammersList(jamId);
            getAllRoomsInfo(jamId);
        } else {
            getSingleRoomInfo(jamId);
            getRoomJammersList(jamId);
        }
    }, [subSection, jamId]);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        const jammers = Calculations.removeAmdinFromJammers(res);
        
        if(jammers.length > 0) {
            let jammersByRooms = [];
            jammersByRooms = Calculations.getRoomsOccupancy(jammers, nrOfRooms);
            setJammers(jammersByRooms);
        };
    };

    const getRoomJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        if(res.length > 0) {
            let jammersByRooms = [];
            jammersByRooms = Calculations.getRoomsOccupancy(res, nrOfRooms);
            setRoomJammers(jammersByRooms[subSection]);
        };
    };

    const getSingleRoomInfo = async (jamId) => {
        const stringRoomNr = toString(subSection);
        const res = await DataService.getSingleRoomInfo(jamId, stringRoomNr);
        setRoomInfo(res);
    };
    
    const getAllRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        const roomsInfoStatus = Calculations.missingRoomsInfo(res);
        console.log('roomsInfoStatus: ', roomsInfoStatus);
    };

    const showOverview = subSection === '';
    const bookingsAlreadyOrdered = jammers.length > 0;
    const showRoomInfo = !isEmpty(roomJammers);

    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">

                {showOverview ?
                    bookingsAlreadyOrdered ?
                        <RoomsOverview rooms={jammers} />

                        :
                        <p>Loading</p>
                    :
                    showRoomInfo ?
                        <LandlordRoomInfo
                            roomJammers={roomJammers}
                            subSection={subSection}
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

    return { jamId, subSection, nrOfRooms }
    
};
export default connect(mapStateToProps, null)(Rooms);
