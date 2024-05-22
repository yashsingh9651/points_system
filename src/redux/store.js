import {configureStore} from '@reduxjs/toolkit';
import { user } from './slices/user';
import { admin } from './slices/admin';

export const store = configureStore({
    reducer: {
        'user':user.reducer,
        'admin':admin.reducer,
    },
})