import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { serviceMiddlewares, serviceReducers } from '../services';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ...serviceReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceMiddlewares),
});

export default store;
