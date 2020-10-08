/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import JammersList from '../../../Lists/JammersList';
import InviteJammerButton from '../../../UI/Buttons/InviteJammerButton';
import './index.scss';

const JammersOverview = ({ jamId, userRole, userId }) => {
    const [jammers, setJammers] = useState([]);
    
    useEffect(() => {
        getJammersList(jamId)
    }, []);

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


    const renderJammersList = () => {
        if(userRole === 'Admin') {
            return(
                <>
                    <div className="jammers-buttonsArea">
                        <div className="jammers-button">
                            <InviteJammerButton jamId={jamId} />                
                        </div>
                    </div>

                    <div className="jammers-section">
                        <div className="subSection-title">
                            <p>Current Tenants</p>
                        </div>
                        <div className="subsection-wrapper">
                            <JammersList jammersList={jammers.currentTenants} />
                        </div>
                    </div>

                    <div className="jammers-section">
                        <div className="subSection-title">
                            <p>Future Tenants</p>
                        </div>
                        <div className="subsection-wrapper">
                            <JammersList jammersList={jammers.futureTenants} />
                        </div>
                    </div>

                    <div className="jammers-section">
                        <div className="subSection-title">
                            <p>Former Tenants</p>
                        </div>
                        <div className="subsection-wrapper">
                            <JammersList jammersList={jammers.formerTenants} />
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <div className="jammers-section">
                    <div className="subSection-title">
                        <p>These are your flatmates !</p>
                    </div>
                    <div className="subsection-wrapper">
                        <JammersList jammersList={jammers.myFlatMates} />
                    </div>
                </div>
            )
        }
    };

    return (
        <>
            { renderJammersList() }
        </>
    );
};


const mapStateToProps = (state) => {
    const { docType , docId } = state.doc;
    const { userRole, userId } = state.userInfo
    return { docType, docId, userRole, userId }
    
};
export default connect(mapStateToProps, null)(JammersOverview);