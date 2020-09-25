import React,  { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import { connect } from 'react-redux';
import { setRegisteredUser } from '../../../redux/actions/userActions.js'

import DataService from '../../services/DataService';

import './index.scss';

const JamRegistrationForm = ({ jamId, jamName, jammerId, invId, showForm, setRegisteredUser }) => {

    const [jammerInfo, setJammerInfo] = useState({});    

    useEffect(() => {
        invId && DataService.getJammerInfo(jamId, jammerId)
        .then(data => {
            setJammerInfo(data);
        })
    }, []);

    const { register, errors, handleSubmit, control } = useForm({
        defaultValues: {
            firstName: jammerInfo.firstName,
            lastName: jammerInfo.lastName,
            email: jammerInfo.email
        }
    });

    const onSubmit = (data) => {
        data.registeredUser = true;
        DataService.saveJammerInfo(jamId, jammerId, data)
        .then(() => {
            setRegisteredUser(true);
            showForm(false);
        })
    };

    return ( 
        <form
            className="jamRegister-form"
            onSubmit={ handleSubmit(onSubmit) }
        >
            <div className="form-section">
                <div className="jamRegister-form-header">
                    <div className="form-header-title">
                        <p>Welcomo to {jamName} ! In order to jam with us I need you to fill the following form</p>
                        <p>This information will bu used to prepare your contract, and only your name, city and couuntry
                            will be visible for your other flatmates.
                        </p>
                    </div>
                </div>
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
            
            <div className="hook-form-buttonArea">
                <input type="submit" />
            </div>
        </form>
    );
};

export default connect(null, { setRegisteredUser })(JamRegistrationForm);