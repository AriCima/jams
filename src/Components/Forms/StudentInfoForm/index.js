import React, { useEffect, useState } from 'react';

import DataService from '../../services/DataService';
import CustomInputFieldWithLabel from '../../UI/CustomInputFieldWithLabel';
import ButtonSubmit from '../../UI/ButtonSubmit';

// CSS
import './index.css';

const StudentInfoForm = ({ bookingCode }) => {
    const [bookingInfo, setBookingInfo] = useState({});

    useEffect(() => {
        DataService.getPreBookingInfo(bookingCode)
            .then(result => {
                console.log('result: ', result);
                setBookingInfo(result);
            });
    }, []);


    // useEffect(() => {
    //     setbookingInfo(props.bookingInfo);
    // }, [props.bookingInfo]);


    const handleInputChange = (event) => {
        event.persist();
        setBookingInfo(bookingInfo => ({ ...bookingInfo, [event.target.id]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestStatus = 'pending';
        bookingInfo.jammerCondition = requestStatus;
        DataService.addNewBookingRequest(bookingInfo);

    };

    return (
        <div className="student-info-wrapper">
            <form onSubmit={handleSubmit}>

                <div className="student-form-body">
                    <div className="student-form-section">
                        <div className="student-section-title">
                            <p>Personal Info</p>
                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Nombre"
                                placeholder="name"
                                id="jammerName"
                                value={bookingInfo.jammerName}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Surname"
                                placeholder="surname"
                                id="jammerSurname"
                                value={bookingInfo.jammerSurname}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Email"
                                placeholder="email"
                                id="jammerEmail"
                                value={bookingInfo.jammerEmail}
                                changeControl={handleInputChange}
                            />

                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Home Tel"
                                placeholder="tel"
                                id="jammerHomeTel"
                                value={bookingInfo.jammerHomeTel}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Mobile"
                                placeholder="mobile"
                                id="jammerMobile"
                                value={bookingInfo.jammerMobile}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="150px"
                                label="Passport Nr:"
                                placeholder="passport Nr"
                                id="jammerPassportNr"
                                value={bookingInfo.jammerPassportNr}
                                changeControl={handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="student-form-section">
                        <div className="student-section-title">
                            <p>Booking Info</p>
                        </div>
                        <div className="student-form-dates-row">
                            <CustomInputFieldWithLabel
                                type="date"
                                width="120px"
                                label="Check-In:"
                                placeholder="checkIn"
                                id="checkIn"
                                value={bookingInfo.checkIn}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="date"
                                width="120px"
                                label="Check-Out:"
                                placeholder="checkIn"
                                id="checkOut"
                                value={bookingInfo.checkOut}
                                changeControl={handleInputChange}
                            />

                        </div>
                        <div className="student-form-row">

                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Room Nr:"
                                placeholder="room nr"
                                id="roomNr"
                                value={bookingInfo.roomNr}
                                changeControl={handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Rent:"
                                placeholder="rent"
                                id="rent"
                                value={bookingInfo.rent}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Deposit:"
                                placeholder="deposit"
                                id="deposit"
                                value={bookingInfo.deposit}
                                changeControl={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="student-form-section">
                        <div className="student-section-title">
                            <p>Contract Info</p>
                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="400px"
                                label="Street:"
                                placeholder="street"
                                id="jammerStreet"
                                value={bookingInfo.jammerStreet}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="House Nr:"
                                placeholder="house nr"
                                id="jammerHouseNr"
                                value={bookingInfo.jammerHouseNr}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Floor"
                                placeholder="floor"
                                id="jammerFloor"
                                value={bookingInfo.jammerFloor}
                                changeControl={handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Door"
                                placeholder="door"
                                id="jammerDoor"
                                value={bookingInfo.jammerDoor}
                                changeControl={handleInputChange}
                            />
                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Zip-Code"
                                placeholder="zip-code"
                                id="jammerZipCode"
                                value={bookingInfo.jammerZipCode}
                                changeControl={handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="City"
                                placeholder="city"
                                id="jammerCity"
                                value={bookingInfo.jammerCity}
                                changeControl={handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="120px"
                                label="Country"
                                placeholder="country"
                                id="jammerCountry"
                                value={bookingInfo.jammerCountry}
                                changeControl={handleInputChange}
                            />
                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="400px"
                                label="Study"
                                placeholder="study"
                                id="jammerStudy"
                                value={bookingInfo.jammerStudy}
                                changeControl={handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="400px"
                                label="School"
                                placeholder="school"
                                id="jammerSchool"
                                value={bookingInfo.jammerSchool}
                                changeControl={handleInputChange}
                            />
                        </div>

                    </div>
                </div>

                <div className="student-info-form-button-area">
                    <ButtonSubmit />
                </div>
            </form>
        </div>
    );
};

export default StudentInfoForm;
