// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  GetAllPostsArgs,
  GetAllPostsResponse,
  LoginArgs,
  LoginResponse,
  MeResponse,
  UploadFileResponse,
  UserPosts,
  UserProfile,
} from '@/services/instagram.types'

// Define a service using a base URL and expected endpoints
export const instagramApi = createApi({
  tagTypes: ['Posts'],
  reducerPath: 'instagramApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllPublicPosts: builder.query<
      GetAllPostsResponse,
      GetAllPostsArgs | void
    >({
      query: (arg) => {
        const { endCursorPostId, ...params } = arg ?? {}
        return { url: `/v1/public-posts/all/${endCursorPostId}`, params }
      },
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: (args) => ({ url: 'v1/auth/login', body: args, method: 'POST' }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({
        url: '/v1/auth/me',
      }),
    }),
    getUserProfile: builder.query<UserProfile, { id: number }>({
      query: ({ id }) => ({
        url: `/v1/public-user/profile/${id}`,
      }),
    }),
    getUserPosts: builder.query<UserPosts, { id: number }>({
      providesTags: ['Posts'],
      query: ({ id }) => ({
        url: `/v1/public-posts/user/${id}`,
      }),
    }),
    uploadFileForPost: builder.mutation<UploadFileResponse, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: '/v1/posts/image',
          body: formData,
          method: 'POST',
        }
      },
    }),
    createPost: builder.mutation<
      any,
      { description: string; uploadIds: string[] }
    >({
      invalidatesTags: ['Posts'],
      query: ({ description, uploadIds }) => {
        return {
          url: '/v1/posts',
          body: {
            description,
            childrenMetadata: uploadIds.map((id) => {
              return {
                uploadId: id,
              }
            }),
          },

          method: 'POST',
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllPublicPostsQuery,
  useLoginMutation,
  useMeQuery,
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useUploadFileForPostMutation,
  useCreatePostMutation,
} = instagramApi
