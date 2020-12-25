import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SCSection } from '../styles/commonStyledComponens';
import SectionHeader from './SectionHeader';
import ReviewsSlider from './ReviewsSlider';
import PropTypes from 'prop-types';

const ReviewsSection = ({ tag, title, description, reviews }) => {
  return (
    <SCReviews>
      <Container>
        <Row>
          <Col>
            <SectionHeader tag={tag} title={title} description={description} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ReviewsSlider reviews={reviews} />
          </Col>
        </Row>
      </Container>
    </SCReviews>
  );
};

export default ReviewsSection;

const SCReviews = styled(SCSection)``;

ReviewsSection.propTypes = {
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      acfReviews: PropTypes.shape({
        hotelName: PropTypes.string.isRequired,
        review: PropTypes.string.isRequired,
        socialMediaLinks: PropTypes.shape({
          facebook: PropTypes.string,
          instagr: PropTypes.string,
          twitter: PropTypes.string,
        }),
      }).isRequired,
      featuredImage: PropTypes.shape({
        node: PropTypes.shape({
          sourceUrl: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
};
