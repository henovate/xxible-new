import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder: any) => ({
    getExample: builder.query({
      query: () => "example",
    }),
  }),
});

export const { useGetExampleQuery } = apiSlice;
export default apiSlice;
