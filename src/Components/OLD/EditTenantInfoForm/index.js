import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import StartChatButton from '../../UI/Buttons/StartChatButton';
import ButtonSubmit from '../../UI/Buttons/ButtonSubmit';
import ButtonCancel from '../../UI/Buttons/ButtonCancel';

import CustomInputFieldWithLabel from '../../UI/CustomInputFieldWithLabel';

// CSS
import './index.scss';

const EditTenantInfoForm = ({ jamId, userId, userRole, firstName, lastName, jamName, tenantInfo, docId, jamId }) => {
    const [editedTenantInfo, setEditedTenantInfo] = useState({tenantInfo});
    const [editedForm, setEditedForm] = useState(false);

    useEffect(() => {
        setEditedTenantInfo(tenantInfo)
    }, [tenantInfo]);

    const { 
        name,
        surname,
        email,
        homeTel,
        street,
        houseNr,
        mobile,
        floor,
        door,
        zipCode,
        city,
        country,
        passportNr,
        study,
        school,
        rent,
        roomNr,
        deposit,
        checkIn,
        checkOut
    } = editedTenantInfo

    const handleInputChange = (event) => {
        event.persist();
        setEditedForm(true);
        const eidtedKey = event.target.id;
        const editedValue = event.target.value;
        setEditedTenantInfo(editedTenantInfo => ({ 
            ...editedTenantInfo, 
            [eidtedKey]: editedValue 
        }));
    };

    const newTenant = docId === '';

    const submitForm = () => { // CHAPUZA
        const jId = jamId.jamId; // CHAPUZA        
        DataService.editTenantInfo(jId, docId, editedTenantInfo);
    };

    const cancelChanges = () => {
        setEditedTenantInfo(tenantInfo);
        setEditedForm(false);
    }

    return (

        <form
            className="tenant-form-body"
            onSubmit={e => submitForm(e)}
        >
            <div className="tenant-form-header">
                <div className="jammerName">
                    <h4>{name} {surname}</h4>
                    { !newTenant && (
                        <div className="section-button">
                            <StartChatButton
                                user1Name={firstName}
                                user1LastName={lastName}
                                user1Id={userId}
                                user2Name={tenantInfo.firstName}
                                user2LastName={tenantInfo.LastName}
                                user2Id={tenantInfo.userId}
                                jamName={jamName}
                            />
                        </div>
                    )}
                </div>
                <div className="section-buttons">
                    { editedForm &&
                        <>
                            <div className="section-button">
                                <ButtonSubmit
                                    text='Submit changes'
                                    clickHandle={submitForm}
                                />
                            </div>
                            <div className="section-button">
                                <ButtonCancel
                                    text='Cancel'
                                    clickHandle={cancelChanges}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
            
            <div className="tenant-form-section">
                <div className="tenant-section-title">
                    <div className="title-text">
                        <h4>Personal Info</h4>
                    </div>

                    
                </div>
                <div className="tenant-form-row">
                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Nombre"
                        placeholder="name"
                        id="jammerName"
                        value={name}
                        changeControl={e => handleInputChange(e)}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Surname"
                        placeholder="surname"
                        id="jammerSurname"
                        value={surname}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Email"
                        placeholder="email"
                        id="jammerEmail"
                        value={email}
                        changeControl={handleInputChange}
                    />

                </div>
                <div className="tenant-form-row">
                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Home Tel"
                        placeholder="tel"
                        id="jammerHomeTel"
                        value={homeTel}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Mobile"
                        placeholder="mobile"
                        id="mobile"
                        value={mobile}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="150px"
                        label="Passport Nr:"
                        placeholder="passport Nr"
                        id="jammerPassportNr"
                        value={passportNr}
                        changeControl={handleInputChange}
                    />

                </div>
            </div>
            <div className="tenant-form-section">
                <div className="tenant-section-title">
                    <div className="title-text">
                        <h4>Booking Info</h4>
                    </div>
                </div>
                <div className="tenant-form-dates-row">
                    <CustomInputFieldWithLabel
                        type="date"
                        width="120px"
                        label="Check-In:"
                        placeholder="checkIn"
                        id="checkIn"
                        value={checkIn}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="date"
                        width="120px"
                        label="Check-Out:"
                        placeholder="checkIn"
                        id="checkOut"
                        value={checkOut}
                        changeControl={handleInputChange}
                    />

                </div>
                <div className="tenant-form-row">

                    <CustomInputFieldWithLabel
                        type="text"
                        width="120px"
                        label="Room Nr:"
                        placeholder="room nr"
                        id="roomNr"
                        value={roomNr}
                        changeControl={handleInputChange}
                    />
                    <CustomInputFieldWithLabel
                        type="text"
                        width="120px"
                        label="Rent:"
                        placeholder="rent"
                        id="rent"
                        value={rent}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="120px"
                        label="Deposit:"
                        placeholder="deposit"
                        id="deposit"
                        value={deposit}
                        changeControl={handleInputChange}
                    />
                </div>
            </div>
            <div className="tenant-form-section">
                    <div className="tenant-section-title">
                        <div className="title-text">
                            <h4>Contract Info</h4>
                        </div>
                    </div>
                    <div className="tenant-form-row">
                        <CustomInputFieldWithLabel
                            type="text"
                            width="400px"
                            label="Street:"
                            placeholder="street"
                            id="jammerStreet"
                            value={street}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="House Nr:"
                            placeholder="house nr"
                            id="jammerHouseNr"
                            value={houseNr}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Floor"
                            placeholder="floor"
                            id="jammerFloor"
                            value={floor}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Door"
                            placeholder="door"
                            id="jammerDoor"
                            value={door}
                            changeControl={handleInputChange}
                        />
                    </div>
                    <div className="tenant-form-row">
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Zip-Code"
                            placeholder="zip-code"
                            id="jammerZipCode"
                            value={zipCode}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="City"
                            placeholder="city"
                            id="jammerCity"
                            value={city}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Country"
                            placeholder="country"
                            id="jammerCountry"
                            value={country}
                            changeControl={handleInputChange}
                        />
                    </div>
                    <div className="tenant-form-row">
                        <CustomInputFieldWithLabel
                            type="text"
                            width="400px"
                            label="Study"
                            placeholder="study"
                            id="jammerStudy"
                            value={study}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="400px"
                            label="School"
                            placeholder="school"
                            id="jammerSchool"
                            value={school}
                            changeControl={handleInputChange}
                        />
                    </div>

                </div>
        </form>
    );
};

const mapStateToProps = state => {

    const jamId = state.nav.jamId;
    const { userId, userRole, firstName, lastName } = state.userInfo;
    const { jamName } = state.jamInfo
  
    return { jamId, userId, userRole, firstName, lastName, jamName };
  };
  
  
  export default connect(mapStateToProps, null)(EditTenantInfoForm);
  
