import React from "react";

// COMPONENTS
import JamCover from './JamCover'

// CSS
import "./index.scss";

const JamsList = ({ userJams }) => {
  
  const _renderJams = () => {
    return userJams.map((jam, j) => {
      const {jamName, jamDesc, jamCode, jamId, jamType, jammers, adminId, adminName, adminLastName } = jam;
      return (
        <div className="jamCover-wrapper" key={j}>
          <JamCover 
            jamName={jamName}
            jamDesc={jamDesc}
            jamCode={jamCode}
            jamId={jamId}
            jamType={jamType}
            jammers={jammers}
            adminId={adminId}
            adminName={adminName}
            adminLastName={adminLastName}
            />
        </div>
      )
    });
  };


  return (
    <div className="jams-list-wrapper">
      { userJams.length !== 0 && _renderJams() }
    </div>
  )
  
};

export default JamsList;