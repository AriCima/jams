import React, { useEffect, useState } from 'react';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import CustomInputFieldWithLabel from '../../UI/CustomInputFieldWithLabel';
import ButtonSubmit from '../../UI/Buttons/ButtonSubmit';
import ButtonCancel from '../../UI/Buttons/ButtonCancel';

import './index.scss';

const inputFields = { 
    name: '',
    surname: '',
    email: '',
    homeTel: '',
    street: '',
    houseNr: '',
    mobile: '',
    floor: '',
    door: '',
    zipCode: '',
    city: '',
    country: '',
    passportNr: '',
    study: '',
    school: '',
    rent: '',
    roomNr: '',
    deposit: '',
    checkIn: '',
    checkOut: ''
} 

const NewTenantInfoForm = ({ jamId }) => {
    const [tenantInfo, setTenantInfo] = useState(inputFields);
    const [fullfilledForm, setFullfilledForm] = useState(false);
    const [nonValidEmail, setNonValidEmail] = (true);
    const [emptyEmail, setEmptyEmail] = (true);
    
    const handleInputChange = (e) => {
        e.persist();
        const editedKey = e.target.id;
        const editedValue = e.target.value;
        setTenantInfo(tenantInfo => ({ 
            ...tenantInfo, 
            [editedKey]: editedValue 
        }));
        
        if (editedKey === 'email') {
            setEmptyEmail(false);
            setTimeout(() => {
                const validEmail = Calculations.validateEmail(editedValue);
                !validEmail && setNonValidEmail(true);
            }, 3000)

        }
    };

    setTimeout(function(){ alert("Hello"); }, 3000);
    
    const submitForm = (e) => { // CHAPUZA
        e.preventDafault();
        const filledForm = Calculations.checkAllInputsAreFilled(tenantInfo);
        const jId = jamId.jamId; // CHAPUZA  
        const jammerId = tenantInfo.jammerEmail;      
        DataService.saveJammerInfo(jId, jammerId, tenantInfo);
    };

    const cancelChanges = () => {
        setTenantInfo(tenantInfo);
        setFullfilledForm(false);
    };

    return (

        <form
            className="tenant-form-body"
            onSubmit={e => submitForm(e)}
        >
            <div className="tenant-form-header">
                <div className="jammerName">
                    <h4>{tenantInfo.jammerName} {tenantInfo.jammerSurname}</h4>
                </div>
                <div className="section-buttons">
                    { fullfilledForm &&
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
                        value={tenantInfo.jammerName}
                        changeControl={e => handleInputChange(e)}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Surname"
                        placeholder="surname"
                        id="jammerSurname"
                        value={tenantInfo.jammerSurname}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Email"
                        placeholder="email"
                        id="jammerEmail"
                        value={tenantInfo.jammerEmail}
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
                        value={tenantInfo.jammerHomeTel}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="200px"
                        label="Mobile"
                        placeholder="mobile"
                        id="mobile"
                        value={tenantInfo.mobile}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="150px"
                        label="Passport Nr:"
                        placeholder="passport Nr"
                        id="jammerPassportNr"
                        value={tenantInfo.jammerPassportNr}
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
                        value={tenantInfo.checkIn}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="date"
                        width="120px"
                        label="Check-Out:"
                        placeholder="checkIn"
                        id="checkOut"
                        value={tenantInfo.checkOut}
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
                        value={tenantInfo.roomNr}
                        changeControl={handleInputChange}
                    />
                    <CustomInputFieldWithLabel
                        type="text"
                        width="120px"
                        label="Rent:"
                        placeholder="rent"
                        id="rent"
                        value={tenantInfo.rent}
                        changeControl={handleInputChange}
                    />

                    <CustomInputFieldWithLabel
                        type="text"
                        width="120px"
                        label="Deposit:"
                        placeholder="deposit"
                        id="deposit"
                        value={tenantInfo.deposit}
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
                            value={tenantInfo.jammerStreet}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="House Nr:"
                            placeholder="house nr"
                            id="jammerHouseNr"
                            value={tenantInfo.jammerHouseNr}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Floor"
                            placeholder="floor"
                            id="jammerFloor"
                            value={tenantInfo.jammerFloor}
                            changeControl={handleInputChange}
                        />

                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Door"
                            placeholder="door"
                            id="jammerDoor"
                            value={tenantInfo.jammerDoor}
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
                            value={tenantInfo.jammerZipcode}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="City"
                            placeholder="city"
                            id="jammerCity"
                            value={tenantInfo.jammerCity}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="120px"
                            label="Country"
                            placeholder="country"
                            id="jammerCountry"
                            value={tenantInfo.jammerCountry}
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
                            value={tenantInfo.jammerStudy}
                            changeControl={handleInputChange}
                        />
                        <CustomInputFieldWithLabel
                            type="text"
                            width="400px"
                            label="School"
                            placeholder="school"
                            id="jammerSchool"
                            value={tenantInfo.jammerSchool}
                            changeControl={handleInputChange}
                        />
                    </div>

                </div>
        </form>
    );
};

export default NewTenantInfoForm;
