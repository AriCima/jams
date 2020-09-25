const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    
    switch(action.type){
        case 'LOGIN_ERROR':
            // //console.log('Login error')
            return {
                // action.payload
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            //console.log('login success, STATE = ', state)
            return {
                ...state,
                authError: null
            }

        case 'SIGNOUT_SUCCESS':
            //console.log('SIGNOUT_SUCCESS');
            return {
                state
            }
        case 'SIGNUP_SUCCESS':
            //console.log('signup success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            //console.log('Signup error', action.err.message)
            return {
                ...state,
                authError: action.err.message
            }

        default:
        return state
    }

}


export default authReducer;