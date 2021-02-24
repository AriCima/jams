import React, {useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import { setRegisteredUser } from '../../../redux/actions/userActions.js'

import DataService from '../../services/DataService';

import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { EventEmitter } from '../../services//utils/EventEmitter';

import {
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";

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

const NewRoomForm = ({ jamId, showForm, nrOfRooms }) => {

    // const [nextRoomNr, setNextRoomNr] = useState('');

    // useEffect(() => {
    //     const roomsNr = rooms.length;
    //     setNextRoomNr(roomsNr+1);
    // },[rooms])

    const nextRoomNr = (parseInt(nrOfRooms)+1).toString();

    const defaultValues = {
        roomNr: nextRoomNr,
        sqm: '',
        balcony: 'no',
        exterior: 'no',
        privBath: 'no',
        deposit: '',
        rent: '',
        expenses: ''
    };

    const { register, errors, handleSubmit, control } = useForm({defaultValues});
    
    const onSubmit = (data) => {
        // console.log('data: ', data);
        data.roomNr = defaultValues.roomNr;
        DataService.addRoomToJam(jamId, data);
        showForm(false)
        EventEmitter.emit('newRoomAdded', null );
    };

    return ( 
        <div className="roomInfo-wrapper">
            <form
                autocomplete="off"
                className="roomInfo-form"
                onSubmit={ handleSubmit(onSubmit) }
            >
                <div className="roomInfo-form-header">
                    <div className="roomInfo-header-title">
                        <h4>Room info jelou</h4>
                    </div>

                    <div className="roomInfo-buttonArea">

                        <input type="submit"/>
                        <div 
                            className="cancel-button"
                            onClick={(e) => {e.preventDefault(); showForm(false)}}
                        >
                            Cancel
                        </div>
                       
                    </div>
                    
                </div>

                <div className="roomInfo-section">
                    
                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Room Nr</label>
                        </div>
                        <input
                            className="inputDisabled"
                            name="roomNr"
                            ref={register({required: true})}
                            disabled={true}
                            defaultValue={defaultValues.roomNr}
                        />
                    </div>

                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Sqm</label>
                            {errors.sqm && <div className="field-error">Required (approx)</div>}
                        </div>
                        <input
                            name="sqm"
                            ref={register({required: true})}
                            defaultValue={defaultValues.sqm}
                        />
                    </div>

                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Rent €/Mo</label>
                            {errors.rent && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="rent"
                            ref={register({required: true})}
                            defaultValue={defaultValues.rent}
                        />
                    </div>

                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Expenses €/Mo</label>
                            {errors.expenses && <div className="field-error">Required (0 if are included in the rent)</div>}
                        </div>
                        <input
                            name="expenses"
                            ref={register({required: true})}
                            defaultValue={defaultValues.expenses}
                        />
                    </div>

                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Deposit €</label>
                            {errors.deposit && <div className="field-error"></div>}
                        </div>
                        <input
                            name="deposit"
                            ref={register({required: true})}
                            defaultValue={defaultValues.deposit}
                        />
                    </div>

                </div>

                <table id="roomInfo-table">
                    <tr>
                        <th>
                            <p>Room features</p>
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
                            <label>Is the room <span>exterior</span> ?</label>
                        </td>
                        <td id="rules-value">
                        <section>
                            <Controller
                                name="exterior"
                                control={control}
                                defaultValue={defaultValues.exterior}
                                as={
                                    <RadioGroup aria-label="exterior">
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
                            <label>Has the room <span>balcony</span> ?</label>
                        </td>
                        <td id="rules-value">
                            <section>
                                <Controller
                                    name="balcony"
                                    control={control}
                                    defaultValue={defaultValues.balcony}
                                    as={
                                        <RadioGroup aria-label="balcony">
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
                            <label>Has the room a <span>private bathroom</span> ?</label>
                        </td>
                        <td id="rules-value">
                            <section>
                                <Controller
                                    name="privBath"
                                    control={control}
                                    defaultValue={defaultValues.privBath}
    
                                    as={
                                        <RadioGroup aria-label="privBath">
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

            </form>
        </div>    
    );
};

const mapStateToProps = state => {
    const { section } = state.nav;
    const { jamName, jamDesc, jamType, nrOfRooms } = state.jamInfo;
    const { jamId } = state.nav;
    const { userId, firstName, lastName, email } = state.userInfo;

    return { jamId, userId, firstName, nrOfRooms, lastName, email, section, jamName, jamDesc, jamType };
};


export default connect(mapStateToProps, { setRegisteredUser })(NewRoomForm);