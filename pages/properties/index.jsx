import { useQuery } from '@apollo/client';
import {
  PROPERTIES_ARCHIVE_PAGE,
  GENERAL_SETTINGS,
  OPTIONS_PAGE,
} from '../../lib/Queries';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';
import parse from 'html-react-parser';
import { Container } from 'react-bootstrap';
import PageHead from '../../components/PageHead';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';

const properties = () => {
  const router = useRouter();
  console.log(router.query);
  const { loading, error, data } = useQuery(PROPERTIES_ARCHIVE_PAGE);
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
  if (loading || settingsLoading || optionsLoading) return <p>Loading...</p>;
  if (error || settingsError || optionsError) return <p>Error :</p>;

  const { title, content } = data.pages.nodes[0];

  return (
    <Container>
      <PageHead page={title} />
      {settingsData && optionsData && (
        <MainLayout
          options={optionsData.pages.nodes[0].acfOptions}
          menuItems={settingsData.menus.nodes[0].menuItems.nodes}
        >
          <h1>{title}</h1>
          {parse(content)}
        </MainLayout>
      )}
    </Container>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PROPERTIES_ARCHIVE_PAGE,
  });

  await apolloClient.query({
    query: OPTIONS_PAGE,
  });
  await apolloClient.query({
    query: GENERAL_SETTINGS,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default properties;
