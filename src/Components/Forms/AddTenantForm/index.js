import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

// import "react-datepicker/dist/react-datepicker.css";

import DataService from '../../services/DataService';
import ButtonCancel from '../../UI/Buttons/ButtonCancel';


import './index.scss';


const useAddTenantForm = ({ tenantInfo, docId, jamId }) => {



    // const [checkInDate, setCheckInDate] = useState(moment(checkIn).format('DD-MMM-YYYY')); // CHAPuZA
    // const [checkOutDate, setCheckOutDate] = useState(moment(checkIn).format('DD-MMM-YYYY'));
    // VER https://stackoverflow.com/questions/61605448/how-to-use-react-hook-form-with-my-customized-react-date-picker

    const { register, errors, handleSubmit, control } = useForm({});


    const onSubmit = (data) => {
        const userId = data.email;
        data.userId = userId;
        data.registeredUser = false;
        const jId = jamId.jamId // CHAPUZA
        DataService.editTenantInfo(jId, docId, data);
    };

    return (

        <form
            autocomplete="off"
            className="hook-form"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="form-section">
                <div className="form-section-title">
                    <p>Personal information</p>
                </div>
                <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>First name</label>
                            {errors.firstName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="firstName"
                            ref={register({
                                required: true,
                            })} 
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Last name</label>
                            {errors.lastName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="lastName"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Email</label>
                            {errors.email && <div className="field-error">Non valid address</div>}
                        </div>
                        <input
                            name="email"
                            ref={register({ 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />
                    </div>
                </div>
                <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Passport Nr</label>
                            {errors.passport && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="passport"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Home Tel</label>
                            {errors.homeTel && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="homeTel"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Mobile</label>
                            {errors.mobile && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="mobile"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-section-title">
                        <p>Home Address</p>
                    </div>
                    <div className="form-line">
                        <div className="custom-input-block-street">
                            <div className="block-label">
                                <label>Street</label>
                                {errors.street && <div className="field-error">Non valid address</div>}
                            </div>
                            <input
                                name="street"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>House Nr</label>
                                {errors.houseNr && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="houseNr"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Floor</label>
                            </div>
                            <input
                                name="floor"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Door</label>
                            </div>
                            <input
                                name="door"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>ZipCode</label>
                                {errors.zipCode && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="zipCode"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>City</label>
                                {errors.city && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="city"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Country</label>
                                {errors.country && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="country"
                                ref={register({ 
                                    required: true,
                                })}
                            />
                        </div>
                    </div>

                </div>
                <div className="form-section">
                    <div className="form-section-title">
                        <p>Contract Info</p>
                    </div>

                    <div className="form-line">
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Check-In</label>
                                {errors.checkIn && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkIn"
                                placeholder="DD-MM-YYYY"
                                ref={register({
                                    required: true,
                                })}
                            />
                                {/* <Controller
                                    control={control}
                                    name="ReactDatepicker"
                                    render={({ onChange, onBlur, value}) => (
                                    <InDatePicker
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                    />
                                    )}
                                /> */}
                        </div>

                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Check-Out</label>
                                {errors.checkOut && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkOut"
                                placeholder="DD-MM-YYYY"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Room Nr</label>
                                {errors.roomNr && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="roomNr"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Rent €/Mo</label>
                                {errors.rent && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="rent"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="custom-input-block">
                            <div className="block-label">
                                <label>Deposit €</label>
                                {errors.deposit && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="deposit"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
};

export default useAddTenantForm;