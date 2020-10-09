import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import JammerInfo from '../../../JamSections/Jammers/JammerInfo';
import StartChatButton from '../../../UI/Buttons/StartChatButton';

import './index.scss';

// Esta es la info que ve el inquilino en su Jam/Overview

const JammerOverview = ({ jamName, jamType, userId, firstName, adminName, adminId}) => {
    
    return (
        <div className="overview-wrapper">

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <p>This your Jam Info</p>
                </div>
            </div>
            <div className="jammer-overview-serction-content">
               <p>Jam Name: {jamName}</p>
               <p>Jam Type: {jamType}</p>
            </div>

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <p>This is the Admin of your Jam</p>
                </div>
            </div>
            <div className="jammer-overview-serction-content">
                <p>Admin Name: <span>{adminName}</span></p>
                <div className="startChat-button">
                <StartChatButton 
                    user1Name={firstName}
                    user1Id={userId}
                    user2Name={adminName}
                    user2Id={adminId}
                    jamName={jamName}
                />
                </div>
            </div>

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <p>This is your contract Info</p>
                </div>
            </div>
            <div className="jammer-overview-serction-content">
                <JammerInfo docId={userId} />
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav.jamId;
    const { userId, userRole, firstName } = state.userInfo;
    const { jamName, jamType, adminName, adminId } = state.jamInfo
    
    return {jamId, userId, userRole, jamName, jamType, firstName, adminName};
};
export default connect(mapStateToProps, null)(JammerOverview);

