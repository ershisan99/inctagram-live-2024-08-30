import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { instagramApi } from '@/services/instagram.api'

const makeStore = () =>
  configureStore({
    reducer: combineSlices(instagramApi),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(instagramApi.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
