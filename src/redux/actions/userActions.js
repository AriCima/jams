export const USER_ID = 'USER_ID';
export const USER_EMAIL = 'USER_EMAIL';
export const USER_FIRSTNAME = 'USER_FIRSTNAME';
export const USER_LASTNAME = 'USER_LASTNAME';
export const USER_ROLE = 'USER_ROLE';
export const REGISTERED_USER =  false
export const USER_JAMS =  [];

export const setUserId = (userId = '') => ({
  type: USER_ID,
  payload: {
    userId
  }
});

export const setUserEmail = (email = '') => ({
  type: USER_EMAIL,
  payload: {
    email
  }
});

export const setUserFirstName= (firstName = '') => ({
  type: USER_FIRSTNAME,
  payload: {
    firstName
  }
});

export const setUserLastName= (lastName = '') => ({
  type: USER_LASTNAME,
  payload: {
    lastName
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