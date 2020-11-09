import React from 'react';
import { connect } from 'react-redux';

import {
    setDocType,
    setDocId,
    setEditable
} from '../../redux/actions/docsActions'

import { setSection } from '../../redux/actions/navigateActions'


const Navigation = ({setDocType,
    setDocId,
    setEditable,setSection
 }) => {

    const tenantInfo = (userId) => {
        console.log('userId: ', userId);
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(userId); // tenant's userId
        setEditable('true');
    };


}

export default connect(null, { setDocType, setSection, setDocId, setEditable })(Navigation);