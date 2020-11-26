import React, { useState }  from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DataService from '../../services/DataService';

import './index.scss';

const TenantPersonalInfo = ({ tenantInfo }) => {

    const { 
        city,
        country,
        door, 
        email, 
        firstName, 
        floor,
        houseNr,
        lastName, 
        mobile,
        passportNr, 
        street, 
        homeTel, 
        zipCode, 
    } = tenantInfo

    const [disabled, setDisabled] = useState(true);




    const defaultValues = {
        city,
        country,
        door, 
        email, 
        firstName, 
        floor,
        houseNr,
        lastName, 
        mobile,
        passportNr, 
        street, 
        homeTel, 
        zipCode, 
    };

    const enableEditForm = (x) => {
        setDisabled(!x)
    };
    const { register, errors, handleSubmit, control } = useForm({defaultValues});

    const onSubmit = (data) => {

    }
        

    return(
    
    <div className="tenant-info-wrapper">
            {/* <div className="tenant-info-section-title">
                <div className="backLine"/>
                <dic className="title">
                    <p>PERSONAL INFO</p>
                </dic>
            </div> */}
            <form
                className="tenant-info-form"
                onSubmit={ handleSubmit(onSubmit) }
            >
                <div className="tenant-info-form-header">

                    <div className="tenant-info-buttonArea">
                        { disabled ? (
                            <div 
                                className="edit-button"
                                onClick={(e) => {enableEditForm(true)}}
                            >
                                Edit Info
                            </div>
                            ) : (
                            <>
                                <input type="submit"/>
                                <div 
                                    className="cancel-button"
                                    onClick={(e) => {enableEditForm(false)}}
                                >
                                    Cancel
                                </div>
                            </>
                        )}
                    </div>
                   
                </div>


                <div className="tenant-info-section">

                    {/* * * * * * * PERSONAL INFO * * * * * * */}
                    <div className="tenant-info-section">

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Name</label>
                                {errors.firstName && <div className="field-error">Required</div>}
                            </div>
                            <input name="firstName" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Last name</label>
                                {errors.lastName && <div className="field-error">Required</div>}
                            </div>
                            <input name="lastName" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Email</label>
                                {errors.email && <div className="field-error">Required</div>}
                            </div>
                            <input name="email" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Passport Nr</label>
                                {errors.passport && <div className="field-error">Required</div>}
                            </div>
                            <input name="passport" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Home Telephone</label>
                                {errors.homeTel && <div className="field-error">Required</div>}
                            </div>
                            <input name="homeTel" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Mobile</label>
                                {errors.mobile && <div className="field-error">Required</div>}
                            </div>
                            <input name="mobile" ref={register({required: true})} disabled={disabled} />
                        </div>

                    </div>

                    <div className="backLine"/> 

                    {/* * * * * * * HOME ADDRESS * * * * * * */}
                    <div className="tenant-info-section">

                        <div className="tenant-info-input-block">
                            <div className="block-label">
                                <label>Home Street</label>
                                {errors.street && <div className="field-error">Required</div>}
                            </div>
                            <input name="street"  ref={register({required: true})} disabled={disabled}/>
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>House Nr</label>
                                {errors.houseNr && <div className="field-error">Required</div>}
                            </div>
                            <input name="houseNr" ref={register({required: true})} disabled />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Floor</label>
                                {errors.floor && <div className="field-error">Required</div>}
                            </div>
                            <input name="floor" ref={register({required: true})} disabled />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Door</label>
                                {errors.door && <div className="field-error">Required</div>}
                            </div>
                            <input name="door" ref={register({required: true})} disabled />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Zip Code</label>
                                {errors.zipCode && <div className="field-error">Required</div>}
                            </div>
                            <input name="zipCode" ref={register({required: true})} disabled />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>City</label>
                                {errors.city && <div className="field-error">Required</div>}
                            </div>
                            <input name="city" ref={register({required: true})} disabled />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Country</label>
                                {errors.city && <div className="field-error">Required</div>}
                            </div>
                            <input name="city" ref={register({required: true})} disabled />
                        </div>

                    </div>

                    <div className="backLine"/> 
                    
                    {/* * * * * * * CONTRACT INFO * * * * * * */}
                    <div className="tenant-info-section">

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>Check In</label>
                                {errors.checkIn && <div className="field-error">Required</div>}
                                    <Controller
                                        as={ReactDatePicker}
                                        control={control}
                                        valueName="selected" // DateSelect value's name is selected
                                        onChange={([selected]) => selected}
                                        name="checkIn"
                                        className="input"
                                        placeholderText="Check-In"
                                    />
                            </div>
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>Check Out</label>
                                {errors.checkOut && <div className="field-error">Required</div>}
                                    <Controller
                                        as={ReactDatePicker}
                                        control={control}
                                        valueName="selected" // DateSelect value's name is selected
                                        onChange={([selected]) => selected}
                                        name="checkOut"
                                        className="input"
                                        // placeholderText="Check-Out"
                                    />
                            </div>
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Room Nr</label>
                                {errors.roomNr && <div className="field-error">Required</div>}
                            </div>
                            <input name="roomNr" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Rent €/Mo</label>
                                {errors.rent && <div className="field-error">Required</div>}
                            </div>
                            <input name="rent" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Depoist €</label>
                                {errors.deposit && <div className="field-error">Required</div>}
                            </div>
                            <input name="deposit" ref={register({required: true})} disabled={disabled} />
                        </div>


                    </div>
                </div>



            </form>

    </div>

  )
}


export default TenantPersonalInfo;
