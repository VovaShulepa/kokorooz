import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="uk">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          <meta property="og:site_name" content="Kokorooz App" />
          <meta
            property="og:title"
            content="Просто хочеш спілкуватися? Не проблема. Шукаєш другу половинку? Чудово!"
          />
          <meta
            property="og:description"
            content="Стань частиною Kokorooz і отримуй $2 за нового друга та $1 за кожен пост! Тут кожен знайомчик - цінний. Давайте знайомитись та заробляти разом!"
          />
          <meta
            name="description"
            content="Kokorooz– is a dating app to find a proposal from girls or boys in your city."
          />
          <meta
            property="og:image"
            content={'/favicon/android-chrome-512x512.png'}
          />
          <meta property="og:type" content="website" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" />

          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
