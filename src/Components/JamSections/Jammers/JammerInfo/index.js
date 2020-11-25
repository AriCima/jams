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
    userRole,
    firstName,
    userId,
    docId,

  }) => {
  
  const [tenantInfo, setTenantInfo] = useState([]);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    let documentId;
    if (userRole === 'Admin'){
      documentId = docId;
    } else {
      documentId = userId
    }
    DataService.getJammerInfo(jamId, documentId)
    .then(res => {
      console.log('res: ', res);
      setTenantInfo(res)
    })
  }, [jamId, docId])


  const enableForm = () => {
    setDisabled(false)
  }

  const enableEditForm = (x) => {
    setDisabled(!x)
  };

  const defaultValues = {
    city: tenantInfo.city,
    country: tenantInfo.country,
    door: tenantInfo.door, 
    email: tenantInfo.email, 
    firstName: tenantInfo.firstName, 
    floor: tenantInfo.floor,
    houseNr: tenantInfo.houseNr,
    lastName: tenantInfo.lastName, 
    mobile: tenantInfo.mobile,
    passpor: tenantInfo.passport, 
    street: tenantInfo.street, 
    homeTel: tenantInfo.homeTel, 
    zipCode: tenantInfo.zipCode, 
    checkIn: tenantInfo.checkIn,
    checkOut: tenantInfo.checkOut
  };
  const { register, errors, handleSubmit, control } = useForm({defaultValues});

  const onSubmit = (data) => {
    console.log(data)
  };

  return(
    <div className="tenant-info-wrapper">
      {docId && tenantInfo.length !== 0 ? (

        <form
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
                            <input name="firstName" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Last name</label>
                                {errors.lastName && <div className="field-error">Required</div>}
                            </div>
                            <input name="lastName" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Email</label>
                                {errors.email && <div className="field-error">Required</div>}
                            </div>
                            <input name="email" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Passport Nr</label>
                                {errors.passport && <div className="field-error">Required</div>}
                            </div>
                            <input name="passport" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Home Telephone</label>
                                {errors.homeTel && <div className="field-error">Required</div>}
                            </div>
                            <input name="homeTel" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label">
                                <label>Mobile</label>
                                {errors.mobile && <div className="field-error">Required</div>}
                            </div>
                            <input name="mobile" ref={register({required: true})} disabled={disabled} />
                        </div>

                    </div>

                    <div className="backLine"/> 

                    {/* * * * * * * HOME ADDRESS * * * * * * */}
                    <div className="tenant-info-section sectionRow">

                        <div className="tenant-info-input-block">
                            <div className="block-label">
                                <label>Home Street</label>
                                {errors.street && <div className="field-error">Required</div>}
                            </div>
                            <input name="street"  ref={register({required: true})} disabled={disabled}/>
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>House Nr</label>
                                {errors.houseNr && <div className="field-error">Required</div>}
                            </div>
                            <input name="houseNr" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Floor</label>
                                {errors.floor && <div className="field-error">Required</div>}
                            </div>
                            <input name="floor" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Door</label>
                                {errors.door && <div className="field-error">Required</div>}
                            </div>
                            <input name="door" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Zip Code</label>
                                {errors.zipCode && <div className="field-error">Required</div>}
                            </div>
                            <input name="zipCode" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>City</label>
                                {errors.city && <div className="field-error">Required</div>}
                            </div>
                            <input name="city" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>Country</label>
                                {errors.city && <div className="field-error">Required</div>}
                            </div>
                            <input name="city" ref={register({required: true})} disabled={disabled} />
                        </div>

                    </div>

                    <div className="backLine"/> 
                    
                    {/* * * * * * * CONTRACT INFO * * * * * * */}
                    <div className="tenant-info-section sectionRow">

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>Check In</label>
                                {errors.checkIn && <div className="field-error">Required</div>}
                                    <Controller
                                        as={ReactDatePicker}
                                        control={control}
                                        valueName="selected" // DateSelect value's name is selected
                                        onChange={([selected]) => selected}
                                        name="checkIn"
                                        className="input"
                                        placeholderText="Check-In"
                                    />
                            </div>
                        </div>

                        <div className="tenant-info-input-block midWidth">
                            <div className="block-label ">
                                <label>Check Out</label>
                                {errors.checkOut && <div className="field-error">Required</div>}
                                    <Controller
                                        as={ReactDatePicker}
                                        control={control}
                                        valueName="selected" // DateSelect value's name is selected
                                        onChange={([selected]) => selected}
                                        name="checkOut"
                                        className="input"
                                        // placeholderText="Check-Out"
                                    />
                            </div>
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Room Nr</label>
                                {errors.roomNr && <div className="field-error">Required</div>}
                            </div>
                            <input name="roomNr" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Rent €/Mo</label>
                                {errors.rent && <div className="field-error">Required</div>}
                            </div>
                            <input name="rent" ref={register({required: true})} disabled={disabled} />
                        </div>

                        <div className="tenant-info-input-block short-block">
                            <div className="block-label ">
                                <label>Depoist €</label>
                                {errors.deposit && <div className="field-error">Required</div>}
                            </div>
                            <input name="deposit" ref={register({required: true})} disabled={disabled} />
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
