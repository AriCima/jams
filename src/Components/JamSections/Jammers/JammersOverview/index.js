/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

// import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import JammersList from '../../../Lists/JammersList';
import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import Board from '../../Board';
import TenantsChart from '../../../Reusables/TenantsChart';

import './index.scss';

const JammersOverview = ({
    jammers,
    userRole,
    userId,
}) => {

    const editedJammers = Calculations.removeAmdinFromJammers(jammers);
    const jammersList = Calculations.getAllTenantsOrganized(editedJammers)
    
    const showChart = !isEmpty(jammersList);
    
    return (
        <>
            { showChart && (
                userRole === 'Admin' ? 
                <TenantsChart
                    jammersList={roomInfo}
                />
                : (
                    <div className="guest-jammers-section">
                        <div className="guest-jammers-board">
                            <Board section={'Flatmates'} />
                        </div>

                        <div className="guest-jammers-list">
                            {/* <JammersList jammersList={jammers} /> */}
                        </div>
                    </div>
                )
            ) }
        </>
    );
};


const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { docType , docId } = state.doc;
    const { userRole, userId } = state.userInfo;
    const { jammers } = state.jamInfo;

    return { jamId, docType, docId, userRole, userId, jammers }
    
};
export default connect(mapStateToProps, null)(JammersOverview);