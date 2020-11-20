
import React from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import Switch from '@material-ui/core/Switch';
import DataService from '../../services/DataService';

import './index.scss';

const Settings = ({
    jamDesc,
    jamDetails,
    jamId,
    jamName,
}) => {
    const defaultValues = {
        jamName: jamName,
        jamDesc: jamDesc,
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
        nrOfRooms: jamDetails.nrOfRooms,
    };


    const { register, errors, handleSubmit, control } = useForm({defaultValues});

    const onSubmit = (data) => {
        console.log(data)
        
        const {
            address,
            checkInFrom,
            checkInProcess,
            checkInTo,
            checkOutBefore,
            checkOutProcess,
            jamDesc,
            jamName,
            nrOfRooms,
            overnight,
            parties,
            pets,
            smoking,
            smokingBalcony,
        } = data;

        const editJamMainInfo = jamName !== defaultValues.jamName || jamDesc !== defaultValues.jamDesc;

        const editJamDetails = address !== defaultValues.address || nrOfRooms !== defaultValues.nrOfRooms;

        const editHouseRules = (
            checkInProcess !== defaultValues.checkInProcess || checkOutProcess !== defaultValues.checkOutProcess || 
            checkInFrom !== defaultValues.checkInFrom || checkInTo !== defaultValues.checkInTo || 
            checkOutBefore !== defaultValues.checkOutBefore || pets !== defaultValues.pets || 
            parties !== defaultValues.parties || overnight !== defaultValues.overnight || 
            smokingBalcony !== defaultValues.smokingBalcony || smoking !== defaultValues.smoking
        );

        
        if(editJamMainInfo) {
            const info = {jamName, jamDesc};
            DataService.editJamMainInfo(jamId, info);
        };
        if(editJamDetails) {
            const info = {address, nrOfRooms};
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
                smokingBalcony
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

                    <h4>Manage all the information about your <span>{jamName}</span> here</h4>

                    <div className="settings-buttonArea">
                        <input type="submit"/>
                    </div>
                </div>


                <div className="settings-section">
                    <div className="settings-section-title">
                        <div className="backLine"/>
                        <dic className="title">
                            <p>JAM INFO</p>
                        </dic>
                    </div>
                    <div className="settings-section-info">
                        <div className="rules-custom-input-block midWidth">
                            <div className="block-label">
                                <label>Jam Name</label>
                                {errors.jamName && <div className="field-error">Required</div>}
                            </div>
                            <input name="jamName" ref={register({required: true})}/>
                        </div>
                        <div className="rules-custom-input-block textAreaBlock">
                            <div className="block-label">
                                <label>Jam Description</label>
                                {errors.jamDesc && <div className="field-error">Required</div>}
                            </div>
                            <textarea name="jamDesc" ref={register({required: true})}/>
                        </div>
                        <div className="rules-custom-input-block">
                            <div className="block-label">
                                <label>Apartment location</label>
                                {errors.address && <div className="field-error">Required</div>}
                            </div>
                            <input name="address" placeholder="Street, hosue nr, floor, door, city, zipCode, country" ref={register({required: true})}/>
                        </div>
                        <div className="rules-custom-input-block shortWidth">
                        <div className="block-label">
                            <label>Nr of rooms</label>
                            {errors.nrOfRooms && <div className="field-error">Required</div>}
                        </div>
                        <input name="nrOfRooms" ref={register({required: true})}/>
                    </div>
                    </div>
                </div>

                <div className="settings-section">

                    <div className="settings-section-title">
                        <div className="backLine"/>
                        <dic className="title">
                            <p>CHECK-IN / CHECK-OUT </p>
                        </dic>
                    </div>
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
                            />
                        </div>
                    </div>
                </div>

                <div className="settings-section">

                    <div className="settings-section-title">
                        <div className="backLine"/>
                        <dic className="title">
                            <p>HOUSE RULES</p>
                        </dic>
                    </div>

                    <div className="settings-content rules">

                        <div className="houseRules-form-section">
                            <div className="form-col">
                                <div className="houseRules-text">
                                    <p>Please activate the rules you want to apply to your apartment</p>
                                    <p>Activated rules will be shown in your tenant's <span>"Overview"</span> page</p>
                                </div>
                                <table id="houseRules-table">
                                    <tr>
                                        <td id="rules-text">
                                            <label>Pets are not allowed in the flat</label>
                                        </td>
                                        <td id="rules-value">
                                        <section>
                                                <Controller
                                                name="pets"
                                                control={control}
                                                render={(props) => (
                                                    <Switch
                                                    onChange={(e) => props.onChange(e.target.checked)}
                                                    checked={props.value}
                                                    />
                                                )}
                                            />
                                        </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Smoking is not allowed</label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="smoking"
                                                    control={control}
                                                    render={(props) => (
                                                        <Switch
                                                        onChange={(e) => props.onChange(e.target.checked)}
                                                        checked={props.value}
                                                        />
                                                    )}
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Smoking is only allowed in balconies </label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                name="smokingBalcony"
                                                control={control}
                                                    render={(props) => (
                                                        <Switch
                                                        onChange={(e) => props.onChange(e.target.checked)}
                                                        checked={props.value}
                                                        />
                                                    )}
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Guest to overnight are not allowed </label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="overnight"
                                                    control={control}
                                                        render={(props) => (
                                                            <Switch
                                                            onChange={(e) => props.onChange(e.target.checked)}
                                                            checked={props.value}
                                                            />
                                                        )}
                                                />
                                            </section>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="rules-text">
                                            <label>Parties are not allowed in the flat </label>
                                        </td>
                                        <td id="rules-value">
                                            <section>
                                                <Controller
                                                    name="parties"
                                                    control={control}
                                                        render={(props) => (
                                                            <Switch
                                                            onChange={(e) => props.onChange(e.target.checked)}
                                                            checked={props.value}
                                                            />
                                                        )}
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
    const { jamName, jamDesc, jamType, jamDetails } = state.jamInfo;
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
    };
};

export default connect(mapStateToProps, null)(Settings);
