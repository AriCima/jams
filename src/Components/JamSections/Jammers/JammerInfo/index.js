import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import DataService from '../../../services/DataService';
import StartChatButton from '../../../UI/Buttons/StartChatButton';
// import JammerContractInfo from '../../../Reusables/JammerContractInfo';
// import JammerPersonalInfo from '../../../Reusables/JammerPersonalInfo';
// import TenantPersonalInfo from '../../../Reusables/TenantPersonalInfo';

// CSS
import './index.scss';

const JammerInfo = ({
  jamId,
  jamName,
  lastName,
  // userRole,
  firstName,
  userId,
  docId,

}) => {
  
  const [tenantInfo, setTenantInfo] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    // let documentId;
    // if (userRole === 'Admin'){
    //   documentId = docId;
    // } else {
    //   documentId = userId
    // }
    DataService.getJammerInfo(jamId, docId)
    .then(res => {
      setTenantInfo(res)
    })
  }, [jamId, docId])

  const enableEditForm = (x) => {
    setDisabled(!x)
  };

  const defaultValues = {
    city: tenantInfo.city,
    country: tenantInfo.country,
    email: tenantInfo.email, 
    firstName: tenantInfo.firstName, 
    lastName: tenantInfo.lastName, 
    mobile: tenantInfo.mobile,
    passport: tenantInfo.passport, 
    homeAddress: tenantInfo.homeAddress, 
    homeTel: tenantInfo.homeTel, 
    zipCode: tenantInfo.zipCode, 
    checkIn: tenantInfo.checkIn,
    checkOut: tenantInfo.checkOut,
    roomNr: tenantInfo.roomNr,
    rent: tenantInfo.rent,
    deposit: tenantInfo.deposit,
  }
  
  const { register, errors, handleSubmit, control } = useForm({defaultValues});

  const onSubmit = (data) => {

    DataService.editJammerInfo(jamId, docId, data)

  };

  return(
    <div className="tenant-info-wrapper">
      {docId && tenantInfo.length !== 0 ? (

        <form
          autocomplete="off"
          className="tenant-info-form"
          onSubmit={ handleSubmit(onSubmit) }
        >
                <div className="tenant-info-form-header">
                  
                  <div className="tenant-info-header-left">
                    <div className="tenant-picture">
                      <FontAwesomeIcon
                        className="userCircle-icon"
                        icon={faUserCircle}
                      />
                    </div>

                    <div className="tenant-info-header-name">
                      <p>{tenantInfo.firstName} {tenantInfo.lastName}</p>
                    </div>

                    <div className="start-chatButton">
                      <StartChatButton 
                        user1Name={firstName}
                        user1LastName={lastName}
                        user1Id={userId}
                        user2Name={tenantInfo.firstName}
                        user2LastName={tenantInfo.lastName}
                        user2Id={docId}
                        jamName={jamName}
                      />
                    </div>

                  </div>

                  <div className="tenant-info-buttonArea">
                        { disabled ? (
                            <div 
                                className="edit-button"
                                onClick={(e) => {enableEditForm(true)}}
                            >
                                Edit Info
                            </div>
                            ) : (
                            <>
                                <input type="submit"/>
                                <div 
                                    className="cancel-button"
                                    onClick={(e) => {enableEditForm(false)}}
                                >
                                    Cancel
                                </div>
                            </>
                        )}
                    </div>
                   
                </div>


                <div className="tenant-info-section">

                    {/* * * * * * * PERSONAL INFO * * * * * * */}
                     <div className="tenant-info-section sectionRow">

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label">
                              <label>Name</label>
                              {errors.firstName && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.firstName}
                            name="firstName"
                            ref={register({required: true})}
                            disabled={disabled}
                            />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label">
                              <label>Last name</label>
                              {errors.lastName && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.lastName}
                            name="lastName"
                            ref={register({required: true})}
                            disabled={disabled}
                            />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Email</label>
                                {errors.email && <div className="field-error">Required</div>}
                            </div>
                            <input
                              className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                              defaultValue={defaultValues.email}
                              name="email"
                              ref={register({required: true})}
                              disabled={disabled}
                            />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label">
                              <label>Passport Nr</label>
                              {errors.passport && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.passport}
                            name="passport"
                            ref={register({required: true})}
                            disabled={disabled}
                          />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label">
                              <label>Home Telephone</label>
                              {errors.homeTel && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.homeTel}
                            name="homeTel"
                            ref={register({required: true})}
                            disabled={disabled}
                          />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label">
                              <label>Mobile</label>
                              {errors.mobile && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.mobile}
                            name="mobile"
                            ref={register({required: true})}
                            disabled={disabled}
                          />
                        </div>

                    </div>

                    <div className="backLine"/> 

                    {/* * * * * * * HOME ADDRESS * * * * * * */}
                    <div className="tenant-info-section sectionRow">

                        <div className="tenant-info-input-block">
                            <div className="block-label">
                                <label>Home address (Street, house nr, floor, door)</label>
                                {errors.homeAddress && <div className="field-error">Required</div>}
                            </div>
                            <input
                              className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                              name="homeAddress"
                              defaultValue={defaultValues.homeAddress}
                              ref={register({required: true})}
                              disabled={disabled}/>
                        </div>

                        <div className="tenant-info-input-block short-block">
                          <div className="block-label ">
                              <label>Zip Code</label>
                              {errors.zipCode && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.zipCode}
                            name="zipCode"
                            ref={register({required: true})}
                            disabled={disabled}
                          />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label ">
                              <label>City</label>
                              {errors.city && <div className="field-error">Required</div>}
                          </div>
                          <input
                            className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                            defaultValue={defaultValues.city}
                            name="city"
                            ref={register({required: true})}
                            disabled={disabled}
                          />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>Country</label>
                                {errors.city && <div className="field-error">Required</div>}
                            </div>
                            <input
                              className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                              defaultValue={defaultValues.country}
                              name="city"
                              ref={register({required: true})}
                              disabled={disabled}
                            />
                        </div>

                    </div>

                    <div className="backLine"/> 
                    
                    {/* * * * * * * CONTRACT INFO * * * * * * */}
                    <div className="tenant-info-section sectionRow">

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label ">
                            <label>Check In</label>
                            {errors.checkIn && <div className="field-error">Required</div>}
                          </div>
                          <Controller
                              as={ReactDatePicker}
                              control={control}
                              disabled={disabled}
                              valueName="checkIn" // DateSelect value's name is selected
                              onChange={([checkIn]) => checkIn}
                              dateFormat="dd/MMMyyyy"
                              name="checkIn"
                              // className="input"
                              className={`input ${disabled ? "inputDisabled" : "inputEnabled"}`}
                              defaultValue={moment(defaultValues.checkIn).format('DD-MMM-YYYY')}
                          />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                          <div className="block-label ">
                            <label>Check Out</label>
                            {errors.checkOut && <div className="field-error">Required</div>}
                          </div>        
                          <Controller
                              as={ReactDatePicker}
                              control={control}
                              disabled={disabled}
                              valueName="selected" // DateSelect value's name is selected
                              onChange={([selected]) => selected}
                              dateFormat="dd/MMMyyyy"
                              name="checkOut"
                              className={`input ${disabled ? "inputDisabled" : "inputEnabled"}`}
                              // className="input"
                              defaultValue={moment(defaultValues.checkOut).format('DD-MMM-YYYY')}
                          />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Room Nr</label>
                                {errors.roomNr && <div className="field-error">Required</div>}
                            </div>
                            <input
                              className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                              defaultValue={defaultValues.roomNr}
                              name="roomNr"
                              ref={register({required: true})}
                              disabled={disabled}
                            />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Rent €/Mo</label>
                                {errors.rent && <div className="field-error">Required</div>}
                            </div>
                            <input
                              className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                              defaultValue={defaultValues.rent}
                              name="rent"
                              ref={register({required: true})}
                              disabled={disabled}
                            />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Depoist €</label>
                                {errors.deposit && <div className="field-error">Required</div>}
                            </div>
                            <input
                              className={`${disabled ? "inputDisabled" : "inputEnabled"}`}
                              defaultValue={defaultValues.deposit}
                              name="deposit"
                              ref={register({required: true})}
                              disabled={disabled}
                            />
                        </div>


                    </div>
                </div>



            </form>

      ):(
        <useInviteJammerForm 
          jamId={jamId}/>
     )}
    </div>
  )
}


const mapStateToProps = state => {
  const { jamId } = state.nav;
  const { docId } = state.doc;
  const { jamName } = state.jamInfo;
  const { userId , firstName, lastName, userRole } = state.userInfo

  return { jamId, jamName, docId, userId, userRole, firstName, lastName }
};
  
export default connect(mapStateToProps, null) (JammerInfo);
