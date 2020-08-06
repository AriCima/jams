/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import CustomInputFieldWithLabel from '../../UI/CustomInputFieldWithLabel';
import ButtonSubmit from '../../UI/ButtonSubmit';

// CSScp
import './index.css';


const CheckAvailability = ({ jamId, roomId, roomNr }) => {
    const [open, setOpen] = useState('');

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const openAvailability = () => {
        if (open === '') {
            setOpen('.form-open');
        } else {
            setOpen('');
        }
    };

    const handleInputChange = (field) => event => {
        switch (field) {
        case 'checkIn':
            setCheckIn(event.target.value);
            break;
        case 'checkOut':
            setCheckOut(event.target.value);
            break;
        case 'rent':
        default:
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        alert('CHECKING');

        // const inDate = new Date(checkIn);
        // const outDate = new Date(checkOut);
        // if (outDate <= inDate) {
        //     return alert('Check-In date must be earlier than check-Out date');
        // }

        // const overlapping = Calculations.checkOverlapping(inDate, outDate, bookingsSummary);
        // if (overlapping.error) {
        //     console.log('overlapping Error', overlapping.message);
        //     return alert(`${overlapping.message}`);
        //     // launchAlert(overlapping.message);
        // }
    };

    return (
        <div className="check-availability-wrapper">
            <div
                className="check-button"
                onClick={openAvailability}
            >
                {open === '' ? <p>Check Availability</p> : <p>Close Form</p>}
            </div>
            <form onSubmit={onSubmit} className={`availability-form ${open}`}>
                <div className="form-row">
                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Room Nr"
                        placeholder=""
                        id="roomNr"
                        value={roomNr}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="date"
                        width="200px"
                        label="Check-In"
                        placeholder="surname"
                        id="checkIn"
                        value={checkIn}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="date"
                        width="200px"
                        label="Check-Out"
                        placeholder="surname"
                        id="checkOut"
                        value={checkOut}
                        changeControl={handleInputChange}
                    />
                </div>
                <div className="button-area">
                    <ButtonSubmit
                        type="submit"
                        buttonText="Check"
                    />
                </div>
            </form>
        </div>

    );
};


export default CheckAvailability;
