import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DataService from '../../../services/DataService';
import StartChatButton from '../../../UI/Buttons/StartChatButton';

import './index.scss';

// Esta es la info que ve el inquilino en su Jam/Overview

const JammerOverview = ({ jamName, jamId, jamDesc, userId, firstName, adminName, adminId}) => {
    
    const [contractInfo, setContractInfo] = useState({})
   
    useEffect(() => {
        userId && DataService.getJammerInfo(jamId, userId)
        .then(res => {
            setContractInfo(res);
        })
    }, [userId]);

    return (
        <div className="overview-wrapper">

            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <h3>Jam Description: <span>"{jamDesc}"</span></h3>
                </div>
            </div>

            <div className="jammer-overview-adminInfo">
                <div className="overview-adminInfo">
                    <h3>Jam Admin:<span>{adminName}</span></h3>
                </div>
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
                    <h3>This is your contract Info</h3>
                </div>

                <div className="contract-section">
                    <div className="contract-pic">
                        <img alt="contrct"/>
                    </div>
                    <div className="contract-info">
                        <div className="congtract-info-line">
                            <div className="contract-info-block">
                                <p>Check-In: <span>{moment(contractInfo.checkIn).format('DD-MMM-YYYY')}</span></p>
                            </div>
                            <div className="contract-info-block">
                                <p>Check-Out: <span>{moment(contractInfo.checkOut).format('DD-MMM-YYYY')}</span></p>
                            </div>
                            <div className="contract-info-block">
                                <p>Room Nr: <span>{contractInfo.roomNr}</span></p>
                            </div>
                        </div>
                        <div className="congtract-info-line">
                            <div className="contract-info-block">
                                <p>Rent: <span>{contractInfo.rent}</span></p>
                            </div>
                            <div className="contract-info-block">
                                <p>Deposit: <span>{contractInfo.deposit}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { userId, userRole, firstName } = state.userInfo;
    const { jamName, jamDesc, adminName, adminId } = state.jamInfo
    
    return {jamId, userId, userRole, jamName, jamDesc, firstName, adminName, adminId};
};
export default connect(mapStateToProps, null)(JammerOverview);

