import Document, { Html, Head, Main, NextScript } from 'next/document'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="vi">
        <Head>
            <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

            <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>


            <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>


            <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

            <script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.js"></script>
            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
            
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