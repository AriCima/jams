import React,  { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { setRegisteredUser } from '../../../redux/actions/userActions.js'

import DataService from '../../services/DataService';

import './index.scss';

const JamRegistrationForm = ({
    jamId,
    jamName,
    userId,
    firstName,
    lastName,
    email,
    invId,
    showForm,
    setRegisteredUser
}) => {
    const [invInfo, setInvInfo] = useState({})
    
    useEffect(() => {
        if (invId) {
            DataService.getInvitationInfo(jamId, invId)
            .then(res => {
                console.log('res: ', res);
                setInvInfo(res)
            })
        }
    }, [invId])

    const { register, errors, handleSubmit, control } = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            checkIn: invInfo.checkIn,
            checkOut: invInfo.checkOut,
            roomNr: invInfo.roomNr,
            rent: invInfo.rent,
            deposit: invInfo.deposit
        }
    });

    const onSubmit = (data) => {
        data.registeredUser = true;
        data.userId = userId;
        data.userAccepted = false;
        // DataService.saveInvitationReply(jamId, invId, data)
        // .then(() => {
        //     setRegisteredUser(true);
        //     showForm(false);
        // })
        DataService.saveJammerInfoInJam(jamId, userId, data)
        .then(() => {
            setRegisteredUser(true);
            showForm(false);
        })
    };

    return ( 
        <form
            autocomplete="off"
            className="jamRegister-form"
            onSubmit={ handleSubmit(onSubmit) }
        >
            <div className="form-section">
                <div className="form-header">
                    <div className="form-header-title">
                        <h4>Welcomo to <span>{jamName}</span> ! In order to jam with us I need you to fill the following form</h4>
                        <p>This information will bu used to prepare your contract, and only your name, city and couuntry
                            will be visible for your other flatmates.
                        </p>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="form-section-title">
                    <p>Booking Info</p>
                </div>
                <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Room Nr</label>
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
                            <label>Check-In</label>
                        </div>
                        <input
                            name="checkIn"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Check-Out</label>
                        </div>
                        <input
                            name="checkOut"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Rent €/Mo</label>
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
                        })} />
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
            </div>
            
            <div className="form-section">
                <div className="form-section-title">
                    <p>Home Address (Street, house nr, floor, door)</p>
                </div>
                <div className="form-line">
                    <div className="custom-input-block-street">
                        <div className="block-label">
                            <label>Street</label>
                            {errors.homeAddress && <div className="field-error">Non valid address</div>}
                        </div>
                        <input
                            name="homeAddress"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                    {/* <div className="custom-input-block">
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
                    </div> */}
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
            
            <div className="hook-form-buttonArea">
                <input type="submit" />
            </div>
        </form>
    );
};

const mapStateToProps = state => {
    const { section } = state.nav;
    const { jamName, jamDesc, jamType } = state.jamInfo;
    const { jamId } = state.nav;
    const { userId, firstName, lastName, email } = state.userInfo;

    return { jamId, userId, firstName, lastName, email, section, jamName, jamDesc, jamType };
};


export default connect(mapStateToProps, { setRegisteredUser })(JamRegistrationForm);