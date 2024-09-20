import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../services/store'
import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react'
import { useMeQuery } from '@/services/instagram.api'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

function Me({ children }: PropsWithChildren) {
  const { data, isLoading, isError } = useMeQuery()
  console.log(data)
  if (isLoading) {
    return (
      <div className={'h-screen grid place-items-center'}>
        <h1>LOADING</h1>
      </div>
    )
  }
  return <>{children}</>
}
