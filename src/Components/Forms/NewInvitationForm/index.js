import React, { useState } from 'react';
import { connect } from 'react-redux';
import DataService from '../../../../services/DataService';
import Calculations from '../../../../services/Calculations';

import CustomInputField from '../../../CustomInputField';
import ButtonPlain from '../../../ButtonPlain';
import ButtonCancel from '../../../ButtonCancel';

import { changeRoomId } from '../../../../../redux/actions/roomsId';
// import { setActiveScreen } from '../../../../../redux/actions/roomScreen';


const NewInvitationForm = ({
    changeRoomId, roomNr, jamId, roomId,
}) => {
    const [invitationInfo, setInvitationInfo] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInvitationInfo(accInfo => ({ ...invitationInfo, [event.target.id]: event.target.value }));
    };

    const submitNewInvitation = (event) => {
        if (event) { event.preventDefault(); }

        const inviteCode = Calculations.generatetCode();
        invitationInfo.invitationCode = inviteCode;

        DataService.addNewInvitation(jamId, roomId, invitationInfo);
    };

    const cancelAction = (event) => {
        if (event) {
            event.preventDefault();
        }

        // props.setActiveScreen('overview')
        changeRoomId('overview');
    };


    return (
        <form onSubmit={submitNewInvitation}>

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
                    <CustomInputField
                        width="400px"
                        label="Name"
                        type="text"
                        id="jammerName"
                        placeholder="Name"
                        value={invitationInfo.jammerName}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="400px"
                        label="Name"
                        type="text"
                        id="jammerSurname"
                        placeholder="Surname"
                        value={invitationInfo.jammerSurname}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="400px"
                        label="Email"
                        type="text"
                        id="jammerEmail"
                        placeholder="Email"
                        value={invitationInfo.jammerEmail}
                        changeControl={handleInputChange}
                    />
                </div>

                <div className="form-section rentInfo">
                    <CustomInputField
                        width="400px"
                        label="Check-In"
                        type="text"
                        id="checkIn"
                        placeholder="Check-In"
                        value={invitationInfo.checkIn}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="400px"
                        label="Check-Out"
                        type="text"
                        id="checkOut"
                        placeholder="Check-Out"
                        value={invitationInfo.checkOut}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="400px"
                        label="Room Nr"
                        type="text"
                        id="roomNr"
                        placeholder="Room Nr"
                        value={invitationInfo.roomNr}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="400px"
                        label="Rent"
                        type="text"
                        id="rent"
                        placeholder="Rent"
                        value={invitationInfo.rent}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="400px"
                        label="Deposit"
                        type="text"
                        id="deposit"
                        placeholder="Deposit"
                        value={invitationInfo.deposit}
                        changeControl={handleInputChange}
                    />

                </div>

                <div className="new-booking-buttons-area">
                    <ButtonPlain
                        type="submit"
                        text="Submit"
                        clickHandle={submitNewInvitation}
                    />

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
export default connect(mapStateToProps, mapDispatchToProps)(NewInvitationForm);
