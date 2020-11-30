/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import JammersList from '../../../Lists/JammersList';
import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import Board from '../../Board';
import TenantsChart from '../../../Reusables/TenantsChart';

import './index.scss';

const JammersOverview = ({ jamId, userRole, userId }) => {
    const [jammers, setJammers] = useState([]);
    
    
    useEffect(() => {
        getJammersList(jamId)
    }, [jamId]);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        if(res.length > 0) {
            let organizedJammers = [];
            if (userRole === 'Admin') {
                organizedJammers = Calculations.organizeAdminTenants(res);
            } else {
                organizedJammers = Calculations.organizeFlatmates(res, userId);
            }
            setJammers(organizedJammers);
        };
    };
    
    return (
        <>
            { !isEmpty(jammers) && (
                userRole === 'Admin' ? 
                <TenantsChart jammers={jammers}/>
                : (
                    <div className="guest-jammers-section">
                        <div className="guest-jammers-board">
                            <Board section={'Flatmates'} />
                        </div>

                        <div className="guest-jammers-list">
                            <JammersList jammersList={jammers} />
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

    return { jamId, docType, docId, userRole, userId }
    
};
export default connect(mapStateToProps, null)(JammersOverview);