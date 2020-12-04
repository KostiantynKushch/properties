const Footer = ({ data }) => {
  return <footer>{data}</footer>;
};

export async function getStaticProps() {
  const res = await fetch(
    `https://wp-dev.space/no-client/ppk/develop/wp-json/acf/v3/options/options/`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default Footer;
