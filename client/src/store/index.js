import { createStore, combineReducers } from 'redux';
import authReducer from './reducer/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  // 다른 리듀서를 추가할 수 있음
});

const store = createStore(rootReducer);

export default store;
