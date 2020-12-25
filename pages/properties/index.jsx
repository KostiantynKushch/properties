import { useQuery } from '@apollo/client';
import { PROPERTIES_ARCHIVE_PAGE } from '../../lib/Queries';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';
import parse from 'html-react-parser';
import { Container } from 'react-bootstrap';
import PageHead from '../../components/PageHead';
import { useRouter } from 'next/router';

const properties = () => {
  const router = useRouter();
  console.log(router.query);
  const { loading, error, data } = useQuery(PROPERTIES_ARCHIVE_PAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const { title, content } = data.pages.nodes[0];

  return (
    <Container>
      <PageHead page={title} />

      <h1>{title}</h1>
      {parse(content)}
    </Container>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PROPERTIES_ARCHIVE_PAGE,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default properties;
