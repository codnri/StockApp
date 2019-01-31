import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import stocksReducer from "./reducers/stocks";

import "./styles.css";

const store = createStore(
  combineReducers({
    stocks: stocksReducer
  })
  //composeEnhancers(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
