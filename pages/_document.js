import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react'
import { ServerStyles, createStylesServer } from '@mantine/next'

const stylesServer = createStylesServer()

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key='styles'
        />
      ]
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {CssBaseline.flush()}

          <link
            href='https://fonts.maateen.me/siyam-rupali/font.css'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
