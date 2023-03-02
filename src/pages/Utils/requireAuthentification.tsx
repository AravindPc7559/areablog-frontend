import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { verifyAuth } from './auth'
import { toast } from 'react-toastify'

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx


    if (req.headers.cookie) {

      const tokens = req.headers.cookie?.split(';')

      const token = tokens?.find((token) => token.includes('UserInfo'))

      const exactToken = token?.split('=')[1]


      const verifiedToken = exactToken && (await verifyAuth(exactToken).catch((err) => {
        toast.error(err, {
            position:'top-right'
        })
     }))



      if (!token || !verifiedToken) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        }
      } 
    } else if(!req.headers.cookie) {
        return {
            redirect: {
              permanent: false,
              destination: '/',
            },
          }
    }

    return await gssp(ctx);
  }
}


export function requireAuthenticationForAuthPage(gssp: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
      const { req } = ctx
  
  
      if (req.headers.cookie) {
    
        const tokens = req.headers.cookie?.split(';')
  
        const token = tokens?.find((token) => token.includes('UserInfo'))
  
        const exactToken = token?.split('=')[1]
  
  
        const verifiedToken = exactToken && (await verifyAuth(exactToken).catch((err) => {
          toast.error(err, {
              position:'top-right'
          })
       }))
  
  
  
        if (token && verifiedToken) {
          return {
            redirect: {
              permanent: false,
              destination: '/homepage',
            },
          }
        } 
      } 
  
      return await gssp(ctx);
    }
  }
  