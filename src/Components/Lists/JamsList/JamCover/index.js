import React, {Fragment} from "react";
import { connect } from 'react-redux';
// import { setJam } from '../../../../redux/actions/jamId';
import { setJamId, setSection, setSubSection } from '../../../../redux/actions/navigateActions';


// CSS
import "./index.scss";

 const JamCover = ({ jamName, jamId, jamType, jamDesc, user2Name = '', setJamId, setSection, setSubSection }) => {

  // const { jamName, jamId, jamType, jamDesc, user2Name = '' } = props

  const onsetJam = (jamId) => {
    console.log(jamId)
    setJamId(jamId);
    setSection('Overview');
    setSubSection('');
  };

  return (

    <div className="jamsList-jamCover-container" onClick={()=> onsetJam(jamId)}>
      
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


export default connect(null, { setJamId, setSection, setSubSection })(JamCover)
