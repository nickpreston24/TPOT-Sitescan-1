import { Provider } from 'mobx-react'
export default function App({ Component, pageProps }) {

  return (
      <Component {...pageProps} />
  )
}
