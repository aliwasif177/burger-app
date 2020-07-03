import React from "react";
import ReactDOM from "react-dom";

import order from "./Store/Reducers/Order";
import ingredients from "./Store/Reducers/Ingredients";
import auth from "./Store/Reducers/Auth";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  ord: order,
  ing: ingredients,
  auth: auth
});
const composeEnhancer =
  process.env === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
