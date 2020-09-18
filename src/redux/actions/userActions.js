export const USER_ID = 'USER_ID';
export const USER_ROLE = 'USER_ROLE';

export const setUserId = (userId = '') => ({
  type: USER_ID,
  payload: {
    userId
  }
});


export const setUserRole= (userRole = '') => ({
  type: USER_ROLE,
  payload: {
    userRole
  }
});
