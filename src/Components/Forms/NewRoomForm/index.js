import React, { useState } from 'react';
import { connect } from 'react-redux';
import DataService from '../../../../services/DataService';
// import CountrySelect from '../../UI/CountrySelection';
import CustomInputField from '../../../CustomInputField';
import CustomSelectInputField from '../../../CustomSelectInputField';
import ButtonCancel from '../../../ButtonCancel';
import ButtonSubmit from '../../../ButtonSubmit';

import { changeRoomId } from '../../../../../redux/actions/roomsId';
// import { setActiveScreen } from '../../../../../redux/actions/roomScreen';

// CSS
import './index.css';


const NewRoomForm = ({ changeRoomId, jamId }) => {
    const [roomInfo, setroomInfo] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setroomInfo(roomInfo => ({ ...roomInfo, [event.target.id]: event.target.value }));
    };

    const submitNewRoom = (event) => {
        console.log('room submitted');
        if (event) {
            event.preventDefault();
        }
        DataService.addNewRoom(jamId, roomInfo);
    };

    const cancelAction = (event) => {
        if (event) {
            event.preventDefault();
        }
        // props.setActiveScreen('overview')
        changeRoomId('overview');
    };

    return (
        <form
            autocomplete="off"
            className="new-apartment-form"
            onSubmit={submitNewRoom}
        >

            <div className="form-header">
                <div className="form-header-line">
                    <h3>New Room Form</h3>
                </div>
                <div className="form-header-line">
                    <p>Room Info</p>
                </div>
            </div>

            <div className="form-body">

                <div className="form-row">

                    <CustomInputField
                        width="400px"
                        label="roomNr"
                        type="text"
                        id="roomr"
                        placeholder="room name or ID"
                        value={roomInfo.roomNr}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="60px"
                        label="Room size"
                        type="text"
                        id="roomSize"
                        placeholder="Size"
                        value={roomInfo.roomSize}
                        changeControl={handleInputChange}
                    />

                    <CustomSelectInputField
                        width="120px"
                        placeholder="interior / exterior"
                        id="roomLocation"
                        onChange={handleInputChange}
                        value={roomInfo.roomLocation}
                        options={[
                            { value: 'interior', text: 'Interior' },
                            { value: 'exterior', text: 'Exterior' },
                        ]}
                    />

                    <CustomSelectInputField
                        width="120px"
                        placeholder="room balcony"
                        id="roomBalcony"
                        value={roomInfo.roomBalcony}
                        onChange={handleInputChange}
                        options={[
                            { value: 'yes', text: 'Yes' },
                            { value: 'no', text: 'No' },
                        ]}
                    />

                    <CustomSelectInputField
                        width="120px"
                        placeholder="priv bathroom"
                        id="privateBathroom"
                        value={roomInfo.privateBathroom}
                        onChange={handleInputChange}
                        options={[
                            { value: 'yes', text: 'Yes' },
                            { value: 'no', text: 'No' },
                        ]}
                    />

                </div>
                <div className="form-row">

                    <CustomInputField
                        width="60px"
                        label="Room rent"
                        type="text"
                        id="roomRent"
                        placeholder="Rent in €"
                        value={roomInfo.roomRent}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="60px"
                        label="roomDeposit"
                        type="text"
                        id="roomDeposit"
                        placeholder="Deposit in €"
                        value={roomInfo.roomDeposit}
                        changeControl={handleInputChange}
                    />

                </div>
                <div className="new-rooms-buttons-area">
                    <ButtonSubmit />

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
export default connect(mapStateToProps, mapDispatchToProps)(NewRoomForm);
