import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import alertsReducer from './alertsReducer';
import authReducer from './authReducer';
import userJamsReducer from './userJamsReducer';
import jamSectionReducer from './jamSectionReducer';
import jamIdReducer from './jamIdReducer';
import jamInfoReducer from './jamInfoReducer';
import jammerIdReducer from './jammerIdReducer';
import roomIdReducer from './roomIdReducer';
// import roomScreenReducer from './roomScreenReducer';
import roomBookingsReducer from './roomBookingsReducer';
import navReducers from './navigateReducer';

// sincronizador del firestore data y nuestro state
// en el background

// las keys del rootReducer serán las kayes del state
const rootReducer = combineReducers({
    alert: alertsReducer,
    auth: authReducer,
    nav: navReducers,
    userJams: userJamsReducer,
    jamId: jamIdReducer,
    jamInfo: jamInfoReducer,
    jamSection: jamSectionReducer,
    jammerId: jammerIdReducer,
    roomId: roomIdReducer,
    // activeScreen: roomScreenReducer,
    roomBookings: roomBookingsReducer,
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
