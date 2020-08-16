/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import { setSection, setSubSection } from '../../../redux/actions/navigateActions.js';

import Overview from './Overview';

import './index.scss';

const LamndlordOverview = ({ jamId,  setSection, setSubSection }) => {
    // const [jamRoomsInfo, setJamRoomsInfo] = useState([]);
    const [roomsFullInfo, setRoomsFullInfo] = useState([]);

    useEffect(() => {
        getJamRoomsInfo(jamId)
    }, [jamId]);

    const getJamRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        const roomsFullInfo = Calculations.getCompleteRoomsInfo(res);
        setRoomsFullInfo(roomsFullInfo);
    };

    return (
        <div className="landlord-overview">
           
            <div className="landlord-overview-info">

                <Overview
                    roomsFullInfo={roomsFullInfo}
                />

            </div>

        </div>

    );
};


const mapStateToProps = (state) => ({
    user: state.firebase.auth,
});
export default connect(mapStateToProps, { setSection, setSubSection })(LamndlordOverview);
