import React, { useState } from 'react';
import DataService from '../../services/DataService';

import CustomInputField from '../CustomInputField';
import ButtonPlain from '../ButtonPlain';
import { connect } from 'react-redux';

// CSS
import './index.css'; 

const CustomizeJamForm = ( props ) => {
    const { jamId } = props;
    
    const handleCloseJamCustomization = () => {
        const jamField = 'jamType'
        const newInfo = false;
        DataService.update(jamId, jamField, newInfo)
    
    }

    const handleSubmit = (jamType) => {
        if (jamType) {
            jamType.preventDefault();
        }

        const jamField = 'jamType';
        const newInfo = jamType;
    
        DataService.update(jamId, jamField, newInfo)
    }

    return (
        <React.Fragment>
            <form className="customize-jam-form" onSubmit={handleSubmit}>
                
                <div className="form-header">
                    <div className="form-header-line">
                        <h3>Customize your Jam</h3>
                    </div>
                    <div className="form-header-line">
                        <p>Select one of the following options of just cancel</p>
                    </div>
                </div>

                <div className="form-body">
                
                    <div className="form-row">
                        
                        <div
                            onClick={() => {handleSubmit(`accommodation`)} }
                        >
                            <p>Students Sahre Apartment</p>
                        </div>
                        
                    </div>
                    <div className="button-area"
                        onClick={handleCloseJamCustomization}
                    >
                        <ButtonPlain  
                            type="cancel"
                            buttonText='cancel'
                        />
                    </div>

                </div>
            </form>
            <div className="form-bg"/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, null)(CustomizeJamForm);