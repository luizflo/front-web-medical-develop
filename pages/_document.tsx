import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class WebAppDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta property="description" content="Agendamento de consultas" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;300;400;700;900&display=swap"
        />
        <script
          src="https://apis.google.com/js/api.js"
          type="text/javascript"
        ></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebAppDocument
