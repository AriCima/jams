import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import { RadioGroup, FormControlLabel, Switch } from "@material-ui/core";
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
    jamDetails,
    userId,
}) => {

    const { register, errors, handleSubmit, control } = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            jamName: jamName,
            email: email,
            jamDesc: jamDesc,
            checkInProcess: jamDetails.houseRules.checkIn,
            checkOutProcess: jamDetails.houseRules.checkOut,
            checkInFrom: jamDetails.houseRules.checkInFrom,
            checkInTo: jamDetails.houseRules.checkInTo,
            checkOutBefore: jamDetails.houseRules.checkOutBefore,
            pets: true
        }
    });

    const onSubmit = (data) => {
        DataService.EditHouseRules(jamId, data);
    };

    return ( 
        <form
            className="houseRules-form"
            onSubmit={ handleSubmit(onSubmit) }
        >

            <div className="houseRules-form-section">
                <div className="form-col">
                    <table id="houseRules-table">
                        <tr>
                            <th id="header-rule"><p>Rule</p></th>
                            <th>YES</th>
                            <th>NO</th>
                        </tr>
                        <tr>
                            <td id="rules-text">
                                <label>Are pets allowed in the flat ?</label>
                            </td>
                            <td id="rules-value">
                                <section>
                                    {/* <label>MUI Switch</label> */}
                                    <Controller
                                        as={Switch}
                                        type="checkbox"
                                        name="pets"
                                        color='primary'
                                        checked={defaultValues.pets}
                                        control={control}
                                    />
                                </section>
                                {/* <input
                                    name="pets"
                                    type="radio"
                                    value="Yes"
                                    onChange={handleSubmit(onSubmit)}
                                    // ref={register({ required: true })}
                                /> */}
                            </td>
                            <td>
                                {/* <input
                                    name="pets"
                                    type="radio"
                                    value="No"
                                    onChange={handleSubmit(onSubmit)}
                                    ref={register({ required: true })}
                                /> */}
                            </td>
                        </tr>
                        <tr>
                            <td id="rules-text">
                                <label>Is smoking allowed in the flat ? </label>
                            </td>
                            <td id="rules-value">
                                <input
                                    name="smoking"
                                    type="radio"
                                    value="Yes"
                                    onChange={handleSubmit(onSubmit)}
                                    // ref={register({ required: true })}
                                />
                            </td>
                            <td>
                                <input
                                    name="smiking"
                                    type="radio"
                                    value="No"
                                    onChange={handleSubmit(onSubmit)}
                                    ref={register({ required: true })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td id="rules-text">
                                <label>Can tenants invite somebody to overnight ? </label>
                            </td>
                            <td id="rules-value">
                                <input
                                    name="overnights"
                                    type="radio"
                                    value="Yes"
                                    onChange={handleSubmit(onSubmit)}
                                    // ref={register({ required: true })}
                                />
                            </td>
                            <td>
                                <input
                                    name="overnights"
                                    type="radio"
                                    value="No"
                                    onChange={handleSubmit(onSubmit)}
                                    ref={register({ required: true })}/>
                            </td>
                        </tr>
                        <tr>
                            <td id="rules-text">
                                <label>Can tenants organize parties in the flat ? </label>
                            </td>
                            <td id="rules-value">
                                <input
                                    name="parties"
                                    type="radio"
                                    value="Yes"
                                    onChange={handleSubmit(onSubmit)}
                                    // ref={register({ required: true })}
                                />
                            </td>
                            <td>
                                <input
                                    name="parties"
                                    type="radio"
                                    value="No"
                                    onChange={handleSubmit(onSubmit)}
                                    ref={register({ required: true })}/>
                            </td>
                        </tr>
                    </table>

                    <div className="additional-info">
                        <div className="rules-custom-input-block textAreaBlock">
                            <div className="block-label">
                                <label>Check-In procedure</label>
                                {errors.checkInProcess && <div className="field-error">Required</div>}
                            </div>
                            <textarea
                                name="checkInProcess"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="rules-custom-input-block textAreaBlock">
                            <div className="block-label">
                                <label>Check-Out procedure</label>
                                {errors.checkOutProcess && <div className="field-error">Required</div>}
                            </div>
                            <textarea
                                name="checkOutProcess"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="rules-custom-input-block checkIn">
                            <div className="block-label">
                                <label>Check-In from</label>
                                {errors.checkInFrom && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkInFrom"
                                ref={register({
                                    required: true,
                                })}
                            />
                            <div className="block-label">
                                <label> to</label>
                                {errors.checkInTo && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkInTo"
                                ref={register({
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="rules-custom-input-block checkIn">
                            <div className="block-label">
                                <label>Check-Out before</label>
                                {errors.checkOutBefore && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkOutBefore"
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

const mapStateToProps = state => {
    const { section } = state.nav;
    const { jamName, jamDesc, jamType, jamDetails } = state.jamInfo;
    const { jamId } = state.nav;
    const { userId, firstName, lastName, email } = state.userInfo;

    return {
        email,
        firstName,
        jamDesc,
        jamDetails,
        jamId,
        jamName,
        jamType,
        lastName,
        section,
        userId,
    };
};


export default connect(mapStateToProps, { setRegisteredUser })(EditJamInfo);