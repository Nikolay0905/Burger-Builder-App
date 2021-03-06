import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import ingredientReducer from "./Store/Reducers/ingredientReducer";
import orderReducer from "./Store/Reducers/orderReducer";
import authReducer from "./Store/Reducers/auth";

const reducer = combineReducers({
	burger: ingredientReducer,
	orders: orderReducer,
	auth: authReducer,
});

const composeEnhancers =
	(window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
