import React, {Fragment} from "react";
import { connect } from 'react-redux';
// import { setJam } from '../../../../redux/actions/jamId';
import { setJamId, setSection, setSubSection } from '../../../../redux/actions/navigateActions';


// CSS
import "./index.scss";

 const JamCover = ({
   adminId,
   adminName,
   adminLastName,
   jammers,
   jamName,
   jamId,
   userId,
   currentJamId,
   jamType,
   jamDesc,
   setJamId,
   setSection,
   setSubSection
  }) => {

  const onsetJam = (jamId) => {
    setJamId(jamId);
    setSection('Overview');
    setSubSection('');
  };

  const itemIsActive = currentJamId === jamId;

  let interlocutor = '';

  if ( jamType === 'chat') {
    interlocutor = userId === adminId ? `${jammers[0].firstName} ${jammers[0].lastName}` : `${adminName} ${adminLastName}`
  };

  return (

    <div
      className={`jamsList-jamCover-container ${itemIsActive ? 'jamActive':''}`}
      onClick={()=> onsetJam(jamId)}
    >
      
      <div className="jams-list-container-line">
        { jamType === 'chat' ? (
          <Fragment>
            <h4>{interlocutor}</h4>
            <p>{`jammed in ${jamDesc}`}</p>
          </Fragment>
        ) : (
          <Fragment>
            <h4>{jamName}</h4>
            <div className="jams-list-container-line">
              <p>{jamDesc}</p>
            </div>
          </Fragment>
        )}
      </div>


    </div>
  )
  
}

const mapStateToProps = state => {
  const jamId = state.nav.jamId;
  const { userId, firstName, lastName } = state.userInfo;

  return { currentJamId: jamId, userId, firstName, lastName };
};

export default connect(mapStateToProps, { setJamId, setSection, setSubSection })(JamCover)
