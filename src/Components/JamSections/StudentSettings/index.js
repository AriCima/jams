
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../redux/actions/jamSection';
import NewAccommodationForm from '../../Forms/NewAccommodationForm';


// CSS
import './index.css';

const StudentSettings = (props) => {

    const { setJamSection, jamId } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    return (

        <div className="jam-settings">
            SE TI NG S
            <h1>{jamId}</h1>
            <NewAccommodationForm />
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('settings'))
    }
}

const mapStateToProps = (state) => {
    //console.log('state en el jamNavBar = ', state)
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentSettings);