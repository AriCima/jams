import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// REDUX  el Middleware me permite utilizar el Thuk
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// import ContractES from './Components/Common/ContractES';
// connecting Redux to Firebase: https://www.youtube.com/watch?v=gf5bVfVlNUM
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import rootReducer from './redux/reducers/rootReducer';
import App from './Components/App';
import fbConfig from './config/fbConfig';
// compose me permite agregar varios "potenciadores" al store.
// en este caso agrego, thunk y los dos fun que me potencial la intereacción react-redux-firebase
const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
// registerServiceWorker();
