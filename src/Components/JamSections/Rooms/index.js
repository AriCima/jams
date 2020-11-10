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
    const [showRoomInfo, setShowRoomInfo] = useState(false);
    const [jammers, setJammers] = useState([]);
    

    // useEffect(() => {
    //     // getJamRoomsInfo(jamId);
    //     console.log('launched')
    //     getJammersList(jamId);
    // }, [subsection]);


    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        if(res.length > 0) {
            let jammersByRooms = [];
            jammersByRooms = Calculations.getRoomsOccupancy(res, nrOfRooms);
            console.log('jammersByRooms: ', jammersByRooms);
            setJammers(jammersByRooms);
        };
    };

    useEffect(() => {
        if (subSection !== '') {
            getRoomInfo(jamId, subSection);
        } else {
            getJammersList(jamId);
        }
    }, [subSection]);

    const getRoomInfo = async (jamId) => {
        const stringRoomNr = toString(subSection);
        const res = await DataService.getRoomInfo(jamId, stringRoomNr);
        console.log('res: ', res);
        // setRoomInfo(res);
        setShowRoomInfo(true);
    };
    



    const showOverview = subSection === '';
    const bookingsAlreadyOrdered = jammers.length > 0;
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
                            roomJammers={jammers[subSection]}
                            roomNr={subSection}
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
