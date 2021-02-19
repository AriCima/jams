import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';


import './index.scss';

const useInviteJammerForm = ({jamId, jamName, adminName, jammers}) => {
    // const [ organizedJammers, setOrganizedJammers ] = useState([]);
    // const [ roomsInfo, setRoomsInfo ] = useState({})
    // const [ showModal, setShowModal ] = useState(false);
    // const [ invitationInfo, setInvitationInfo ] = useState({});
    const [ nrOfTenants, setNrOfTenants ] = useState(1)
    const [ nrOfTheRoom, setNrOfTheRoom ] = useState('');
    const [ second, setShowSecond ] = useState(false);
    const [ third, setShowThird ] = useState(false);
    // const [rent, setRent] = useState('');
    // const [deposit, setDeposit] = useState('');
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date()+1);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDesc, setErrorDesc] = useState('');


    const [defaultValues, setDefaultValues] = useState({
        nrOfTenants: 1,
        rent:"",
        deposit: "",
        checkIn,
        checkOut
    });

    const { register, errors, handleSubmit, control, setValue } = useForm({defaultValues});
    
    // useEffect(() => {
    //     if(jammers.length > 0) {
    //         const editedJammers = Calculations.organizeAdminTenants(jammers);
    //         setOrganizedJammers(editedJammers);
    //     };
    // }, [jamId]);

    const getRoomInfo = async () => {
        const res = await DataService.getSingleRoomInfo(jamId, nrOfTheRoom);
        if(!isEmpty(res)) {
            setRoomsInfo(res)
            // console.log('res.rent: ', res.rent);
            // setRent(res.rent);
            // setDeposit(res.deposit);
            setValue('rent', res.rent)
            setValue('deposit', res.deposit)
            setDefaultValues({ 
                nrOfTenants: 1,
                rent: res.rent,
                deposit: res.deposit
            })
        };
    }

    let history = useHistory();


    const onSubmit = (data) => {
        setShowErrorMessage(false);
        const cIn =checkIn;
        const cOut = checkOut

        const outLater = moment(cOut).isAfter(cIn);
        if (!outLater) {
            setErrorMessage('Check-out date must be greater than check-In date');
            return;
        } else {
            console.log('rN type' = typeof data.roomNr);
            const roomJammers = jammers.filter(e => e.roomNr === data.roomNr);

            for (let i = 0; i < roomJammers.length; i ++) {
                const inIsBetween = moment(cIn).isBetween(roomsJammers[i].checkIn, roomsJammers[i].checkOut);
                const outIsBetween = moment(cOut).isBetween(roomsJammers.checkIn, roomsJammers.checkOut);
                if (inIsBetween || outIsBetween) {
                    const { firstName, lastName, roomNr, checkIn, checkOut } = roomJammers[i];
                    setErrorMessage('There is dates overlapping with');
                    setErrorDesc(`Tenant: ${firstName} ${lastName}, roomNr: ${roomNr}, check-In: ${checkIn}, check-out: ${checkOut}`);
                    setShowErrorMessage(true);
                    return;
                }
            }
        }

        data.registeredUser = false;
        data.jamName = jamName;
        data.adminName = adminName;
        data.contractCode = Calculations.generateCode();
        data.checkIn = moment(cIn).format('DD-MMM-YYYY');
        data.checkOut = moment(cOut).format('DD-MMM-YYYY');
        setInvitationInfo(data)

        
        const overlapStatus = Calculations.checkOverlapping(checkIn, checkOut, jammers)

        if(overlapStatus.error === true) {
            setShowModal(true);
        };

        let contractType = 'single';
        const nrOfTenants = parseInt(data.nrOfTenants);
        if(nrOfTenants > 1) contractType = 'multiple';
        data.contractType = contractType;

        let tenantsInfo = [{
            firstName: data.firstName,
            lastName: data.lastName,
            emial: data.email,
        }];

        if (nrOfTenants === 2) {
            tenantsInfo.push({
                firstName: data.secondFirstName,
                lastName: data.secondLastName,
                emial: data.secondEmail,
            });
        };

        if (nrOfTenants === 3) {
            tenantsInfo.push({
                firstName: data.secondFirstName,
                lastName: data.secondLastName,
                emial: data.secondEmail,
            });
            tenantsInfo.push({
                firstName: data.thirdFirstName, 
                lastName: data.thirdLastName, 
                email: data.thirdEmail,
            });
        };
        
        // for (let i = 0; i < tenantsInfo.length; i++){
        //     DataService.newTenantInvitation(jamId, data)
        //     .then((res) => {
        //         const invId = res.id;
                
        //         // CHAPUZA AQUI HAY QUE AUTOMATIZAR FUNCION DE INVITACION Y PASAR EL USER UN EMAIL CON EL LINK
        //         const registrationURL = `/register/${jamId}/${jamName}/${adminName}/${firstName}/${lastName}/${invId}`
        //         // history.push(`/register/${jamId}/${jamName}/${adminName}/${firstName}/${lastName}/${invId}`);
        //     })
        // }
    };

    useEffect(() => {
        if(nrOfTenants === '1') {
            setShowSecond(false);
            setShowThird(false)
        }
        if(nrOfTenants === '2') {
            setShowSecond(true);
        }
        if(nrOfTenants === '3') {
            setShowSecond(true);
            setShowThird(true)
        }
    }, [nrOfTenants]);

    useEffect(() => {
        if(nrOfTheRoom !== '') {
            getRoomInfo();
        }
    }, [nrOfTheRoom]);
    
    const takeMeToJammerInfo = () => {
        console.log('HELLO WORLD')
    }
    return (
        <form
            autocomplete="off"
            className="hook-form"
            onSubmit={handleSubmit(onSubmit)}>

            <div className="form-section">
                <div className="form-section-title">
                    <p>Contract Info</p>
                </div>

                { showErrorMessage && (
                    <div className="form-error-line">
                        <div className="form-error-message">
                            <h4>{errorMessage}</h4>
                        </div>
                        <div
                            className="form-error-desc"
                            onCLick={(e) => {
                                e.preventDefault();
                                takeMeToJammerInfo()
                            }}
                        >
                            <p>{errorDesc}</p>
                        </div>
                    </div>

                )}

                <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Nr of tenants to include in the contact</label>
                            {errors.nrOfTenants && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="nrOfTenants"
                            ref={register({
                                required: true,
                            })}
                            
                            onChange={(e) => {
                                const nr = e.target.value 
                                setNrOfTenants(nr);
                            }}
                        />
                    </div>
                </div>

                <div className="form-line">

                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Room Nr</label>
                            {errors.roomNr && <div className="field-error">Required</div>}
                        </div>
                        <input
                        name="roomNr"
                        onChange={(e) => {
                            const nr = e.target.value 
                            setNrOfTheRoom(nr);
                            setValue("rent", defaultValues.rent)
                            setValue("deposit", defaultValues.deposit)
                        }}
                        ref={register({
                            required: true,
                        })} />
                    </div>
                    
                    <div className="custom-input-block midWidth">
                        <div className="block-label ">
                            <label>Check In</label>
                            {errors.checkIn && <div className="field-error">Required</div>}
                        </div>
                        <Controller
                            control={control}
                            dateFormat="dd-MMM-yyyy"
                            name="checkIn"
                            className={`input`}
                            render={() => (
                                <ReactDatePicker
                                    selected={checkIn}
                                    onChange={value => setCheckIn(value)}
                                />
                            )}
                        />
                    </div>

                    <div className="custom-input-block midWidth">
                        <div className="block-label ">
                            <label>Check Out</label>
                            {errors.checkOut && <div className="field-error">Required</div>}
                        </div>        
                        <Controller
                            control={control}
                            dateFormat="dd-MMM-yyyy"
                            name="checkOut"
                            className={`input`}
                            render={() => (
                                <ReactDatePicker
                                    selected={checkOut}
                                    onChange={value => setCheckOut(value)}
                                />
                            )}
                        />
                    </div>

                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Rent €/Mo</label>
                            {errors.rent && <div className="field-error">Required</div>}
                        </div>
                        <input
                        name="rent"
                        defaultValue={defaultValues.rent}
                        ref={register({
                            required: true,
                        })} />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Deposit €</label>
                            {errors.deposit && <div className="field-error">Required</div>}
                        </div>
                        <input
                        name="deposit"
                        ref={register({
                            required: true,
                        })} />
                    </div>

                </div>
            </div>
            <div className="form-section">
                    <div className="form-section-title">
                        <p>Personal information</p>
                    </div>

                    <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>First name</label>
                            {errors.firstName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="firstName"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Last name</label>
                            {errors.lastName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="lastName"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Email</label>
                            {errors.email && <div className="field-error">Non valid address</div>}
                        </div>
                        <input
                            name="email"
                            ref={register({ 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />
                    </div>
                </div>

                </div>
            { second && (
                <div className="form-section">
                    <div className="form-section-title">
                        <p>Personal information 2nd tenant</p>
                    </div>

                    <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>First name</label>
                            {errors.secondFirstName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="secondFirstName"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Last name</label>
                            {errors.secondLastName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="secondLastName"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Email</label>
                            {errors.secondEmail && <div className="field-error">Non valid address</div>}
                        </div>
                        <input
                            name="secondEmail"
                            ref={register({ 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />
                    </div>
                </div>

                </div>
                )
            }
            { third && (
                <div className="form-section">
                    <div className="form-section-title">
                        <p>Personal information 3rd tenant</p>
                    </div>

                    <div className="form-line">
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>First name</label>
                            {errors.thirdFirstName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="thirdFirstName"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Last name</label>
                            {errors.thirdLastName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="thirdLastName"
                            ref={register({ 
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Email</label>
                            {errors.thirdEmail && <div className="field-error">Non valid address</div>}
                        </div>
                        <input
                            name="thirdEmail"
                            ref={register({ 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />
                    </div>
                </div>

                </div>
                )
            }

            <div className="hook-form-buttonArea">
                <input type="submit" />
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    const jamId = state.nav.jamId;
    const {jamName, adminName, jammers} = state.jamInfo
    return { jamId, jamName, adminName, jammers }
};

export default connect(mapStateToProps, null)(useInviteJammerForm);