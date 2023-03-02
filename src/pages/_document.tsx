import { Html, Head, Main, NextScript } from 'next/document'
import { NextRequest } from 'next/server';

export default function Document(req: NextRequest) {

  return (
    <Html lang="en">
      <Head />
      <title>Area Blog</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
