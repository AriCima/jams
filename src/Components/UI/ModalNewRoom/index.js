import React, { useState } from 'react';
import {
    Modal, Form, Button, ButtonToolbar,
} from 'react-bootstrap';

import DataService from '../../services/DataService';

import CustomInputFieldWithLabel from '../CustomInputFieldWithLabel';
import CustomSelectInputField from '../CustomSelectInputField';
import ButtonPlain from '../ButtonPlain';

const NewRoomModal = (props) => {
    const { jamName, jamId } = props;

    const [roomInfo, setroomInfo] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setroomInfo(roomInfo => ({ ...roomInfo, [event.target.id]: event.target.value }));
    };

    const submitNewRoom = (event) => {
        console.log('form submitted');
        if (event) {
            event.preventDefault();
        }

        DataService.addNewRoom(jamId, roomInfo)
            .then(() => {
                props.onHide();
            });
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
          NEW ROOM
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* <h4>Please fill the info below and submit</h4>
        <p>en el jamId = {jamId}</p> */}
                {/*
        <form className="new-room-form" onSubmit={submitNewRoom}>
          <div className="form-body">
            <div className="form-row">
              <CustomInputFieldWithLabel
                width='120px'
                label="Room Nr:"
                type="text"
                id={`roomNr`}
                // placeholder={`room name or ID`}
                value={roomInfo.roomNr}
                changeControl={handleInputChange}
              />

              <CustomInputFieldWithLabel
                width='100px'
                label="Room size"
                type="text"
                id={`roomSize`}
                // placeholder={`Size`}
                value={roomInfo.roomSize}
                changeControl={handleInputChange}
              />
              Interior / Exterior:
              <CustomSelectInputField
                width='120px'
                placeholder='interior / exterior'
                id='roomLocation'
                onChange = {handleInputChange}
                value={roomInfo.roomLocation}
                options={[
                    {value: 'interior', text:'Interior'},
                    {value: 'exterior', text:'Exterior'}
                ]}
              />

              Balcony:
              <CustomSelectInputField
                width='120px'
                placeholder='room balcony'
                id='roomBalcony'
                value={roomInfo.roomBalcony}
                onChange = {handleInputChange}
                options={[
                    {value: 'yes', text:'Yes'},
                    {value: 'no', text:'No'}
                ]}
              />

              Private bathroom:
              <CustomSelectInputField
                width='120px'
                placeholder='priv bathroom'
                id='privateBathroom'
                value={roomInfo.privateBathroom}
                onChange = {handleInputChange}
                options={[
                    {value: 'yes', text:'Yes'},
                    {value: 'no', text:'No'}
                ]}
              />

            </div>
            <div className="form-row">

              <CustomInputFieldWithLabel
                width='60px'
                label="Room rent"
                type="text"
                id={`roomRent`}
                // placeholder={`Rent in €`}
                value={roomInfo.roomRent}
                changeControl={handleInputChange}
              />

              <CustomInputFieldWithLabel
                width='60px'
                label="Deposit"
                type="text"
                id={`roomDeposit`}
                // placeholder={`Deposit in €`}
                value={roomInfo.roomDeposit}
                changeControl={handleInputChange}
              />
            </div>
          </div>
          <button>submit</button>
        </form> */}

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
              We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
            Submit
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
};

const ModalNewRoom = ({ jamId }) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)}>
       New Room
            </Button>

            <NewRoomModal
                jamId={jamId}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ButtonToolbar>
    );
};

export default ModalNewRoom;
// render(<ModalNewRoom />);
