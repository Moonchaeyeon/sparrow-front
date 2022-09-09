import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userDataReducer } from './userData/userDataReducer';
import { soundReducer } from './sound/soundReducer';

const rootReducer = combineReducers({
    userData: userDataReducer,
    sound: soundReducer,
})

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));   

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;