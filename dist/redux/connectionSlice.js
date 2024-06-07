// src/redux/connectionSlice.ts
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    connectionState: 'disconnected',
};
export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setConnectionState: (state, action) => {
            state.connectionState = action.payload;
        },
    },
});
export const { setConnectionState } = connectionSlice.actions;
export default connectionSlice.reducer;
