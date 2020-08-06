import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import { connect } from 'react-redux';
import DataService from '../../../../services/DataService';
import Calculations from '../../../../services/Calculations';


import ButtonPlain from '../../../ButtonPlain';
import ButtonCancel from '../../../ButtonCancel';

import { changeRoomId } from '../../../../../redux/actions/roomsId';
// import { setActiveScreen } from '../../../../../redux/actions/roomScreen';


const NewBooking = (props) => {
    const { roomNr, jamId, roomId } = props;
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => { console.log(data); };

    const submitNewBooking = (event) => {
        if (event) {
            event.preventDefault();
        }
        const bCode = Calculations.generateCode();
        bookingInfo.bookingCode = bCode;
        DataService.addNewBooking(jamId, roomId, bookingInfo)
            .then(result => {
                const bookingId = result.id;
                bookingInfo.bookingId = bookingId;
                DataService.updateBookingSummary(jamId, roomId, bookingInfo)
                    .then(
                        // props.setActiveScreen('overview')
                        changeRoomId('overview'),
                    );
            });
    };

    const cancelAction = (event) => {
        if (event) {
            event.preventDefault();
        }
        // props.setActiveScreen('overview')
        changeRoomId('overview');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-header">
                <div className="form-header-title">
                    <p>
                        New Booking for room:
                        {' '}
                        {roomNr}
                    </p>
                </div>
                <div className="form-header-text">
                    <p>Please fill the following info and then send the invitation</p>
                </div>
            </div>

            <div className="form-body">

                <div className="form-section personalInfo">
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="First name"
                            name="name"
                            ref={register({ required: true, maxLength: 80 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Tel"
                            name="tel"
                            ref={register({ required: true, maxLength: 20 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Mobile"
                            name="mobile"
                            ref={register({ required: true, maxLength: 20 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Passport Nr"
                            name="passport"
                            ref={register({ required: true, maxLength: 20 })}
                        />
                    </div>
                </div>

                <div className="form-section homeAddress">

                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Home address"
                            name="address"
                            ref={register({ required: true, maxLength: 120 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Zip-Code"
                            name="zipCode"
                            ref={register({ required: true, maxLength: 10 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            ref={register({ required: true, maxLength: 50 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Country"
                            name="country"
                            ref={register({ required: true, maxLength: 50 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Study"
                            name="study"
                            ref={register({ required: true, maxLength: 80 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="School"
                            name="school"
                            ref={register({ required: true, maxLength: 80 })}
                        />
                    </div>

                </div>

                <div className="form-section rentInfo">

                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Check-In"
                            name="checkIn"
                            ref={register({ required: true, maxLength: 20 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Check-Out"
                            name="checkOut"
                            ref={register({ required: true, maxLength: 20 })}
                        />
                    </div>
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Room Nr"
                            name="roomNr"
                            ref={register({ required: true, maxLength: 20 })}
                        />
                    </div>

                </div>

                <div className="new-booking-buttons-area">
                    <input type="submit" />

                    <ButtonCancel
                        clickHandle={cancelAction}
                    />
                </div>

            </div>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // nombre de la función que paso como prop: (arg) =>
    // dispatch(nombre del action creator(argumento))
    changeRoomId: (roomId) => dispatch(changeRoomId(roomId)),
    // setActiveScreen: (screen) => dispatch( setActiveScreen(screen)),
});
const mapStateToProps = (state) => ({
    user: state.firebase.auth,
    jamId: state.jamId,
    roomId: state.roomId,
    activeScreen: state.activeScreen,
});
export default connect(mapStateToProps, mapDispatchToProps)(NewBooking);
