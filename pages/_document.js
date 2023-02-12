import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head >
        <title>NFPaisanos</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="./icons/main_icon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}