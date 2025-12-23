import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout } from './authSlice'

// Use environment variable for API base URL
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: 'include', // IMPORTANT for cookies/JWT
})

// Custom baseQuery to handle 401 (token expired)
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    api.dispatch(logout())
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
})



// import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../constants';

// import { logout } from './authSlice'; // Import the logout action

// // NOTE: code here has changed to handle when our JWT and Cookie expire.
// // We need to customize the baseQuery to be able to intercept any 401 responses
// // and log the user out
// // https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
// });

// async function baseQueryWithAuth(args, api, extra) {
//   const result = await baseQuery(args, api, extra);
//   // Dispatch the logout action on 401.
//   if (result.error && result.error.status === 401) {
//     api.dispatch(logout());
//   }
//   return result;
// }

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithAuth, // Use the customized baseQuery
//   tagTypes: ['Product', 'Order', 'User'],
//   endpoints: (builder) => ({}),
// });
