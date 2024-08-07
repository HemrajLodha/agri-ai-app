import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://asia-south1-crop-disease-detector-431714.cloudfunctions.net" }),
    endpoints: (builder) => ({
        predictCottonDisease: builder.query({
            query: () => `/predict`
        })
    })
})

export const { useGetUsersQuery } = userApi;