import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import navReducers from './navReducer';
import docReducers from './docReducer';
import userReducers from './userReducer';
import jamReducers from './jamReducer';

const rootReducer = combineReducers({
    doc: docReducers,
    jamInfo: jamReducers,
    userInfo: userReducers,
    nav: navReducers,

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
