import {
    JAM_ID,
    SECTION,
    SUB_SECTION,
} from '../actions/navigateActions';
  
const defaultState = {
    jamId: '',
    section: '',
    subSection: ''
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
[JAM_ID]: updateVal,
[SECTION]: updateVal,
[SUB_SECTION]: updateVal,
});

export default navReducers;
  