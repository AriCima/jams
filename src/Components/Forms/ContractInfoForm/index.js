import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../../../../redux/actions/jamSection';
import CustomInputFieldWithLabel from '../../../../../../../UI/CustomInputFieldWithLabel';
import ButtonSubmit from '../../../../../../../UI/ButtonSubmit';

// CSS
import './index.css';

const ContractInfoForm = (props) => {

    // VER QUÉ PROPS VIENEN
    const { jamId, jamName } = props;
    const [contractInfo, setContractInfo] = useState({});

    const handleJamInfoChange = (event) => {
        event.persist();
        setContractInfo(contractInfo => ({ ...contractInfo, [event.target.id]: event.target.value }));
    };


    const saveCotnractInfo = (e) => {
        e.preventdefault();
    };


    return (

        <div className="contract-info-form">
            <div className="contract-info-form-section">
                <div className="contract-info-form-section-title">
                    <h2>Jam Info</h2>
                    <form onSubmit={saveCotnractInfo}>
                        <div className="form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Name"
                                id="jamName"
                                value={jamInfo.jamName}
                                changeControl={handleJamInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Description"
                                id="jamDesc"
                                value={jamInfo.jamDesc}
                                changeControl={handleJamInfoChange}
                            />
                        </div>
                        <div className="form-button-area">
                            <ButtonSubmit />
                        </div>
                    </form>
                </div>
            </div>
            <div className="contract-info-form-section">
                <div className="contract-info-form-section-title">
                    <h2>Apartment Info</h2>
                    <p>
                        We
                        <span> strongly </span>
                        recomend you to fill the information about the apartment location in order to be able to automaticallyprint a contract upon a reception of a booking
                    </p>
                    <form onSubmit={updateAccInfo}>
                        <div className="form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Address"
                                id="jamAddress"
                                value={accInfo.jamAddress}
                                changeControl={handleAccInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Zip-Code"
                                id="jamZipCode"
                                value={accInfo.jamZipCode}
                                changeControl={handleAccInfoChange}
                            />
                        </div>
                        <div className="form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="City"
                                id="jamCity"
                                value={accInfo.jamCity}
                                changeControl={handleAccInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Country"
                                id="jamCountry"
                                value={accInfo.jamCountry}
                                changeControl={handleAccInfoChange}
                            />
                        </div>
                        <div className="form-button-area">
                            <ButtonSubmit />
                        </div>
                    </form>
                </div>
            </div>
            <div className="contract-info-form-section">
                <div className="contract-info-form-section-title">
                    <h2>Landlord Info</h2>
                    <p>
                        We
                        <span>strongly</span>
                        recomend you to fill the landlord information. Important: the
                        <span>`&quote;`landlord`&quote;`</span>
                        is the person who will sing the rent contract
                    </p>
                    <form onSubmit={updateLandlordInfo}>
                        <div className="form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Name"
                                id="landlordName"
                                value={landlordInfo.landlordName}
                                changeControl={handleLandlordInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Surname"
                                id="landlordSurname"
                                value={landlordInfo.landlordSurname}
                                changeControl={handleLandlordInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="ID number"
                                id="landlordIdNumber"
                                value={landlordInfo.landlordIdNumber}
                                changeControl={handleLandlordInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="ID number"
                                id="landlordAddress"
                                value={landlordInfo.landlordAddress}
                                changeControl={handleLandlordInfoChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Zip-Code"
                                id="landlordZipCode"
                                value={landlordInfo.landlordZipCode}
                                changeControl={handleLandlordInfoChange}
                            />
                        </div>
                        <div className="form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="City"
                                id="landlordCity"
                                value={landlordInfo.landlordCity}
                                changeControl={handleLandlordInfoChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width="200px"
                                label="Country"
                                id="jamCountry"
                                value={landlordInfo.jamCountry}
                                changeControl={handleLandlordInfoChange}
                            />
                        </div>
                        <div className="form-button-area">
                            <ButtonSubmit />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('settings')),
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractInfoForm);
