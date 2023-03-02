import { jwtVerify, SignJWT } from 'jose'

type UserJwtPayload = {
  email: string
  fullname: string
  mobile: string
  id: string
  iat: number
  exp: number
}

export const getJwtSecretKey = () => {
  const secret = 'secret123123123'

  if (!secret || secret.length === 0) {
    throw new Error('The Secret key is not set.....')
  }

  return secret
}

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    )

    return verified.payload as any
  } catch (error) {
    throw new Error('Your token is expired')
  }
}
