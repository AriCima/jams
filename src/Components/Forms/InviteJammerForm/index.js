import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

import ReactDatePicker from "react-datepicker";
// VER EJMPLO
// https://codesandbox.io/s/react-hook-form-controller-pz8oj?file=/src/index.js:161-208

import './index.scss';

const useInviteJammerForm = ({jamId, jamName, adminName}) => {
    const [ jammers, setJammers ] = useState([]);
    const [ value, setValue ] = useState(1);
    const [ showModal, setShowModal ] = useState(false);
    const [ invitationInfo, setInvitationInfo ] = useState({});
    const [ nrOfTenants, setNrOfTenants ] = useState(1)
    const [ second, setShowSecond ] = useState(false);
    const [ third, setShowThird ] = useState(false);

    useEffect(() => {
        getJammersList(jamId)
    }, [jamId]);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        let organizedJammers = [];
        if(res.length > 0) {
            organizedJammers = Calculations.organizeAdminTenants(res);
            setJammers(organizedJammers);
        };
    };


    let history = useHistory();
    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            nrOfTenants: 1,
        }
    });

    const onSubmit = (data) => {
        setInvitationInfo(data)
        const { checkIn, checkOut, firstName, lastName } = data;
        data.registeredUser = false;
        data.jamName = jamName;
        data.adminName = adminName;
        data.contractCode = Calculations.generateCode();

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
            tenantsInfo[1] = {
                firstName: data.secondFirstName,
                lastName: data.secondLastName,
                emial: data.secondEmail,
            };
        };

        if (nrOfTenants === 3) {
            tenantsInfo[2] = {
                firstName: data.thirdFirstName, 
                lastName: data.thirdLastName, 
                email: data.thirdEmail,
            };
        };

        for (let i = 0; i < tenantsInfo.length; i++){
            DataService.newTenantInvitation(jamId, data)
            .then((res) => {
                const invId = res.id;
                
                // CHAPUZA AQUI HAY QUE AUTOMATIZAR FUNCION DE INVITACION Y PASAR EL USER UN EMAIL CON EL LINK
                const registrationURL = `/register/${jamId}/${jamName}/${adminName}/${firstName}/${lastName}/${invId}`
                // history.push(`/register/${jamId}/${jamName}/${adminName}/${firstName}/${lastName}/${invId}`);
            })
        }
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

    return (
        <form
            className="hook-form"
            onSubmit={handleSubmit(onSubmit)}>

            <div className="form-section">
                <div className="form-section-title">
                    <p>Contract Info</p>
                </div>

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
                            <label>Check-In</label>
                            {errors.checkIn && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="checkIn"
                            placeholder="DD-MM-YYYY"
                            ref={register({
                                required: true,
                            })} 
                        />
                    </div>

                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Check-Out</label>
                            {errors.checkOut && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="checkOut"
                            placeholder="DD-MM-YYYY"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>

                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Room Nr</label>
                            {errors.roomNr && <div className="field-error">Required</div>}
                        </div>
                        <input
                        name="roomNr"
                        ref={register({
                            required: true,
                        })} />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Rent €/Mo</label>
                            {errors.rent && <div className="field-error">Required</div>}
                        </div>
                        <input
                        name="rent"
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
                            {errors.secondfirstName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="secondfirstName"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Last name</label>
                            {errors.secondlastName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="secondlastName"
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
                            {errors.thirdfirstName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="thirdfirstName"
                            ref={register({
                                required: true,
                            })}
                        />
                    </div>
                    <div className="custom-input-block">
                        <div className="block-label">
                            <label>Last name</label>
                            {errors.thirdlastName && <div className="field-error">Required</div>}
                        </div>
                        <input
                            name="thirdlastName"
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
    const {jamName, adminName} = state.jamInfo
    return { jamId, jamName, adminName }
};

export default connect(mapStateToProps, null)(useInviteJammerForm);