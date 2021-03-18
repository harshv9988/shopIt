import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productsReducer";

import { authReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
});

let initalState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
