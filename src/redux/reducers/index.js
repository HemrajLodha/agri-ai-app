import { combineReducers } from '@reduxjs/toolkit';
import appProps from '../slices/appSlice';
import diseasePredictProps from '../slices/diseasePredictSlice';


export default combineReducers({
    appProps,
    diseasePredictProps
})