import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducer/userReducer";

// object literals key vs value giống nhau thì bỏ value
const rootReducer = combineReducers({
  userReducer: userReducer,

  });
  
  export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  // SHALLOW COMPARE (SO SANH THEO ĐỊA CHỈ VÙNG NHỚ)
  // oldState , newState
  // oldState === newState
  