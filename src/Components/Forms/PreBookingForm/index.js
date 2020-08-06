import React, { useState } from 'react';
// import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// SERVICES
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// REDUX
import { launchAlert } from '../../../redux/actions/alertsActions';

const PreBookingForm = ({
    jamId, roomId, roomNr, bookingsSummary, launchAlert,
}) => {
    const [open, setOpen] = useState(false);

    const [jammerName, setJammerName] = useState('');
    const [jammerEmail, setJammerEmail] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rent, setRent] = useState('');
    const [deposit, setDeposit] = useState('');
    const [inviteURL, setInviteURL] = useState('');

    const handleChange = (field) => event => {
        switch (field) {
        case 'jammerName':
            setJammerName(event.target.value);
            break;
        case 'jammerEmail':
            setJammerEmail(event.target.value);
            break;
        case 'checkIn':
            setCheckIn(event.target.value);
            break;
        case 'checkOut':
            setCheckOut(event.target.value);
            break;
        case 'rent':
            setRent(event.target.value);
            break;
        case 'deposit':
            setDeposit(event.target.value);
            break;
        default:
        }
    };

    const onInvite = (e) => {
        e.preventDefault();

        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        if (outDate <= inDate) {
            return alert('Check-In date must be earlier than check-Out date');
        }

        const overlapping = Calculations.checkOverlapping(inDate, outDate, bookingsSummary);
        if (overlapping.error) {
            console.log('overlapping Error', overlapping.message);
            return alert(`${overlapping.message}`);
            // launchAlert(overlapping.message);
        }

        const createdAt = new Date();
        const bookingCode = Calculations.generateCode();
        const registrationURL = `/localhost:3000/newBooking/${jammerEmail}/bookingCode`;
        const jamName = 'AMPLE 53';

        const preBookingInfo = {
            jamId,
            jamName,
            roomId,
            jammerName,
            jammerEmail,
            bookingCode,
            checkIn,
            checkOut,
            roomNr,
            rent,
            deposit,
            createdAt,
            registrationURL,
        };

        DataService.addPreBooking(preBookingInfo)
            .then(res => {
                const preBookingId = res.id;
                console.log('preBookingId: ', preBookingId);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>
            <button type="submit" className="create-button" onClick={handleClickOpen}>
                INVITE
            </button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    Pre-Booking Form for Room Nr:
                    {' '}
                    {roomNr}
                </DialogTitle>
                <DialogContent>
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Name"
                                        onChange={handleChange('jammerName')}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Email</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Name"
                                        onChange={handleChange('jammerEmail')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Check-In</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange('checkIn')}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Check-Out</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange('checkOut')}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Rent [€/Mo]</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Rent"
                                        onChange={handleChange('rent')}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Deposit [€]</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Deposit"
                                        onChange={handleChange('deposit')}
                                    />
                                </div>
                            </div>
                        </div>

                        {inviteURL === '' ? (
                            ''
                        ) : (
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">LINK</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inviteURL}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {inviteURL === '' && (
                        <Button onClick={onInvite} color="primary">
                            Invite
                        </Button>
                    )}

                </DialogActions>
            </Dialog>
        </div>

    );
};

const mapDispatchToProps = (dispatch) => ({
    launchAlert: (message) => dispatch(launchAlert(message)),
});

export default connect(null, mapDispatchToProps)(PreBookingForm);
