import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import JammerCard from '../../../Lists/JammersList/JammerCard';
import JammerInfo from '../../../JamSections/Jammers/JammerInfo';

import './index.scss';

const JammerOverview = ({ jamId, userId}) => {

    const adminInfo = [];
    
    return (
        <div className="overview-wrapper">

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <p>This your Jam Info</p>
                </div>
            </div>
            <div className="jammer-overview-serction-content">
               <p>Jam Name</p>
               <p>Jam Description</p>
            </div>

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <p>This is the Admin of your Jam</p>
                </div>
            </div>
            <div className="jammer-overview-serction-content">
                <JammerCard adminInfo={adminInfo} />
            </div>

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <p>This is your contract Info</p>
                </div>
            </div>
            <div className="jammer-overview-serction-content">
                <JammerInfo docId={userId}/>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav.jamId;
    const { userId, userRole } = state.userInfo;
    
    return {jamId, userId, userRole};
};
export default connect(mapStateToProps, null)(JammerOverview);

