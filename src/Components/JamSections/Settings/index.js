
import React from 'react';
import { connect } from 'react-redux';

import LabelValueChart from '../../UI/LabelValueChart';
import HouseRules from '../../Forms/HouseRules';

import './index.scss';

const Settings = ({
    email,
    firstName,
    jamDesc,
    jamDetails,
    jamId,
    jamName,
    lastName
}) => {


    const infoArr = [
        {label: 'Jam Name:', value: jamName},
        {label: 'Jam Description:', value: jamDesc},
        {label: 'Address:', value: jamDetails.address},
        {label: 'Nr of Rooms:', value: jamDetails.nrOfRooms},

    ];
        
    return(

        <div className="settings-wrapper">

            <div className="settings-section">
                <div className="settings-section-title">
                    <div className="backLine"/>
                    <dic className="title">
                        <p>JAM INFO</p>
                    </dic>
                </div>
                <div className="settings-content">
                    <LabelValueChart info={infoArr} />
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-section-title">
                    <div className="backLine"/>
                    <dic className="title">
                        <p>HOUSE RULES</p>
                    </dic>
                </div>
                <div className="settings-content rules">
                    <HouseRules />
                </div>
            </div>

        </div>

    )

};



const mapStateToProps = (state) => {

    const { jamId } = state.nav;
    const jamInfo = state.jamInfo;
    const { jamName, jamDesc, jamDetails } = state.jamInfo;
    const { firstName, lastName, email } = state.userInfo

    return {
        email,
        firstName,
        jamDesc,
        jamDetails,
        jamId,
        jamInfo,
        jamName,
        lastName,
    };
};
export default connect(mapStateToProps, null)(Settings);
