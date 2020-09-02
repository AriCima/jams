import React, { useState } from 'react';

import DataService from '../../services/DataService';
import CustomInputFieldWithLabel from '../../UI/CustomInputFieldWithLabel';

// CSS
import './index.scss';

const NewTenantInfoForm = ({ jamId }) => {
    const [tenantInfo, setTenantInfo] = useState([]);

    const handleInputChange = (event) => {
        event.persist();
        const eidtedKey = event.target.id;
        const editedValue = event.target.value;
        setTenantInfo(editedTenantInfo => ({ 
            ...editedTenantInfo, 
            [eidtedKey]: editedValue 
        }));
    };

    const submitForm = () => { // CHAPUZA
        const jId = jamId.jamId; // CHAPUZA  
        const jammerId = tenantInfo.jammerEmail;      
        DataService.saveTenantInfo(jId, jammerId, tenantInfo);
    };

    return (

        <form
            className="tenant-form-body"
            onSubmit={e => submitForm(e)}
        >
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
