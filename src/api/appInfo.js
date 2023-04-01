import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';
const token = Cookies.get('authCookie');
export const appInfo = createApi({
  reducerPath: 'appInfo',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`)
      return headers
  }
  }),
  tagTypes:["user"],
  endpoints: (builder) => ({
    division: builder.query({
      query: () => 'api/all-division',
    }),
    
    products: builder.query({
      query: () => 'api/all-products',
    }),
    productsPaginate: builder.query({
      query: (page) => `api/products?page=${page}`,
    }),

    categories: builder.query({
      query: () => 'api/categories',
    }),
    sliders: builder.query({
      query: () => 'api/sliders',
    }),
    
    shopInfo: builder.query({
      query: () => 'api/shop-information',
    }),
    
    
  
        
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDivisionQuery,useProductsQuery,useCategoriesQuery,useSlidersQuery,useProductsPaginateQuery,useShopInfoQuery} = appInfo;