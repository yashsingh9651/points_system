import {configureStore} from '@reduxjs/toolkit';
import { testing } from './slices/testing';

export const store = configureStore({
    reducer: {
        'testing':testing.reducer
    },
})