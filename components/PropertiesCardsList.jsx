import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import styled from 'styled-components';

const PropertiesCardsList = ({ propsData, listView }) => {
  return (
    <>
      {propsData.properties.nodes.map((property) => (
        <Col key={property.id} className={`${listView ? 'col-12' : ''}`}>
          <SCWrapper className="card-wrapper">
            <PropertyCard
              backgroundUrl={property.featuredImage.node.sourceUrl}
              price={property.acfProperties.price}
              location={property.acfProperties.location}
              beds={property.acfProperties.highlights.beds}
              bathrooms={property.acfProperties.highlights.bathrooms}
              tvs={property.acfProperties.highlights.tvs}
              sqft={property.acfProperties.highlights.sqft}
              authorPic={property.author.node.avatar.url}
              authorName={property.author.node.name}
              date={property.date}
              slug={property.slug}
              excerpt={property.excerpt}
              large={listView}
            />
          </SCWrapper>
        </Col>
      ))}
    </>
  );
};

export default PropertiesCardsList;

// TODO: add prop-types

const SCWrapper = styled.div`
  padding-bottom: 30px;
`;
