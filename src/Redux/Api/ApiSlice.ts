// ./Api/ApiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getSingleProducts: builder.query({
      query: (id) => `product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductsQuery } = ApiSlice;
