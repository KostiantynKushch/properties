import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SCSection } from '../styles/commonStyledComponens';
import SectionHeader from './SectionHeader';
import PropertyCard from './PropertyCard';

const FeaturedPropertiesSection = ({
  title,
  tag,
  shortDescription,
  featuredProperties,
}) => {
  return (
    <SCFeaturedProperties className="featured-properties">
      <Container>
        <Row>
          <Col>
            <SectionHeader
              tag={tag}
              title={title}
              description={shortDescription}
            />
          </Col>
        </Row>
        <div className="featured-properties__cities properties">
          <Row>
            {featuredProperties.map((property) => (
              <Col key={property.id} sm="12" lg="4">
                <PropertyCard
                  backgrounUrl={property.featuredImage.node.sourceUrl}
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
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </SCFeaturedProperties>
  );
};

export default FeaturedPropertiesSection;

const SCFeaturedProperties = styled(SCSection)`
  text-align: center;
  background: #f7fafd;
  a {
    text-decoration: none;
  }
`;
