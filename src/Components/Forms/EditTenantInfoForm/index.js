import React, { useEffect, useState } from 'react';

import DataService from '../../services/DataService';
import StartChatButton from '../../UI/Buttons/StartChatButton';
import ButtonSubmit from '../../UI/Buttons/ButtonSubmit';
import ButtonCancel from '../../UI/Buttons/ButtonCancel';

import CustomInputFieldWithLabel from '../../UI/CustomInputFieldWithLabel';

// CSS
import './index.scss';

const EditTenantInfoForm = ({ tenantInfo, docId, jamId }) => {
    const [editedTenantInfo, setEditedTenantInfo] = useState({tenantInfo});
    const [editedForm, setEditedForm] = useState(false);

    useEffect(() => {
        setEditedTenantInfo(tenantInfo)
    }, [tenantInfo]);

    const { 
        jammerName,
        jammerSurname,
        jammerEmail,
        jammerHomeTel,
        jammerStreet,
        jammerHouseNr,
        mobile,
        jammerFloor,
        jammerDoor,
        jammerZipcode,
        jammerCity,
        jammerCountry,
        jammerPassportNr,
        jammerStudy,
        jammerSchool,
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
                    <h4>{jammerName} {jammerSurname}</h4>
                    { !newTenant && (
                        <div className="section-button">
                            <StartChatButton />
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
                        value={jammerName}
                        changeControl={e => handleInputChange(e)}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Surname"
                        placeholder="surname"
                        id="jammerSurname"
                        value={jammerSurname}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Email"
                        placeholder="email"
                        id="jammerEmail"
                        value={jammerEmail}
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
                        value={jammerHomeTel}
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
                        value={jammerPassportNr}
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
                            value={jammerStreet}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="House Nr:"
                            placeholder="house nr"
                            id="jammerHouseNr"
                            value={jammerHouseNr}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Floor"
                            placeholder="floor"
                            id="jammerFloor"
                            value={jammerFloor}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Door"
                            placeholder="door"
                            id="jammerDoor"
                            value={jammerDoor}
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
                            value={jammerZipcode}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="City"
                            placeholder="city"
                            id="jammerCity"
                            value={jammerCity}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Country"
                            placeholder="country"
                            id="jammerCountry"
                            value={jammerCountry}
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
                            value={jammerStudy}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="400px"
                            label="School"
                            placeholder="school"
                            id="jammerSchool"
                            value={jammerSchool}
                            changeControl={handleInputChange}
                        />
                    </div>

                </div>
        </form>
    );
};

export default EditTenantInfoForm;
