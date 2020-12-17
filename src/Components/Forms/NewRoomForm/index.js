import React, {useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import { setRegisteredUser } from '../../../redux/actions/userActions.js'

import DataService from '../../services/DataService';

import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

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

const NewRoomForm = ({ jamId, rooms, roomNr, showForm }) => {

    const [disabled, setDisabled] = useState(true);
    const [sqm, setSqm] = useState('');
    const [exterior, setExterior] = useState('no');
    const [balcony, setBalcony] = useState('no');
    const [privBath, setPrivBath] = useState('no');
    const [nextRoomNr, setNextRoomNr] = useState('');
    
    useEffect(() => {
        if (roomNr === '') {
            const roomsNr = rooms.length;
            setNextRoomNr(roomsNr+1);
            setDisabled(false);
        } else {
            const r = rooms[roomNr];
            setSqm(rooms[roomNr].sqm);
            setBalcony(r.balcony);
            setPrivBath(r.privBath);
            setExterior(r.exterior);
            setNextRoomNr(roomNr);
        };
    },[roomNr])


    const defaultValues = {
        roomNr: nextRoomNr,
        sqm: sqm,
        balcony: balcony,
        exterior: exterior,
        privBath: privBath
    }

    const enableEditForm = (x) => {
        setDisabled(!x)
        showForm(false)
    };

    const { register, errors, handleSubmit, control } = useForm({defaultValues});

    const onSubmit = (data) => {
        console.log(data);
        DataService.addRoomToJam(jamId, data);
    };

    console.log('nextRoomNr: ', nextRoomNr);
    console.log('balcony :', balcony)
    return ( 
        <div className="roomInfo-wrapper">
            <form
                autocomplete="off"
                className="roomInfo-form"
                onSubmit={ handleSubmit(onSubmit) }
            >
                <div className="roomInfo-form-header">
                    <div className="roomInfo-header-title">
                        <h4>Manage all the information about the room here</h4>
                    </div>

                    <div className="roomInfo-buttonArea">
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
                                    onClick={(e) => {e.preventDefault(); enableEditForm(false)}}
                                >
                                    Cancel
                                </div>
                            </>
                        )}
                    </div>
                    
                </div>

                <div className="roomInfo-section">
                    
                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Room Nr</label>
                        </div>
                        <input
                            className="inputDisabled"
                            name="rooNr"
                            ref={register({required: true})}
                            disabled={true}
                            defaultValue={defaultValues.roomNr}

                        />
                    </div>

                    <div className="roomInfo-input-block midWidth">
                        <div className="block-label">
                            <label>Sqm</label>
                        </div>
                        <input
                            name="sqm"
                            ref={register({required: true})}
                            defaultValue={defaultValues.sqm}
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
                            <label>Is the room exterior ?</label>
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
                                                    disabled={disabled}
                                                />
                                            </div>
                                            <div className="radio-box">
                                                <FormControlLabel
                                                    value="no"
                                                    control={<RedRadio />}
                                                    disabled={disabled}
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
                            <label>Has the room balcony ?</label>
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
                                                        disabled={disabled}
                                                    />
                                                </div>
                                                <div className="radio-box">
                                                    <FormControlLabel
                                                        value="no"
                                                        control={<RedRadio />}
                                                        disabled={disabled}
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
                            <label>Has the room a private bathroom ?</label>
                        </td>
                        <td id="rules-value">
                            <section>
                                <Controller
                                    name="privBath"
                                    control={control}
                                    defaultValue={defaultValues.privBath}
                                    disabled={disabled}
                                    as={
                                        <RadioGroup aria-label="privBath">
                                            <div className="radios-wrapper">
                                                <div className="radio-box">
                                                    <FormControlLabel
                                                        value="yes"
                                                        control={<GreenRadio />}
                                                        disabled={disabled}
                                                    />
                                                </div>
                                                <div className="radio-box">
                                                    <FormControlLabel
                                                        value="no"
                                                        control={<RedRadio />}
                                                        disabled={disabled}
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
    const { jamName, jamDesc, jamType } = state.jamInfo;
    const { jamId } = state.nav;
    const { userId, firstName, lastName, email } = state.userInfo;

    return { jamId, userId, firstName, lastName, email, section, jamName, jamDesc, jamType };
};


export default connect(mapStateToProps, { setRegisteredUser })(NewRoomForm);