import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducer/reducer.js';
// import thunk from 'redux-thunk'; // Descomenta si usas thunk

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userName'], // Ajusta según el estado que quieras persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(/* thunk */)) // Descomenta thunk si lo usas
);

const persistor = persistStore(store);

export { store, persistor };