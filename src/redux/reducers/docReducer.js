import {
    DOC_TYPE,
    DOC_ID,
    EDITABLE,
} from '../actions/docsActions';
  
const defaultState = {
    docType: 'none',
    docId: '',
    editable: false
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

const docReducers = createReducer(defaultState, {
[DOC_TYPE]: updateVal,
[DOC_ID]: updateVal,
[EDITABLE]: updateVal,
});

export default docReducers;
  