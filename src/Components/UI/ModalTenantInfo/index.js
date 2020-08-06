import React, {useState} from 'react';
import { Modal , Form, Button, ButtonToolbar} from 'react-bootstrap';

import DataService from '../../services/DataService';

const ModalTenantInfo = (props) => {
  const { jamName, jamId } = props;
  
  const [roomInfo, setroomInfo] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setroomInfo(roomInfo => ({...roomInfo, [event.target.id]: event.target.value}));
  };

  const submitNewRoom = (event) => {
    console.log('form submitted')
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
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </Modal.Body>
    </Modal>
  );
}

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
}

export default ModalTenantInfo;
