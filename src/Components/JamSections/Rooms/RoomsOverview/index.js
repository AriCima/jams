import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DataService from '../../../services/DataService';
import {setSubSection } from '../../../../redux/actions/navigateActions';
import NewRoomForm from '../../../Forms/NewRoomForm';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const RoomsOverview = ({ jamId, rooms, setSubSection }) => {        
    console.log('rooms: ', rooms);
    const [ showAddRoom, setShowAddRoom ] = useState(false);
    const [ updatedRooms, setUpdatedRooms ] = useState(rooms)
   

    const showRoomInfo = (i) => {
        const roomNr = (i+1).toString();
        setSubSection(roomNr)
    };
    
    const renderRoomsChart = () => rooms.map((room, i) => {
        const currentTenant = room.currentTenant;
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
                {rooms.length !== 0 && renderRoomsChart()}
            </table>

            { !showAddRoom && (
                <div className="rooms-overview-header-buttonsArea">
                    <div 
                        className="addRoom-button"
                        onClick={(e) => {e.preventDefault(); setShowAddRoom(true)}}
                    >
                        <FontAwesomeIcon
                            className="addRoomIcon"
                            icon={faPlus}
                        />
                        <p>Add a new Room</p>
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

        </div>

    );
};

const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { jammers, rooms } = state.jamInfo;
    return { jamId, jammers, rooms }
};

export default connect(mapStateToProps, { setSubSection })(RoomsOverview);