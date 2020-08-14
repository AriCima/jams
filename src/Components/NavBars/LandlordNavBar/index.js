// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Calculations from '../../services/Calculations';
import { setJamSection } from '../../../redux/actions/jamSection';
import { changeRoomId } from     "../../../redux/actions/roomsId";
import { setSection, setSubSection } from     "../../../redux/actions/navigateActions";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'


// CSS
import './index.css';

const LandlordNavBar = ({ setSection, setSubSection, setJamSection, changeRoomId, jamName, jamType}) => {

    const [jamSections, setJamSections] = useState([]);

    const onSelectJamSection = (section) => {
        // setJamSection(section);
        setSection(section);
        setSubSection('');
        // changeRoomId('overview');
    };

    useEffect(() => {
        const sections = Calculations.getJamSections(jamType);
        console.log('sections: ', sections);
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setJamSection: (section) => dispatch(setJamSection(section)),
//         changeRoomId: (roomId) => dispatch(changeRoomId(roomId))
//     }
// };

const mapStateToProps = (state) => {
    const { section, subSection } = state.nav;
    return {
        // jamSection: state.jamSection,
        // jamId: state.jamId,
        // user: state.firebase.auth,
        section,
        subSection
    }
};

// export default connect(mapStateToProps, mapDispatchToProps)(LandlordNavBar);
export default connect(mapStateToProps, { setSection, setSubSection })(LandlordNavBar);
