import React, { useState }from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import {setSubSection } from '../../../../redux/actions/navigateActions';
import DataService from '../../../services/DataService';

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

const RoomsOverview = ({ jamId, roomsTenants, setSubSection }) => {    

    const [ showAddRoom, setShowAddRoom ] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const enableEditForm = (x) => {
        setDisabled(!x)
    };

    const showRoomInfo = (roomNr) => {
        setSubSection(roomNr)
    };

    const renderRoomsChart = () => roomsTenants.map((jj, i) => {
        const currentTenant = jj.currentTenants;
        const roomNr =i+1;
        const stringNr = roomNr.toString();
        const isVacant = currentTenant.length === 0;
        return(
            <tr
                onClick={() => {
                    showRoomInfo(i)
                }}
                key={i}
            >
                {isVacant ? 
                    (
                        <>
                            <td id="number-column">{stringNr}</td>
                            <td id="vacant-cell" colspan="5">CURRENTLY VACANT</td>
                        </>
                    )
                    : (
                        <>
                            <td id="number-column">{stringNr}</td>
                            <td className="inner">{currentTenant[0].firstName} {currentTenant[0].lastName}</td>
                            <td>{moment(currentTenant[0].checkIn).format('DD-MMM-YYYY')}</td>
                            <td>{moment(currentTenant[0].checkOut).format('DD-MMM-YYYY')}</td>
                            <td>{currentTenant[0].rent} €</td>
                            <td>{currentTenant[0].deposit} €/Mo</td>
                        </>

                    )}
            </tr>
        )
    }
    );

    const { register, errors, handleSubmit, control } = useForm({
        defaultValues: {
            sqm: '1',
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        DataService.addRoomToJam(jamId, data)
    };
  
    return (

        <div className="rooms-overview-wrapper">

            <div className="rooms-overview-header">
                <div className="rooms-overview-header-title">
                    <h4>Roons list</h4>
                </div>
                <div className="rooms-overview-header-buttonsArea">
                    <div 
                        className="addRoom-button"
                        onClick={(e) => {e.preventDefault(); setShowAddRoom(true)}}
                    >
                        Add Room
                    </div>
                </div>
            </div>

            <table id="rooms-info-chart">
                <tr>
                    <th id="number-column">Room Nr</th>
                    <th>Tenant Name</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Rent</th>
                    <th>Deposit</th>
                </tr>
                {roomsTenants.length !== 0 && renderRoomsChart()}
            </table>

            {/* {showAddRoom && (
               <form
                    autocomplete="off"
                    className="tenant-info-form"
                    onSubmit={ handleSubmit(onSubmit) }
                >
                    <div className="tenant-info-input-block shortWidth">
                        <div className="block-label">
                            <label>Room Nr</label>
                        </div>
                        <input
                            className="inputDisabled"
                            defaultValue={roomTenants + 1}
                            name="rooNr"
                            ref={register({required: true})}
                            disabled={true}
                        />
                    </div>

                    <div className="tenant-info-input-block shortWidth">
                        <div className="block-label">
                            <label>Sqm</label>
                        </div>
                        <input
                            name="sqm"
                            defaultValue={defaultValues.sqm}
                            ref={register({required: true})}
                        />
                    </div>

                    <table id="houseRules-table">
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

                </form> */}
            )}

        </div>

    );
};
const mapStateToProps = (state) => {
    const { jamId } = state.nav;

    return { jamId }
};

export default connect(mapStateToProps, { setSubSection })(RoomsOverview);