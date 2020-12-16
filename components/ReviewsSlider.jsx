import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ReviewsSlider = ({ reviews }) => {
  return (
    <Carousel
      arrows={false}
      swipeable={true}
      draggable={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      showDots={true}
      autoPlay={true}
      autoPlaySpeed={6000}
      customTransition="all 2s ease"
      transitionDuration={500}
      containerClass="reviews-slider"
      dotListClass="reviews-slider__dots"
    >
      {reviews.map((review) => {
        let Img = '/profile_placeholder.jpg';

        if (review.featuredImage !== null) {
          Img = review.featuredImage.node.sourceUrl;
        }

        return (
          <Slide key={review.id}>
            <div className="profile-picture">
              <img src={Img} alt={review.title} />
            </div>
            <div className="reviewer">
              <p>{review.title}</p>
            </div>
            <div className="hotel-name">
              <p>{review.acfReviews.hotelName}</p>
            </div>
            <div className="review">
              <p>{review.acfReviews.review}</p>
            </div>
            <div className="social-links">
              {review.acfReviews.socialMediaLinks.map((social) => (
                <a href={social.link} target="_blank" key={social.icon.id}>
                  <img src={social.icon.sourceUrl} alt="" />
                </a>
              ))}
            </div>
          </Slide>
        );
      })}
    </Carousel>
  );
};

export default ReviewsSlider;

const Slide = styled.div`
  .profile-picture {
    img {
      max-width: 70px;
      border-radius: 50%;
      object-fit: contain;
    }
  }
  .review {
    max-width: 420px;
    margin: 0 auto;
  }
`;
