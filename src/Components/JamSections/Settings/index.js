
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import {
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";

import DataService from '../../services/DataService';

import './index.scss';


const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
root: {
    color: red[400],
    '&$checked': {
    color: red[600],
    },
},
checked: {},
})((props) => <Radio color="default" {...props} />);

const Settings = ({
    jamDesc,
    jamDetails,
    jamId,
    jamName,
    jamCode,
}) => {

    const [disabled, setDisabled] = useState(true);


    const enableEditForm = (x) => {
        setDisabled(!x)
    };

    const defaultValues = {
        jamName: jamName,
        jamDesc: jamDesc,
        jamCode: jamCode,
        checkInProcess: jamDetails.houseRules.checkInProcess,
        checkOutProcess: jamDetails.houseRules.checkOutProcess,
        checkInFrom: jamDetails.houseRules.checkInFrom,
        checkInTo: jamDetails.houseRules.checkInTo,
        checkOutBefore: jamDetails.houseRules.checkOutBefore,
        pets: jamDetails.houseRules.pets,
        smoking: jamDetails.houseRules.smoking,
        smokingBalcony: jamDetails.houseRules.smokingBalcony,
        overnight: jamDetails.houseRules.overnight,
        parties: jamDetails.houseRules.parties,
        address: jamDetails.address,
        inviteFriends: jamDetails.houseRules.inviteFriends
        // nrOfRooms: jamDetails.nrOfRooms,
    };


    const { register, errors, handleSubmit, control } = useForm({defaultValues});

    const onSubmit = (data) => {

        const {
            address,
            checkInFrom,
            checkInProcess,
            checkInTo,
            checkOutBefore,
            checkOutProcess,
            jamDesc,
            jamName,
            // nrOfRooms,
            overnight,
            parties,
            pets,
            smoking,
            smokingBalcony,
            inviteFriends
        } = data;

        const editJamMainInfo = jamName !== defaultValues.jamName || jamDesc !== defaultValues.jamDesc;

        const editJamDetails = address !== defaultValues.address;

        const editHouseRules = (
            checkInProcess !== defaultValues.checkInProcess || checkOutProcess !== defaultValues.checkOutProcess || 
            checkInFrom !== defaultValues.checkInFrom || checkInTo !== defaultValues.checkInTo || 
            checkOutBefore !== defaultValues.checkOutBefore || pets !== defaultValues.pets || 
            parties !== defaultValues.parties || overnight !== defaultValues.overnight || 
            smokingBalcony !== defaultValues.smokingBalcony || smoking !== defaultValues.smoking || inviteFriends !== defaultValues.inviteFriends
        );

        
        if(editJamMainInfo) {
            const info = {jamName, jamDesc};
            DataService.editJamMainInfo(jamId, info);
        };
        if(editJamDetails) {
            const info = {address};
            DataService.editJamDetails(jamId, info);
        };
        if(editHouseRules) {
            const info = {
                checkInFrom,
                checkInProcess,
                checkInTo,
                checkOutBefore,
                checkOutProcess,
                overnight,
                parties,
                pets,
                smoking,
                smokingBalcony,
                inviteFriends
            };
            DataService.editJamHouseRules(jamId, info);
        };
        
        
    };
        
    return(

        <div className="settings-wrapper">
            <form
                className="settings-form"
                onSubmit={ handleSubmit(onSubmit) }
            >
                <div className="settings-form-header">
                    <div className="settings-header-title">
                        <h4>Manage all the information about <span>{jamName}</span> here</h4>
                    </div>

                    <div className="settings-buttonArea">
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


                <div className="settings-section">
                    {/* <div className="settings-section-title">
                        <div className="backLine"/>
                        <dic className="title">
                            <p>JAM INFO</p>
                        </dic>
                    </div> */}
                    <div className="settings-section-info">
                        <div className="rules-custom-input-block midWidth">
                            <div className="block-label">
                                <label>Jam Name</label>
                                {errors.jamName && <div className="field-error">Required</div>}
                            </div>
                            <input name="jamName" ref={register({required: true})} disabled={disabled} />
                        </div>
                        <div className="rules-custom-input-block textAreaBlock">
                            <div className="block-label">
                                <label>Jam Description</label>
                                {errors.jamDesc && <div className="field-error">Required</div>}
                            </div>
                            <textarea name="jamDesc" ref={register({required: true})} disabled={disabled}/>
                        </div>
                        <div className="rules-custom-input-block">
                            <div className="block-label">
                                <label>Apartment location</label>
                                {errors.address && <div className="field-error">Required</div>}
                            </div>
                            <input name="address" placeholder="Street, hosue nr, floor, door, city, zipCode, country" ref={register({required: true})} disabled={disabled}/>
                        </div>
                        <div className="rules-custom-input-block short-block">
                            <div className="block-label ">
                                <label>Jam code</label>
                            </div>
                            <input name="jamCode" ref={register({required: true})} disabled />

                        </div>
                        {/* <div className="rules-custom-input-block shortWidth">
                            <div className="block-label">
                                <label>Nr of rooms</label>
                                {errors.nrOfRooms && <div className="field-error">Required</div>}
                            </div>
                            <input name="nrOfRooms" ref={register({required: true})}/>
                        </div> */}
                    </div>
                </div>

                <div className="settings-section">

                    {/* <div className="settings-section-title">
                        <div className="backLine"/>
                        <dic className="title">
                            <p>CHECK-IN / CHECK-OUT </p>
                        </dic>
                    </div> */}
                    <div className="settings-section-info">
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
                                disabled={disabled}
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
                                disabled={disabled}
                            />
                        </div>
                        <div className="rules-custom-input-block shortWidth">
                            <div className="block-label">
                                <label>Check-In from</label>
                                {errors.checkInFrom && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkInFrom"
                                ref={register({
                                    required: true,
                                })}
                                disabled={disabled}
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
                                disabled={disabled}
                            />
                        </div>
                        <div className="rules-custom-input-block shortWidth">
                            <div className="block-label">
                                <label>Check-Out before</label>
                                {errors.checkOutBefore && <div className="field-error">Required</div>}
                            </div>
                            <input
                                name="checkOutBefore"
                                ref={register({
                                    required: true,
                                })}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>

                <div className="settings-section">

                    {/* <div className="settings-section-title">
                        <div className="backLine"/>
                        <dic className="title">
                            <p>HOUSE RULES</p>
                        </dic>
                    </div> */}

                    <div className="settings-content rules">

                        <div className="houseRules-form-section">
                            <div className="form-col">
                                {/* <div className="houseRules-text">
                                    <p>Please activate the rules you want to apply to your apartment</p>
                                    <p>Activated rules will be shown in your tenant's <span>"Overview"</span> page</p>
                                </div> */}
                                <table id="houseRules-table">
                                    <tr>
                                        <th>
                                            <p>House rules</p>
                                        </th>
                                        <th className="rules-value">
                                            <div className="header-values-wrapper">
                                                <div className="value-box">
                                                    <p>YES</p>
                                                </div>
                                                <div className="value-box">
                                                    <p>NO</p>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Are pets allowed in the flat ?</label>
                                        </td>
                                        <td id="rules-value">
                                        <section>
                                            <Controller
                                                name="pets"
                                                control={control}
                                                defaultValue={defaultValues.pets}
                                                disabled={disabled}
                                                as={
                                                    <RadioGroup aria-label="pets">
                                                        <div className="radios-wrapper">
                                                            <div className="radio-box">
                                                                <FormControlLabel
                                                                    value="yes"
                                                                    control={<GreenRadio />}
                                                                />
                                                            </div>
                                                            <div className="radio-box">
                                                                <FormControlLabel
                                                                    value="no"
                                                                    control={<RedRadio />}
                                                                />
                                                            </div>
                                                        </div>
                                                    </RadioGroup>
                                                }
                                            />
                                        </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Can tenants smoke in the apartment ?</label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="smoking"
                                                    control={control}
                                                    defaultValue={defaultValues.smoking}
                                                    disabled={disabled}
                                                    as={
                                                        <RadioGroup aria-label="smoking">
                                                            <div className="radios-wrapper">
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={<GreenRadio />}
                                                                    />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={<RedRadio />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    }
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Can tenants smoke in balconies or terraces ?</label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="smokingBalcony"
                                                    control={control}
                                                    defaultValue={defaultValues.smokingBalcony}
                                                    disabled={disabled}
                                                    as={
                                                        <RadioGroup aria-label="smokingBalcony">
                                                            <div className="radios-wrapper">
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={<GreenRadio />}
                                                                    />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={<RedRadio />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    }
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Can tenants invite firends to the apartment ? </label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="inviteFriends"
                                                    control={control}
                                                    defaultValue={defaultValues.inviteFriends}
                                                    disabled={disabled}
                                                    as={
                                                        <RadioGroup aria-label="inviteFriends">
                                                            <div className="radios-wrapper">
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={<GreenRadio />}
                                                                    />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={<RedRadio />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    }
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Can tenants have guest to overnight in the apartment ?</label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="overnight"
                                                    control={control}
                                                    defaultValue={defaultValues.overnight}
                                                    disabled={disabled}
                                                    as={
                                                        <RadioGroup aria-label="overnight">
                                                            <div className="radios-wrapper">
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={<GreenRadio />}
                                                                    />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={<RedRadio />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    }
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Can tenants organize or participate in parties in the apartment ? </label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="parties"
                                                    control={control}
                                                    defaultValue={defaultValues.parties}
                                                    disabled={disabled}
                                                    as={
                                                        <RadioGroup aria-label="parties">
                                                            <div className="radios-wrapper">
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={<GreenRadio />}
                                                                    />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={<RedRadio />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    }
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </form>

        </div>

    )

};


const mapStateToProps = state => {
    const { section } = state.nav;
    const { jamName, jamDesc, jamType, jamDetails, jamCode } = state.jamInfo;
    const { jamId } = state.nav;
    const { userId } = state.userInfo;

    return {
        jamDesc,
        jamDetails,
        jamId,
        jamName,
        jamType,
        section,
        userId,
        jamCode
    };
};

export default connect(mapStateToProps, null)(Settings);
