import PageHead from '../components/PageHead';
import { useQuery, gql } from '@apollo/client';
import parse from 'html-react-parser';
import Layout from '../components/Layout';

const HOME_PAGE = gql`
  query GetHomePage {
    __typename
    pages(where: { name: "home-page" }) {
      nodes {
        title
        isFrontPage
        content
        acfTestCustomField {
          testCustomField
        }
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(HOME_PAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const { title, content } = data.pages.nodes[0];

  return (
    <Layout>
      <PageHead page={title} />

      <main>
        <h1>Home page</h1>
        {parse(content)}
      </main>
    </Layout>
  );
}
