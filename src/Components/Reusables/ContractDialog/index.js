import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ContractES from '../../Common/Contracts/ContractES';
import ContractEN from '../../Common/Contracts/ContractEN';

const ContractDialog = ({ }) => {
  const [open, setOpen] = useState(false);
  const [ lenguage, setLenguage ] = useState('ES')
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const manageLenguage = (x, e) => {
    e.preventDefault();
    setLenguage(x);
  }

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>CONTRACT</Button>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
            id="scroll-dialog-title"
        >
            {lenguage === 'ES' ? 'Contrato' : 'Contract'}
            <div className="contract-lenguage-box">
                <div
                    id={`lenguage ${ lenguage === 'ES' ? 'lenguageActive' : null}`}
                    onClick={(e) => {manageLenguage('ES', e)}}
                >
                    <p>ES</p>
                </div>
                <div
                    id={`lenguage ${ lenguage === 'EN' ? 'lenguageActive' : null}`}
                    onClick={(e) => {manageLenguage('EN', e)}}
                >
                    <p>EN</p>
                </div>
            </div>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* {lenguage === 'ES' ? <ContractES /> : <ContractEN />} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
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
  
export default connect(mapStateToProps, null)(ContractDialog);