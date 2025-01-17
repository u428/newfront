import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";



// import i18n (needs to be bundled ;))
import "./i18n";

// Redux Setup
import { Provider } from "react-redux";



import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";

import rootSaga from "./redux/sagas";
import { rootReducer } from "./redux/reducers";
import Spinner from "./components/spinner/Spinner";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose( applyMiddleware(sagaMiddleware ) )
);

sagaMiddleware.run( rootSaga );

const App = lazy( () => import( `./App` ) );

ReactDOM.render(
  <Provider store={ store }>
    <Suspense fallback={ <Spinner /> }>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById( "root" )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
