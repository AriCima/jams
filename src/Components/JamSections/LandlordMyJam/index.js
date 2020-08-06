
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../../../../redux/actions/jamSection';

// CSS
import './index.css';

const LandlordMyJam = (props) => {

    const { setJamSection, jamId } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    return (

        <div className="jam-myJam">
            MY MY MY MY JAM
            <h1>{jamId}</h1>
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('myJam'))
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordMyJam);