import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from "react-hook-form";

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import ButtonCancel from '../../UI/Buttons/ButtonCancel';


import './index.scss';


const useEditTenantForm = ({ tenantInfo, docId, jamId }) => {

    const [editedForm, setEditedForm] = useState(false);
    const { 
        firstName,
        lastName,
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
    } = tenantInfo

    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            homeTel: homeTel,
            street: street,
            houseNr: houseNr,
            mobile: mobile,
            floor: floor,
            door: door,
            zipCode: zipCode,
            city: city,
            country: country,
            passportNr: passportNr,
            study: study,
            school: school,
            rent: rent,
            roomNr: roomNr,
            deposit: deposit,
            checkIn: checkIn,
            checkOut: checkOut,
        }
    });

    const onSubmit = (data) => {
        const userId = data.email;
        data.userId = userId;
        data.registeredUser = false;
        const jId = jamId.jamId // CHAPUZA
        DataService.editTenantInfo(jId, docId, data);
    };

    const cancelChanges = () => {
        setEditedForm(false);
        //CHAPUÇZA -> FALTA HACER VOLVER A LOS VALORES INICIALES
    }

    const handleMyClick = (e) => {
        e.persist();
        setEditedForm(true);
    }

    return (

        <form
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
                            onClick={(e)=>{handleMyClick(e)}}
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
                            onClick={(e)=>{handleMyClick(e)}}
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
                            onClick={(e)=>{handleMyClick(e)}}
                        />
                    </div>
                </div>

                <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Passport Nr</label>
                            {errors.passportNr && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="passportNr"
                            ref={register({
                                required: true,
                            })}
                            onClick={(e)=>{handleMyClick(e)}}
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
                            onClick={(e)=>{handleMyClick(e)}}
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
                            onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
                            />
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
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
                                onClick={(e)=>{handleMyClick(e)}}
                            />
                        </div>

                    </div>
                </div>
                
                
            </div>
            { editedForm &&
                <>
                    <div className="hook-form-buttonArea">
                        <input type="submit" />
                    </div>

                    <div className="section-button">
                        <ButtonCancel
                            text='Cancel'
                            clickHandle={cancelChanges}
                        />
                    </div>
                </>
            }
        </form>
    );
};

export default useEditTenantForm;