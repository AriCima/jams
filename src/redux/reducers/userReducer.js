import {
    USER_ID,
    USER_ROLE
} from '../actions/userActions';
  
const defaultState = {
    userId: '',
    userRole: '',
};

const updateVal = (state, action) => {
    console.log('user action: ', action);
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
[USER_ROLE]: updateVal
});

export default navReducers;
  