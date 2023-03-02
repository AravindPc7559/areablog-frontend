import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from './Redux/app/store'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://areablog-backend.onrender.com/' }),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  )
}
