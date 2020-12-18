import React, { useState }from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import {setSubSection } from '../../../../redux/actions/navigateActions';
import NewRoomForm from '../../../Forms/NewRoomForm';

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

const RoomsOverview = ({ jamId, rooms, roomsTenants, setSubSection }) => {    

    const [ showAddRoom, setShowAddRoom ] = useState(false);


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


  
    return (

        <div className="rooms-overview-wrapper">

            <div className="rooms-overview-header">
                <div className="rooms-overview-header-title">
                    <h4>Roons list</h4>
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

            { !showAddRoom && (
                <div className="rooms-overview-header-buttonsArea">
                    <div 
                        className="addRoom-button"
                        onClick={(e) => {e.preventDefault(); setShowAddRoom(true)}}
                    >
                        Add Room
                    </div>
                </div>
            )}

            <div className={`newRoomForm-wrapper ${showAddRoom ? 'newRoomActive' : ''}`}>
                <NewRoomForm
                    rooms={rooms}
                    showForm={setShowAddRoom}
                    roomNr=''
                />
            </div>

            {/* {showAddRoom &&
                <NewRoomForm
                    rooms={rooms}
                    showForm={setShowAddRoom}
                    roomNr=''
                />
            } */}

        </div>

    );
};
const mapStateToProps = (state) => {
    const { jamId } = state.nav;

    return { jamId }
};

export default connect(mapStateToProps, { setSubSection })(RoomsOverview);