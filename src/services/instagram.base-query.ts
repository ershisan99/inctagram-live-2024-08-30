import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

import { Mutex } from 'async-mutex'
import Router from 'next/router'

// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log(args)
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)
  console.log(result)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = (await baseQuery(
          { url: '/v1/auth/update-tokens', method: 'POST' },
          api,
          extraOptions
        )) as any
        console.log(refreshResult)
        if (refreshResult.data) {
          localStorage.setItem('access_token', refreshResult.data.accessToken)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          await Router.push('/auth/login')
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
