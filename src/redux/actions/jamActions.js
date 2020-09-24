export const JAM_NAME = 'JAM_NAME';
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




