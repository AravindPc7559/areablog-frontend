import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Authentication from './components/Auth/Authentication'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Authentication />
    </div>
  )
}
