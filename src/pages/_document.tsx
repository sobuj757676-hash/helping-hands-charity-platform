import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Helping Hands - A comprehensive charity management platform for volunteers, donors, and beneficiaries" />
        <meta name="keywords" content="charity, donation, volunteer, NGO, humanitarian, aid, community, Bangladesh" />
        <meta name="author" content="Helping Hands Organization" />
        <meta name="theme-color" content="#0ea5e9" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Helping Hands - Together We Make a Difference" />
        <meta property="og:description" content="Join our mission to create positive change through volunteer work, donations, and community support." />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Helping Hands - Together We Make a Difference" />
        <meta property="twitter:description" content="Join our mission to create positive change through volunteer work, donations, and community support." />
        <meta property="twitter:image" content="/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}