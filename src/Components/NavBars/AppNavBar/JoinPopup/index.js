import React, { useState } from "react";
import { connect } from 'react-redux';

import DataService from "../../../services/DataService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// CSS
import './index.scss';

const JoinPopup = ({ userId, email, firstName, lastName }) => {
 
  const [open, setOpen] = useState(false);
  const [jamCode, setjamCode] = useState('');
  const [jamIds, setJamIds] = useState([])

  const handleChange = jamCode => event => {
    setjamCode(event.target.value);
  };

  const showDisabled = userId === '';

  const handleClickOpen = () => {

    if(showDisabled) return;

    // CHECK IF ALREADY JOINED IN THIS JAM
    DataService.getUserJams(userId)
    .then(result =>{
      for (let i = 0; i<result.length; i++) {
        console.log(result[i].jamId)
        jamIds[i] = result[i].jamId;
      }
      setJamIds(jamIds)
    }).catch(function (error) {   
      console.log(error);
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const onJoinJam = (e) => {
    e.preventDefault();

    DataService.getJamInfoByCode(jamCode)
    .then(result =>{
      
      const jamId = result.id;
      const joinedAt = new Date();

      const {jamName, jamType, jamDesc, jamAdminId, jamAdminName} = result;

      const jamInfo = {
        jamCode,
        jamName,
        jamId,
        jamDesc,
        joinedAt,
        jamType,
        jamAdminId,
        jamAdminName
      }

      if(jamIds.includes(jamId) ) {
        alert(`You are already jammer in ${jamInfo.jamName}`)
        return
      }

      DataService.addJamToUser(jamId, userId, jamInfo)
      .then(result =>{
        console.log('result del addJamToUser', result)
      }).catch(function (error) {   
        console.log(error);
      });

      const userInfo = { userId, email, firstName, lastName };
      DataService.addJammerToJam(jamId, userInfo)
      .then(result =>{
        console.log('result del updatJammers', result)
      }).catch(function (error) {   
        console.log(error);
      });
      
    }).catch(function (error) {   
      console.log(error);
    });

    setOpen(false);
  };

  return ( 
    <div>
      <div  className="join-button" onClick={handleClickOpen}>
        <FontAwesomeIcon className={`join-icon-style${showDisabled ? '-disabled':''}`} icon={faCheck} />
      </div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input the JamCode
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="jamCode"
            label="JamCode"
            type="text"
            fullWidth
            onChange={handleChange('jamCode')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onJoinJam} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

const mapStateToProps = state => {
  const { userId, email, firstName, lastName} = state.userInfo;

  return { userId, email, firstName, lastName };
};

export default connect(mapStateToProps)(JoinPopup);

