import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setSection } from '../../../redux/actions/navigateActions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomdDialog = ({ 
    mustOpen,
    actionMessage,
    modalTitle,
    dialogType,
    setSection
}) => {

  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    if(mustOpen) {
      setTimeout(() => setOpen(true), 3000);
    }
  }, [mustOpen])

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const takeMeToRoomsOverview = () => {
    setSection('Rooms')
    setOpen(false);
    // setDocType('');
  }

  // console.log('mustOpen: ', mustOpen);

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Missing Room Info
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            There is missing information about your rooms features. We strongly recomend you to fill this informaiton since it is mandatory to be abl to print our contracts.
          </Typography>
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={takeMeToRoomsOverview} color="primary">
            {actionMessage}
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

export default connect(mapStateToProps, {setSection})(CustomdDialog);

