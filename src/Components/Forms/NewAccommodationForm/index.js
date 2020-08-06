import React, { useState } from 'react';
import { connect } from 'react-redux';
import DataService from '../../../../services/DataService';
// import CountrySelect from '../../UI/CountrySelection';
import CustomInputField from '../../../CustomInputField';
import CustomSelectInputField from '../../../CustomSelectInputField';
import ButtonPlain from '../../../ButtonPlain';

// CSS
import './index.css';

const NewAccommodationForm = (props) => {
    const { jamId } = props;
    const [accInfo, setaccInfo] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setaccInfo(accInfo => ({ ...accInfo, [event.target.id]: event.target.value }));
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        const jamField = 'accommodationInfo';
        DataService.updateJamInfo(jamId, jamField, accInfo);
    };

    return (
        <form className="new-apartment-form" onSubmit={handleSubmit}>

            <div className="form-header">
                <div className="form-header-line">
                    <h3>New Accommodation Form</h3>
                </div>
                <div className="form-header-line">
                    <p>Apartment and Contract Information</p>
                </div>
            </div>

            <div className="form-body">

                <div className="form-row">
                    <div className="form-row-title">
                        <h3>Landlord Information</h3>
                    </div>

                    <CustomSelectInputField
                        width="120px"
                        placeholder="title"
                        id="landlordTitle"
                        onChange={handleInputChange}
                        value={accInfo.landlordTitle}
                        options={[
                            { value: 'Mrs.', text: 'Mrs.' },
                            { value: 'Mr.', text: 'MR.' },
                        ]}
                    />

                    <CustomInputField
                        width="400px"
                        label="Name"
                        type="text"
                        id="landlordName"
                        placeholder="Name"
                        value={accInfo.landlordName}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="400px"
                        label="Surname"
                        type="text"
                        id="landlordSurname"
                        placeholder="Surnames"
                        value={accInfo.landlordName}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="400px"
                        label="IdNumber"
                        type="text"
                        id="landlordIdNumber"
                        placeholder="ID number"
                        value={accInfo.landlordIdNumber}
                        changeControl={handleInputChange}
                    />
                    <div className="form-row-title">
                        <h3>Landlord legal residence</h3>
                    </div>

                    <CustomInputField
                        width="400px"
                        label="street"
                        type="text"
                        id="landlordStreet"
                        placeholder="Street"
                        value={accInfo.landlordStreet}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="60px"
                        label="House Nr"
                        id="landlordHouseNr"
                        placeholder="House Nr"
                        value={accInfo.landlordHouseNr}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="60px"
                        label="Floor"
                        type="text"
                        id="landlordFloor"
                        placeholder="Floor"
                        value={accInfo.landlordFloor}
                        changeControl={handleInputChange}
                    />
                </div>
                <div className="form-row">
                    <CustomInputField
                        width="60px"
                        label="landlordDoor"
                        type="text"
                        id="landlordDoor"
                        placeholder="Door"
                        value={accInfo.landlordDoor}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="80px"
                        label="landlordZip-Code"
                        type="text"
                        id="landlordZipCode"
                        placeholder="Zip-code"
                        value={accInfo.landlordZipCode}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="400px"
                        label="LandlordCity"
                        type="text"
                        id="LandlordCity"
                        placeholder="City"
                        value={accInfo.LandlordCity}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="120px"
                        label="landlordCountry"
                        type="text"
                        id="landlordCountry"
                        placeholder="Country"
                        value={accInfo.landlordCountry}
                        changeControl={handleInputChange}
                    />
                </div>
                <div className="form-row">

                    <div className="form-row-title">
                        <h3>Apartment Information</h3>
                    </div>

                    <CustomInputField
                        width="400px"
                        label="houseName"
                        type="text"
                        id="houseName"
                        placeholder="House Name / ID"
                        value={accInfo.houseName}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="400px"
                        label="houseStreet"
                        type="text"
                        id="houseStreet"
                        placeholder="Street"
                        value={accInfo.houseStreet}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="60px"
                        label="House Nr"
                        id="houseNr"
                        placeholder="House Nr"
                        value={accInfo.houseNr}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="60px"
                        label="houseFloor"
                        type="text"
                        id="houseFloor"
                        placeholder="houseFloor"
                        value={accInfo.houseFloor}
                        changeControl={handleInputChange}
                    />
                </div>
                <div className="form-row">
                    <CustomInputField
                        width="60px"
                        label="Door"
                        type="text"
                        id="door"
                        placeholder="Door"
                        value={accInfo.door}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="80px"
                        label="Zip-Code"
                        type="text"
                        id="zipCode"
                        placeholder="Zip-code"
                        value={accInfo.zipCode}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="400px"
                        label="City"
                        type="text"
                        id="city"
                        placeholder="City"
                        value={accInfo.city}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="120px"
                        label="country"
                        type="text"
                        id="country"
                        placeholder="Country"
                        value={accInfo.country}
                        changeControl={handleInputChange}
                    />
                </div>
                <div className="form-row">

                    <CustomInputField
                        width="120px"
                        label="sqm"
                        type="text"
                        id="sqm"
                        placeholder="sqm"
                        value={accInfo.sqm}
                        changeControl={handleInputChange}
                    />

                    <CustomInputField
                        width="120px"
                        label="bathrooms"
                        type="text"
                        id="bathrooms"
                        placeholder="bathrooms"
                        value={accInfo.bathrooms}
                        changeControl={handleInputChange}
                    />
                    <CustomInputField
                        width="120px"
                        label="toilets"
                        type="text"
                        id="toilets"
                        placeholder="toilets"
                        value={accInfo.toilets}
                        changeControl={handleInputChange}
                    />


                </div>
                <div className="button-area">
                    <ButtonPlain
                        type="submit"
                        buttonText="Submit"
                    />
                </div>

            </div>
        </form>
    );
};

const mapStateToProps = (state) => ({
    user: state.firebase.auth,
    jamId: state.jamId,
});
export default connect(mapStateToProps, null)(NewAccommodationForm);
