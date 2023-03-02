import { Inter } from '@next/font/google'
import Authentication from '../components/Auth/Authentication'
import { GetServerSideProps } from 'next'
import {requireAuthenticationForAuthPage } from '../Utils/requireAuthentification'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (
    <div className="w-full h-screen">
      <Authentication />
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = requireAuthenticationForAuthPage(
  async (ctx) => {

    return {
      props: {
        isValid: ctx.query,
      },
    }
  },
)