import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

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
                    <h3>Jam Info</h3>
                </div>

                <div className="jam-info-line">
                    <div className="jam-info-label">
                        <p>Description:</p>
                    </div>
                    <div className="jam-info-value">
                        <p>"{jamDesc}"</p>
                    </div>
                </div>

                <div className="jam-info-line">
                    <div className="jam-info-label">
                        <p>Admin:</p>
                    </div>
                    <div className="jammer-overview-adminInfo">
                        <div className="overview-adminInfo">
                            <p>{adminName}</p>
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
                </div>
            </div>


           
            <div className="jammer-overview-serction">
                <div className="jammer-overview-serction-title">
                    <h3>Contract Info</h3>
                </div>

                <div className="contract-section">

                    <div className="contract-versions">
                        <div className="contract-img">
                            <FontAwesomeIcon
                                className="contract-icon"
                                icon={faFile}
                            />
                            <p>ESP</p>
                        </div>

                        <div className="contract-img" >
                            <FontAwesomeIcon
                                icon={faFile}
                                className="contract-icon"
                            />
                            <p>ENG</p>
                        </div>
                    </div>

                    <div className="contract-summary">
                        <div className="contract-summary-line">
                            <div className="contract-block-label">
                                <p>Check-In:</p>
                            </div>
                            <div className="contract-block-value">
                                <p>{moment(contractInfo.checkIn).format('DD-MMM-YYYY')}</p>
                            </div>
                        </div>
                        <div className="contract-summary-line">
                            <div className="contract-block-label">
                                <p>Check-Out: </p>
                            </div>
                            <div className="contract-block-value">
                                <p>{moment(contractInfo.checkOut).format('DD-MMM-YYYY')}</p>
                            </div>
                        </div>
                        <div className="contract-summary-line">
                            <div className="contract-block-label">
                                <p>Room Nr:</p>
                            </div>
                            <div className="contract-block-value">
                                <p>{contractInfo.roomNr}</p>
                            </div>
                        </div>
                        <div className="contract-summary-line">
                            <div className="contract-block-label">
                                <p>Rent €/Mo:</p>
                            </div>
                            <div className="contract-block-value">
                                <p>{contractInfo.rent}</p>
                            </div>
                        </div>
                        <div className="contract-summary-line">
                            <div className="contract-block-label">
                                <p>Deposit:</p>
                            </div>
                            <div className="contract-block-value">
                                <p>{contractInfo.deposit}</p>
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

