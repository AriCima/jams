export const JAM_NAME = 'JAM_NAME';
export const JAM_DESC = 'JAM_DESC';
export const JAM_TYPE = 'JAM_NAME';
export const JAM_ADMIN_NAME = 'JAM_ADMIN_NAME';
export const JAM_ADMIN_ID = 'JAM_ADMIN_ID';

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




