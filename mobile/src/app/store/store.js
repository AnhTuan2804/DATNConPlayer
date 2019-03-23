import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../reducers';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/RootSaga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;