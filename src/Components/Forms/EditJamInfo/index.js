import React,  { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import {useForm} from "react-hook-form";
import { connect } from 'react-redux';
import { setRegisteredUser } from '../../../redux/actions/userActions.js'

import DataService from '../../services/DataService';

import './index.scss';

const EditJamInfo = ({
    jamId,
    jamName,
    firstName,
    lastName,
    jamDesc,
    email,
    userId,
}) => {

    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            jamName: jamName,
            email: email,
            jamDesc: jamDesc,
        }
    });

    const onSubmit = (data) => {
        DataService.EditJamInfo(jamId, data)
    };


    return ( 
        <form
            className="editJamInfo-form"
            onSubmit={ handleSubmit(onSubmit) }
        >
            <div className="form-section">
                <div className="form-header">
                    <div className="form-header-title">
                        <h4>EDIT JAM INFO</h4>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="form-section-title">
                    <p>JAM INFO</p>
                </div>
                <div className="form-col">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Jam name</label>
                            {errors.jamName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="jamName"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Jam Description</label>
                            {errors.jamDesc && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="jamDesc"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="form-section-title">
                    <p>APARTMENT INFO</p>
                </div>
                <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Address</label>
                            {errors.address && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="addresse"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Nr of Rooms</label>
                            {errors.nrOfRooms && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="nrOfRooms"
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

    return {
        email,
        firstName,
        jamDesc,
        jamId,
        jamName,
        jamType,
        lastName,
        section,
        userId,
    };
};


export default connect(mapStateToProps, { setRegisteredUser })(EditJamInfo);