import PageHead from '../components/PageHead';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { HOME_PAGE } from '../lib/Queries';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export default function Home() {
  const { loading, error, data } = useQuery(HOME_PAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const { title, acfTestCustomField } = data.pages.nodes[0];

  return (
    <>
      <PageHead page={title} />
      <HeroSection>
        <Container>
          <HeroInner>
            <div className="title">
              <h1>{acfTestCustomField.heroTitle}</h1>
            </div>
          </HeroInner>
        </Container>
      </HeroSection>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: HOME_PAGE,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

const HeroSection = styled.div`
  background: #99a2aa;
  color: #fff;
`;
const HeroInner = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    max-width: 555px;
    text-align: center;
  }
`;
