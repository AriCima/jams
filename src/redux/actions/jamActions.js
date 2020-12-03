export const JAM_NAME = 'JAM_NAME';
export const JAM_DESC = 'JAM_DESC';
export const JAM_TYPE = 'JAM_NAME';
export const JAM_ADMIN_NAME = 'JAM_ADMIN_NAME';
export const JAM_ADMIN_LAST_NAME = 'JAM_ADMIN_LAST_NAME';
export const JAM_ADMIN_ID = 'JAM_ADMIN_ID';
export const JAM_DETAILS = 'JAM_DETAILS';
export const JAM_CODE = 'JAM_CODE';
export const JAM_JAMMERS = 'JAM_JAMMERS'
export const JAMMERS = 'JAMMERS'

export const setJamName = (jamName) => {
  return {
    type: JAM_NAME, 
    payload: {
      jamName
    }
  }
};

export const setJamType = (jamType) => {
  return {
    type: JAM_TYPE, 
    payload: {
      jamType
    }
  }
};

export const setJamDesc = (jamDesc) => {
  return {
    type: JAM_DESC, 
    payload: {
      jamDesc
    }
  }
};

export const setJamJammers = (jamJammers) => {
  return {
    type: JAM_JAMMERS, 
    payload: {
      jamJammers
    }
  }
};

export const setJammers = (jammers) => {
  return {
    type: JAMMERS, 
    payload: {
      jammers
    }
  }
};

export const setJamCode = (jamCode) => {
  return {
    type: JAM_CODE, 
    payload: {
      jamCode
    }
  }
};

export const setJamAdminId= (adminId = '') => ({
  type: JAM_ADMIN_ID,
  payload: {
    adminId
  }
});

export const setJamAdminName = (adminName = '') => ({
  type: JAM_ADMIN_NAME,
  payload: {
    adminName
  }
});

export const setJamAdminLastName = (adminLastName = '') => ({
  type: JAM_ADMIN_NAME,
  payload: {
    adminLastName
  }
});

export const setJamDetails = (jamDetails = {}) => ({
  type: JAM_DETAILS,
  payload: {
    jamDetails
  }
});



