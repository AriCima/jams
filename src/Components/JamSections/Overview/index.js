/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

import AdminOverview from './AdminOverview';
import JammerOverview from './JammerOverview';
import InviteJammerButton from '../../UI/Buttons/InviteJammerButton';

import './index.scss';

const Overview = ({ jamId, userRole, userId }) => {
    const [roomsFullInfo, setRoomsFullInfo] = useState([]);
    // const [jammerInfo, setJammerInfo] = useState({});

    useEffect(() => {
        if(userRole === 'Admin') {
            getJamRoomsInfo(jamId)
        }
        //  else {
        //     getGuestInfo(jamId, userId)
        // }
    }, [jamId]);

    const getJamRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        const roomsFullInfo = Calculations.getCompleteRoomsInfo(res);
        setRoomsFullInfo(roomsFullInfo);
    };

    // const getGuestInfo = async (jamId, userId) => {
    //     console.log('jamId: ', jamId);
    //     const res = await DataService.getJammerInfo(jamId, userId);
    //     setJammerInfo(res);
    // };

    const renderOverview = () => {
        if(userRole === 'Admin') {
            return (
                <div className="overview">
                    <div className="overview-buttonsArea">
                        <div className="overview-button">
                            <InviteJammerButton jamId={jamId} />                
                        </div>
                    </div>
                
                    <div className="overview-info">
                        <AdminOverview
                            roomsFullInfo={roomsFullInfo}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="overview">
                    <div className="overview-info">
                        <JammerOverview />
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            { renderOverview() }
        </>
    );
};


const mapStateToProps = (state) => {
    const { jamId } = state.nav.jamId;
    const {userId, userRole } = state.userInfo;
    
    return {jamId, userId, userRole};
};
export default connect(mapStateToProps, null)(Overview);
