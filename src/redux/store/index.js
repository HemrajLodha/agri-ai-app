import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import reducers from "../reducers";

const middlewares = (defaultMiddleware) => defaultMiddleware().concat(logger);

export default configureStore({
    reducer: reducers,
    middleware: middlewares
});