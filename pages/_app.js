import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  /* New styles */
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  background-image: url(${db.bg});
  background-size: 120% 120% cover; 
  background-position: bottom -79px left -450px;
  // Deixa branco no começo
  //color: ${({ theme }) => theme.colors.contrastText};
}
html, body {
  min-height: 100vh;
}
#__next {
  flex: 1;
  display: flex;
  flex-direction: column;
}
`

const theme = db.theme

export default function App({ Component, pageProps }) {
  return (
    <>
       <Head>
        <title>Horror Movies Quiz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Horror Movies Quiz" key="title" />
        <meta property="og:image" content='https://bannerupfrontend.herokuapp.com/horror-movies.jpg' />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
