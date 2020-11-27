import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';

const GENERAL_SETTINGS = gql`
  query GetGeneralInfo {
    __typename
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
    menus(where: { location: PRIMARY }) {
      nodes {
        menuItems {
          nodes {
            id
            label
            path
          }
        }
      }
    }
  }
`;

const PageHead = ({ page }) => {
  const { loading, error, data } = useQuery(GENERAL_SETTINGS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const { generalSettingsTitle, generalSettingsDescription } = data.allSettings;
  return (
    <Head>
      <title>
        {page} | {generalSettingsTitle} - {generalSettingsDescription}
      </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
