import React from "react";

// COMPONENTS
import JamCover from './JamCover'

// CSS
import "./index.scss";

const JamsList = (props) => {

  const { userJams } = props;

  const _renderJams = () => {
    return userJams.map((jam, j) => {
      return (
        <div className="jamCover-wrapper" key={j}>
         
          <JamCover 
            jamName={jam.jamName} 
            jamDesc={jam.jamDesc}
            jamCode={jam.jamCode}
            jamId={jam.jamId}
            jamType={jam.jamType}
            user2Name={jam.user2Name}
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
  
}

export default JamsList;