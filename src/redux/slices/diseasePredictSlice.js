import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ACTION_PREDICT_DISEASE = "predict/ACTION_PREDICT_DISEASE";

const post_url = "https://asia-south1-crop-disease-detector-431714.cloudfunctions.net/predict";

const initialState = {
    status: false,
    error: null,
    loading: false,
    data: {}
};

export const predictCottonDisease = createAsyncThunk(ACTION_PREDICT_DISEASE,
    async (formData, thunkApi) => {
        try {
            const response = await axios.post(post_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
)

const diseaseProdictProps = createSlice({
    name: "diseaseProdictProps",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(predictCottonDisease.fulfilled, ((state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        }))
            .addCase(predictCottonDisease.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.error = action.payload;
            })
            .addCase(predictCottonDisease.pending, (state) => {
                state.loading = true;
                state.status = false;
            })
    }
})

export default diseaseProdictProps.reducer;