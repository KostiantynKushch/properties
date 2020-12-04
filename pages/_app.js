import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import '../styles/main.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp;
