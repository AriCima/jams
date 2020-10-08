import React from 'react';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';

import './index.scss';


const useInviteJammerForm = ({jamId, jamName, adminName}) => {

    let history = useHistory();
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        data.registeredUser = false;
        const { firstName } = data
        DataService.newTenantInvitation(jamId, data)
        .then((res) => {
            const invId = res.id;
            // CHAPUZA AQUI HAY QUE AUTOMATIZAR FUNCION DE INVITACION
            history.push(`/register/${jamId}/${jamName}/${adminName}/${firstName}/${invId}`);
        })
    };

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
                            })} />
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
                            })} />
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
                            })} />
                        </div>

                    </div>
                </div>
                
                
            </div>
            <div className="hook-form-buttonArea">
                <input type="submit" />
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    const jamId = state.nav.jamId;
    const {jamName, adminName} = state.jamInfo
    return { jamId, jamName, adminName }
};

export default connect(mapStateToProps, null)(useInviteJammerForm);