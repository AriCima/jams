import React from 'react';
import { connect } from 'react-redux';

import JammerContractInfo from '../../../../Reusables/JammerContractInfo';
import StartChatButton from '../../../../UI/Buttons/StartChatButton';
// CSS
import './index.scss';

const CurrentTenant = ({ jamName, docId, userId, firstName, lastName, currentTenant }) => {

    return (
        <div className="current-tenant-wrapper">

            <div className="current-tenant-header">

                <div className="current-tenant-header-title">
                    <p>Current Tenant</p>
                </div>


                <div className="current-tenant-name">
                    <p>{currentTenant.firstName} {currentTenant.lastName}</p>
                </div>

                <div className="start-chatButton">
                    <StartChatButton 
                        user1Name={firstName}
                        user1LastName={lastName}
                        user1Id={userId}
                        user2Name={currentTenant.firstName}
                        user2LastName={currentTenant.lastName}
                        user2Id={docId}
                        jamName={jamName}
                    />
                </div>


            </div>

            <JammerContractInfo contractInfo={currentTenant} />
            {/* <div className="current-tenant-info">

                <div className="current-tenant-personal-info" />

                <div className="current-tenant-info-contract">

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Check-In: </p>
                            </div>
                            <div className="contract-line-value">
                                <p>{moment(currentTenant.checkIn).format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Check-Out: </p>
                            </div>
                            <div className="contract-line-value">
                                <p>{moment(currentTenant.checkOut).format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Rent:</p>
                            </div>
                            <div className="contract-line-value">
                                <p>{currentTenant.rent}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Deposit:</p>
                            </div>
                            <div className="contract-line-value">
                                <p>{currentTenant.deposit}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="current-tenant-info-comments">
                    <p>Comments area</p>
                </div>

            </div> */}

        </div>

    );
};

const mapStateToProps = (state) => {
    const { userId, firstName, lastName } = state.userInfo;
    const { jamName } = state.jamInfo;
    const { docId } = state.doc;

    return { jamName, userId, firstName, lastName, docId }
    
};
export default connect(mapStateToProps, null)(CurrentTenant);

