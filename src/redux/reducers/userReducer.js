import {
    USER_ID,
    USER_EMAIL,
    USER_FIRSTNAME,
    USER_LASTNAME,
    USER_ROLE,
    REGISTERED_USER,
    USER_JAMS
} from '../actions/userActions';
  
const defaultState = {
    userId: '',
    email: '',
    userRole: '',
    firstName: '',
    lastName: ''
};

const updateVal = (state, action) => {
    return { ...state, ...action.payload };
};

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (action.type in handlers) {
        return handlers[action.type](state, action);
    }
    return state;
};
}

const navReducers = createReducer(defaultState, {
[USER_ID]: updateVal,
[USER_EMAIL]: updateVal,
[USER_FIRSTNAME]: updateVal,
[USER_LASTNAME]: updateVal,
[USER_ROLE]: updateVal,
[REGISTERED_USER]: updateVal,
[USER_JAMS]: updateVal
});

export default navReducers;
  