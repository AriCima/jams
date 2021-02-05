import React  from 'react';
import { connect } from 'react-redux';

import StartChatButton from '../../UI/Buttons/StartChatButton';

const JamInfo = ({ 
    adminId,
    adminLastName,
    adminName,
    firstName,
    jamCode,
    jamDesc,
    jamDetails,
    jamId,
    jamName,
    jamType,
    lastName,
    userId,
}) => {

  return(
    
    <div className="jamInfo-wrapper">

        <div className="jamInfo-section">

            <div className="jamInfo-info">
                <div className="name-desc-block">
                    <div className="jamInfo-jamName">
                        <p>{jamName} :</p>
                    </div>
                    <div className="jamInfo-jamDesc">
                        <p>{jamDesc}</p>
                    </div>
                    <div className="jamInfo-line">
                        <p>Jam type: <span>{jamType}</span></p>
                    </div>
                    <div className="jamInfo-line">
                        <p>Jam address: <span>{jamDetails.address}</span></p>
                    </div>
                    <div className="jamInfo-line">
                        <p>Jam code: <span>{jamCode}</span></p>
                    </div>
                </div>
            </div>

            <div className="jamInfo-adminInfo">
                <div className="jamInfo-adminName">
                    <p>The administrator of this jam is:  <span>{adminName} {adminLastName}</span></p>
                </div>
                <StartChatButton
                    adminId={userId}
                    adminName={firstName}
                    adminLastName={lastName}
                    jammers={[{userId: adminId, firstName:adminName, lastName: adminLastName}]}
                    jamDesc={jamName}
                    originJamId={jamId}
                />
            </div>

        </div>
    </div>

  )
}

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { userId , firstName, lastName } = state.userInfo
    const { jamName, jamDesc, jamDetails, jamCode, adminName, adminId, adminLastName, jamType } = state.jamInfo
    
    return {
        adminId,
        adminLastName,
        adminName,
        firstName,
        jamCode,
        jamDesc,
        jamDetails,
        jamId,
        jamName,
        jamType,
        lastName,
        userId,
    };
};
export default connect(mapStateToProps, null)(JamInfo);

