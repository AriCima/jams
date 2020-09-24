import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import userJamsReducer from './userJamsReducer';
import roomBookingsReducer from './roomBookingsReducer';
import navReducers from './navigateReducer';
import docReducers from './docReducer';
import userReducers from './userReducer';
import jamReducers from './jamReducer';


// sincronizador del firestore data y nuestro state
// en el background

// las keys del rootReducer serán las keys del state
const rootReducer = combineReducers({
    nav: navReducers,
    doc: docReducers,
    userJams: userJamsReducer,
    userInfo: userReducers,
    roomBookings: roomBookingsReducer,
    jamInfo: jamReducers,
    // el firestoreReducer automáticamente sincronizará la propiedad "firestore"
    // del Obj "state" con nuestra data en la base de datos
    // tomará esa data y ésta data dependerá de qué componente
    // está activo en cada momento, y qué data necesita dicho
    // componente y será sincronizada por éste reducer
    firestore: firestoreReducer,
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
