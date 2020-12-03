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
    jamId,
    jamJammers,
    userRole,
    userId,
}) => {



    // const [jammers, setJammers] = useState([]);
    
    
    // useEffect(() => {
    //     getJammersList(jamId)
    // }, [jamId]);

    // const getJammersList = async (jamId) => {
    //     const res = await DataService.getJammers(jamId);
    //     if(res.length > 0) {
    //         let organizedJammers = [];
    //         if (userRole === 'Admin') {
    //             organizedJammers = Calculations.organizeAdminTenants(res);
    //         } else {
    //             organizedJammers = Calculations.organizeFlatmates(res, userId);
    //         }
    //         setJammers(organizedJammers);
    //     };
    // };

    const organizedTenants = Calculations.getAllTenantsOrganized(jamJammers);
    
    const {
        currentTenants: [],
        formerTenants: [],
        futureTenants: []
    } = organizedTenants;
    return (
        <>
            { !isEmpty(organizedTenants) && (
                userRole === 'Admin' ? 
                <TenantsChart
                    futureTenants={organizedTenants.futureTenants}
                    formerTenants={organizedTenants.formerTenants}
                    currentTenant={organizedTenants.currentTenant}
                    // nextTenant={nextTenant}
                    // noCurrentTenant={noCurrentTenant}
                    // jammers={jammers}
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
    const { jamJammers } = state.jamInfo

    return { jamId, docType, docId, userRole, userId, jamJammers }
    
};
export default connect(mapStateToProps, null)(JammersOverview);