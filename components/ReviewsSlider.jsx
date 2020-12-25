import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  console.log(reviews);
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
            <div className="social">
              {review.acfReviews.socialMediaLinks.facebook && (
                <a
                  href={review.acfReviews.socialMediaLinks.facebook}
                  target="_blank"
                  className="social__link"
                >
                  <svg
                    className="icon"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="icon__background"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                    />
                    <path
                      className="icon__body"
                      d="M23.5625 13.3929C23.3214 13.3571 22.4911 13.2857 21.5268 13.2857C19.5089 13.2857 18.125 14.5179 18.125 16.7768V18.7232H15.8482V21.3661H18.125V28.1429H20.8571V21.3661H23.125L23.4732 18.7232H20.8571V17.0357C20.8571 16.2768 21.0625 15.75 22.1607 15.75H23.5625V13.3929Z"
                    />
                  </svg>
                </a>
              )}
              {review.acfReviews.socialMediaLinks.twitter && (
                <a
                  href={review.acfReviews.socialMediaLinks.twitter}
                  target="_blank"
                  className="social__link"
                >
                  <svg
                    className="icon"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="icon__background"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                    />
                    <path
                      className="icon__body"
                      d="M27.4643 16.9286C27.0655 17.5119 26.5833 18.0089 26.0179 18.4196C26.0238 18.503 26.0268 18.628 26.0268 18.7946C26.0268 19.5685 25.9137 20.3423 25.6875 21.1161C25.4613 21.8839 25.1161 22.622 24.6518 23.3304C24.1935 24.0387 23.6458 24.6667 23.0089 25.2143C22.372 25.756 21.6042 26.1905 20.7054 26.5179C19.8065 26.8393 18.8452 27 17.8214 27C16.2083 27 14.7321 26.5685 13.3929 25.7054C13.6012 25.7292 13.8333 25.7411 14.0893 25.7411C15.4286 25.7411 16.622 25.3304 17.6696 24.5089C17.0446 24.497 16.4851 24.3065 15.9911 23.9375C15.497 23.5625 15.1577 23.0863 14.9732 22.5089C15.1696 22.5387 15.3512 22.5536 15.5179 22.5536C15.7738 22.5536 16.0268 22.5208 16.2768 22.4554C15.6101 22.3185 15.0565 21.9881 14.6161 21.4643C14.1815 20.9345 13.9643 20.3214 13.9643 19.625V19.5893C14.369 19.8155 14.8036 19.9375 15.2679 19.9554C14.875 19.6935 14.5625 19.3512 14.3304 18.9286C14.0982 18.506 13.9821 18.0476 13.9821 17.5536C13.9821 17.0298 14.1131 16.5446 14.375 16.0982C15.0952 16.9851 15.9702 17.6964 17 18.2321C18.0357 18.7619 19.1429 19.0565 20.3214 19.1161C20.2738 18.8899 20.25 18.6696 20.25 18.4554C20.25 17.6577 20.5298 16.9792 21.0893 16.4196C21.6548 15.8542 22.3363 15.5714 23.1339 15.5714C23.9673 15.5714 24.6696 15.875 25.2411 16.4821C25.8899 16.3571 26.5 16.125 27.0714 15.7857C26.8512 16.4702 26.4286 17 25.8036 17.375C26.3571 17.3155 26.9107 17.1667 27.4643 16.9286Z"
                    />
                  </svg>
                </a>
              )}
              {review.acfReviews.socialMediaLinks.instagram && (
                <a
                  href={review.acfReviews.socialMediaLinks.instagram}
                  target="_blank"
                  className="social__link"
                >
                  <svg
                    className="icon"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="icon__background"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                    />
                    <path
                      className="icon__body"
                      d="M21.4732 22.9018C21.9196 22.4554 22.1429 21.9167 22.1429 21.2857C22.1429 20.6548 21.9196 20.1161 21.4732 19.6696C21.0268 19.2232 20.4881 19 19.8571 19C19.2262 19 18.6875 19.2232 18.2411 19.6696C17.7946 20.1161 17.5714 20.6548 17.5714 21.2857C17.5714 21.9167 17.7946 22.4554 18.2411 22.9018C18.6875 23.3482 19.2262 23.5714 19.8571 23.5714C20.4881 23.5714 21.0268 23.3482 21.4732 22.9018ZM22.3482 18.7946C23.0327 19.4792 23.375 20.3095 23.375 21.2857C23.375 22.2619 23.0327 23.0923 22.3482 23.7768C21.6637 24.4613 20.8333 24.8036 19.8571 24.8036C18.881 24.8036 18.0506 24.4613 17.3661 23.7768C16.6815 23.0923 16.3393 22.2619 16.3393 21.2857C16.3393 20.3095 16.6815 19.4792 17.3661 18.7946C18.0506 18.1101 18.881 17.7679 19.8571 17.7679C20.8333 17.7679 21.6637 18.1101 22.3482 18.7946ZM24.0982 17.0446C24.2589 17.2054 24.3393 17.3988 24.3393 17.625C24.3393 17.8512 24.2589 18.0446 24.0982 18.2054C23.9375 18.3661 23.744 18.4464 23.5179 18.4464C23.2917 18.4464 23.0982 18.3661 22.9375 18.2054C22.7768 18.0446 22.6964 17.8512 22.6964 17.625C22.6964 17.3988 22.7768 17.2054 22.9375 17.0446C23.0982 16.8839 23.2917 16.8036 23.5179 16.8036C23.744 16.8036 23.9375 16.8839 24.0982 17.0446ZM20.5357 15.6607C20.125 15.6607 19.8988 15.6607 19.8571 15.6607C19.8155 15.6607 19.5863 15.6607 19.1696 15.6607C18.7589 15.6548 18.4464 15.6548 18.2321 15.6607C18.0179 15.6607 17.7292 15.6696 17.3661 15.6875C17.0089 15.6994 16.7024 15.7292 16.4464 15.7768C16.1964 15.8185 15.9851 15.872 15.8125 15.9375C15.5149 16.0565 15.253 16.2292 15.0268 16.4554C14.8006 16.6815 14.628 16.9435 14.5089 17.2411C14.4435 17.4137 14.3869 17.628 14.3393 17.8839C14.2976 18.1339 14.2679 18.4405 14.25 18.8036C14.2381 19.1607 14.2292 19.4464 14.2232 19.6607C14.2232 19.875 14.2232 20.1905 14.2232 20.6071C14.2292 21.0179 14.2321 21.244 14.2321 21.2857C14.2321 21.3274 14.2292 21.5565 14.2232 21.9732C14.2232 22.3839 14.2232 22.6964 14.2232 22.9107C14.2292 23.125 14.2381 23.4137 14.25 23.7768C14.2679 24.1339 14.2976 24.4405 14.3393 24.6964C14.3869 24.9464 14.4435 25.1577 14.5089 25.3304C14.628 25.628 14.8006 25.8899 15.0268 26.1161C15.253 26.3423 15.5149 26.5149 15.8125 26.6339C15.9851 26.6994 16.1964 26.756 16.4464 26.8036C16.7024 26.8452 17.0089 26.875 17.3661 26.8929C17.7292 26.9048 18.0179 26.9137 18.2321 26.9196C18.4464 26.9196 18.7589 26.9196 19.1696 26.9196C19.5863 26.9137 19.8155 26.9107 19.8571 26.9107C19.8988 26.9107 20.125 26.9137 20.5357 26.9196C20.9524 26.9196 21.2679 26.9196 21.4821 26.9196C21.6964 26.9137 21.9821 26.9048 22.3393 26.8929C22.7024 26.875 23.0089 26.8452 23.2589 26.8036C23.5149 26.756 23.7292 26.6994 23.9018 26.6339C24.1994 26.5149 24.4613 26.3423 24.6875 26.1161C24.9137 25.8899 25.0863 25.628 25.2054 25.3304C25.2708 25.1577 25.3244 24.9464 25.3661 24.6964C25.4137 24.4405 25.4435 24.1339 25.4554 23.7768C25.4732 23.4137 25.4821 23.125 25.4821 22.9107C25.4881 22.6964 25.4881 22.3839 25.4821 21.9732C25.4821 21.5565 25.4821 21.3274 25.4821 21.2857C25.4821 21.244 25.4821 21.0179 25.4821 20.6071C25.4881 20.1905 25.4881 19.875 25.4821 19.6607C25.4821 19.4464 25.4732 19.1607 25.4554 18.8036C25.4435 18.4405 25.4137 18.1339 25.3661 17.8839C25.3244 17.628 25.2708 17.4137 25.2054 17.2411C25.0863 16.9435 24.9137 16.6815 24.6875 16.4554C24.4613 16.2292 24.1994 16.0565 23.9018 15.9375C23.7292 15.872 23.5149 15.8185 23.2589 15.7768C23.0089 15.7292 22.7024 15.6994 22.3393 15.6875C21.9821 15.6696 21.6964 15.6607 21.4821 15.6607C21.2679 15.6548 20.9524 15.6548 20.5357 15.6607ZM26.6696 18.4554C26.6994 18.9792 26.7143 19.9226 26.7143 21.2857C26.7143 22.6488 26.6994 23.5923 26.6696 24.1161C26.6101 25.3542 26.2411 26.3125 25.5625 26.9911C24.8839 27.6696 23.9256 28.0387 22.6875 28.0982C22.1637 28.128 21.2202 28.1429 19.8571 28.1429C18.494 28.1429 17.5506 28.128 17.0268 28.0982C15.7887 28.0387 14.8304 27.6696 14.1518 26.9911C13.4732 26.3125 13.1042 25.3542 13.0446 24.1161C13.0149 23.5923 13 22.6488 13 21.2857C13 19.9226 13.0149 18.9792 13.0446 18.4554C13.1042 17.2173 13.4732 16.2589 14.1518 15.5804C14.8304 14.9018 15.7887 14.5327 17.0268 14.4732C17.5506 14.4435 18.494 14.4286 19.8571 14.4286C21.2202 14.4286 22.1637 14.4435 22.6875 14.4732C23.9256 14.5327 24.8839 14.9018 25.5625 15.5804C26.2411 16.2589 26.6101 17.2173 26.6696 18.4554Z"
                    />
                  </svg>
                </a>
              )}
            </div>
          </Slide>
        );
      })}
    </Carousel>
  );
};

export default ReviewsSlider;

ReviewsSlider.propTypes = {
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
    }).isRequired
  ).isRequired,
};

const Slide = styled.div`
  margin-bottom: 40px;
  @media screen and (min-width: 1024px) {
    margin-bottom: 70px;
  }
  .profile-picture {
    margin-bottom: 12px;
    img {
      max-width: 70px;
      border-radius: 50%;
      object-fit: contain;
    }
  }
  .reviewer {
    color: #1e2022;
    margin-bottom: 2px;
  }
  .hotel-name {
    margin-bottom: 15px;
  }
  .review {
    max-width: 420px;
    margin: 0 auto 15px;
  }
  .social {
    &__link {
      .icon {
        &__background {
          fill: #ffeeee;
          transition: fill 0.5s ease;
        }
        &__body {
          fill: #f45757;
          transition: fill 0.5s ease;
        }
      }
      &:hover {
        .icon {
          &__background {
            fill: #f45757;
          }
          &__body {
            fill: #ffeeee;
          }
        }
      }
    }
  }
  .social__link + .social__link {
    margin-left: 15px;
  }
`;
