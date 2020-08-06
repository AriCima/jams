// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Calculations from '../../../../../services/Calculations';
import { setJamSection } from '../../../../../../redux/actions/jamSection';
import { changeRoomId } from     "../../../../../../redux/actions/roomsId";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'


// CSS
import './index.css';

const LandlordNavBar = ({ setJamSection, changeRoomId, jamName, jamType}) => {

    const [jamSections, setJamSections] = useState([]);

    const onSelectJamSection = (section) => {
        console.log('jamSelection navBar: ', section);
        setJamSection(section);
        changeRoomId('overview');
    };

    useEffect(() => {
        const sections = Calculations.getJamSections(jamType);
        setJamSections(sections);
    }, [jamType, setJamSections]);

    const renderLandlordNavBar = () => {
        return jamSections.map((section, id) => {
            return jamType === 'Chat' ?
                (
                    <div
                        className="jamAdminNavBar-item" 
                        key={id}
                        onClick={() => onSelectJamSection(`${section}`)}
                    >
                        <FontAwesomeIcon className="navBar-icon-style" icon={faComments} />
                    </div>
                ):(
                    <div
                        className="jamAdminNavBar-item"
                        key={id}
                        onClick={() => onSelectJamSection(`${section}`)}
                    >
                        {section}
                    </div>
                );
        });
    };

    return ( 
        <div className="jamAdminNavBar">
            {jamSections === undefined ? <p>NO JAM SELECTED</p> :(
                <>
                    {jamType !== 'chat' ?
                        (
                            <>
                                <div className="jamAdminNavBar-left">
                                    <div className="jamAdminNavBar-jamName">
                                        <p>{jamName}</p>
                                    </div>
                                </div>
                                <div className="jamAdminNavBar-right">
                                    {renderLandlordNavBar()}
                                </div>
                            </>
                        ) : (
                            <div className="jamAdminNavBar-chat">
                                {renderLandlordNavBar()}
                            </div>
                        )
                    }
                </>
            )}
        </div>
    );

};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: (section) => dispatch(setJamSection(section)),
        changeRoomId: (roomId) => dispatch(changeRoomId(roomId))
    }
};

const mapStateToProps = (state) => {
    return {
        jamSection: state.jamSection,
        jamId: state.jamId,
        user: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandlordNavBar);
