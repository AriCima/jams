import React from 'react';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import findIndex from 'lodash/findIndex';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChalkboard,
    faComments,
    faUsers,
    faUserLock,
    faCog,
    faPassport,
    faAt,
    faPhone,
    faMobile,
    faMapMarkerAlt,
    faLocationArrow,
    faGlobeAmericas,
    faDoorOpen,
    faBed,
    faWalking,
    faShieldAlt,
    faEuroSign
} from '@fortawesome/free-solid-svg-icons'


export default class Calculations {

    static getIcon(info){

        let icon; 
        switch (info) {
            case 'Email':
                icon = faAt;
            break;
            case 'Passport':
                icon = faPassport;
            break;
            case 'Phone':
                icon = faPhone;
            break;
            case 'Mobile':
                icon = faMobile;
            break;
            case 'Address':
                icon = faMapMarkerAlt;
            break;
            case 'City':
                icon = faLocationArrow;
            break;
            case 'Country':
                icon = faGlobeAmericas;
            break;
            case 'Check-In':
                icon = faWalking;
            break;
            case 'Check-Out':
                icon = faWalking;
            break;
            case 'Room Nr':
                icon = faBed;
            break;
            case 'Rent':
                icon = faEuroSign;
            break;
            case 'Deposit':
                icon = faShieldAlt;
            break;
            default:
                icon = '';
        };
        return icon;
    }
}