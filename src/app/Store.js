import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import authReducer from "../features/authencation/aulthSlice";
import movieReducer from "../features/Movie/movieSlice";
import userReducer from "../features/User/useSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  movie: movieReducer,
  auth: authReducer,
  user: userReducer,
});

// middleware: lưu log những action đc gửi lên store
const logger = (state) => {
  return (next) => {
    return (action) => {
      // xử lý action
      const actionList = localStorage.getItem("actionList");
      if (!actionList) {
      } else {
        const actionListArr = JSON.parse(actionList);
        actionListArr.push(action);
      }

      next(action);
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
