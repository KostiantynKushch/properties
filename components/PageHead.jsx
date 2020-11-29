import Head from 'next/head';
import { GENERAL_SETTINGS } from '../lib/Queries';
import { useQuery } from '@apollo/client';

const PageHead = ({ page }) => {
  const { loading, error, data } = useQuery(GENERAL_SETTINGS);
  if (loading) return null;
  if (error) return <p>Error :</p>;
  const { generalSettingsTitle, generalSettingsDescription } = data.allSettings;
  return (
    <Head>
      <title>
        {page} | {generalSettingsTitle} - {generalSettingsDescription}
      </title>
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default PageHead;
