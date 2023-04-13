import { Layout, LoginModal, RegisterModal } from '@/components'
import { CurrentUserProvider } from '@/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CurrentUserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
        <LoginModal />
        <RegisterModal />
      </CurrentUserProvider>
    </>
  )
}
