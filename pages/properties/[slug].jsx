import { Container } from 'react-bootstrap';
import MainLayout from '../../components/MainLayout';
import { useQuery } from '@apollo/client';
import { GENERAL_SETTINGS, OPTIONS_PAGE } from '../../lib/Queries';
import { initializeApollo } from '../../lib/apolloClient';
import { useRouter } from 'next/router';

const properties = () => {
  const {
    loding: settingsLoading,
    error: settingsError,
    data: settingsData,
  } = useQuery(GENERAL_SETTINGS);
  const {
    loding: optionsLoading,
    error: optionsError,
    data: optionsData,
  } = useQuery(OPTIONS_PAGE);
  if (settingsLoading || optionsLoading) return <p>Loading...</p>;
  if (settingsError || optionsError) return <p>Error :</p>;

  const router = useRouter();
  console.log(router.query);
  return (
    <Container>
      {settingsData && optionsData && (
        <MainLayout
          options={optionsData.pages.nodes[0].acfOptions}
          menuItems={settingsData.menus.nodes[0].menuItems.nodes}
        >
          <Container>
            <h1>Single Property</h1>
          </Container>
        </MainLayout>
      )}
    </Container>
  );
};

//TODO: here need to include list of paths https://prnt.sc/wnhn3g
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'second-post' } }],
    fallback: true,
  };
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GENERAL_SETTINGS,
  });
  await apolloClient.query({
    query: OPTIONS_PAGE,
  });

  return {
    props: {},
    revalidate: 1,
  };
}

export default properties;
