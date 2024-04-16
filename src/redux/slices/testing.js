import {createSlice} from '@reduxjs/toolkit';
export const testing = createSlice({
    name: 'testing',
    initialState:{
        test: false
    },
    reducers:{
        setTest: (state, action) => {
            state.test = action.payload
        }
    }
});
export const {setTest} = testing.actions;