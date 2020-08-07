import React, {Fragment} from "react";
import { connect } from 'react-redux';
import { selectJam } from '../../../../redux/actions/jamId';


// CSS
import "./index.scss";

 const JamCover = (props) => {

  const { jamName, jamId, jamType, jamDesc, user2Name = '' } = props

  const onSelectJam = (jamId) => {
    props.selectJam(jamId);
  };

  return (

    <button className="jamsList-jamCover-container" onClick={()=> onSelectJam(jamId)}>
      
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

    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectJam: (jamId) => dispatch(selectJam(jamId)),
  }
}

export default connect(null, mapDispatchToProps)(JamCover)
