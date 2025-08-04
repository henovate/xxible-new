import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const PEXEL_BASE_URL:any = process.env.NEXT_PUBLIC_PEXEL_BASE_URL;

export const pexels_baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: PEXEL_BASE_URL,
		prepareHeaders: (headers) => {
			headers.set("Authorization", PEXEL_BASE_URL);
			return headers;
		}
	}),
	endpoints: () => ({})
})

