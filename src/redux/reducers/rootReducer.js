import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import navReducer from './navReducer';
import docReducer from './docReducer';
import userReducer from './userReducer';
import jamReducer from './jamReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    doc: docReducer,
    jamInfo: jamReducer,
    userInfo: userReducer,
    nav: navReducer,
    modal: modalReducer,

    // sincronizador del auth state de firebase con
    // nuestro redux state en app y lo almacenará en el
    // "firebase" state que defino a continuación
    // éste state lo conectaré en el NavBar ya que allí es donde
    // mostraré una u otra info dependiendo de si el user está
    // logueado o no
    firebase: firebaseReducer,
});

export default rootReducer;


// react-reduf-firestore doc: http://react-redux-firebase.com/docs/api/firestoreConnect.html
