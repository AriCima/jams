import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

import DataService from '../../../services/DataService';
import JamInfo from '../../../Reusables/JamInfo';
import JammerContractInfo from '../../../Reusables/JammerContractInfo';
import JammerHouseRules from '../../../Reusables/JammerHouseRules';


import './index.scss';

// Esta es la info que ve el inquilino en su Jam/Overview

const JammerOverview = ({ jamName, jamId, jamDesc, userId, firstName, lastName, adminName, adminLastName, adminId}) => {
    
    const [contractInfo, setContractInfo] = useState({})
   
    useEffect(() => {
        userId && DataService.getJammerInfo(jamId, userId)
        .then(res => {
            setContractInfo(res);
        })
    }, [userId]);

    return (
        <div className="overview-wrapper">

           <JamInfo />

            <JammerContractInfo
                contractInfo={contractInfo}
                showRoomNr={true}
            />

            <JammerHouseRules />
           
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


        </div>
    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { userId, userRole, firstName, lastName } = state.userInfo;
    const { jamName, jamDesc, adminName, adminId, adminLastName } = state.jamInfo
    
    return {jamId, userId, userRole, jamName, jamDesc, firstName, lastName, adminName, adminLastName, adminId};
};
export default connect(mapStateToProps, null)(JammerOverview);

