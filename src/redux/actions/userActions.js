export const USER_ID = 'USER_ID';
export const USER_NAME = 'USER_NAME';
export const USER_ROLE = 'USER_ROLE';
export const REGISTERED_USER =  false
export const USER_JAMS =  [];

export const setUserId = (userId = '') => ({
  type: USER_ID,
  payload: {
    userId
  }
});

export const setUserName= (userName = '') => ({
  type: USER_NAME,
  payload: {
    userName
  }
});

export const setUserRole= (userRole = '') => ({
  type: USER_ROLE,
  payload: {
    userRole
  }
});

export const setRegisteredUser= (registeredUser = false) => ({
  type: REGISTERED_USER,
  payload: {
    registeredUser
  }
});

export const setUserJams = (userJams = []) => ({
  type: USER_JAMS,
  payload: {
    userJams
  }
});