import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ACTION_RUN_APP = "predict/ACTION_RUN_APP";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initialState = {
    status: false,
    error: null,
    loading: false,
    appRunnig: false
};

export const runApp = createAsyncThunk(ACTION_RUN_APP,
    async (_, thunkApi) => {
        await delay(1000 * 5);
        thunkApi.fulfillWithValue({ appRunnig: true });
    }
)

const appProps = createSlice({
    name: "appProps",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(runApp.fulfilled, ((state, action) => {
                state.appRunnig = true;
                state.loading = false;
            }))
            .addCase(runApp.rejected, (state, action) => {
                state.appRunnig = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(runApp.pending, (state) => {
                state.appRunnig = false;
                state.loading = true;
            })
    }
})

export default appProps.reducer;