import React, {Fragment} from "react";
import { connect } from 'react-redux';
// import { setJam } from '../../../../redux/actions/jamId';
import { setJamId, setSection, setSubSection } from '../../../../redux/actions/navigateActions';


// CSS
import "./index.scss";

 const JamCover = ({
   jamName,
   jamId,
   currentJamId,
   jamType,
   jamDesc,
   user2Name = '',
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

  return (

    <div
      className={`jamsList-jamCover-container ${itemIsActive ? 'jamActive':''}`}
      onClick={()=> onsetJam(jamId)}
    >
      
      <div className="jams-list-container-line">
        { jamType === 'chat' ?
          <Fragment>
            <h4>{user2Name}</h4>
          </Fragment>
          :
          <Fragment>
            <h4>{jamName}</h4>
          </Fragment>

        }
      </div>

      <div className="jams-list-container-line">
        <p>{jamDesc}</p>
      </div>

    </div>
  )
  
}

const mapStateToProps = state => {
  const jamId = state.nav.jamId;
  return { currentJamId: jamId };
};

export default connect(mapStateToProps, { setJamId, setSection, setSubSection })(JamCover)
