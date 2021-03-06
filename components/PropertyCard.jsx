import { memo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faTv,
  faSquare,
  faMapMarkerAlt,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { numFormatting as numFormatting, dateFormat } from '../lib/utils';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const PropertyCard = ({
  backgroundUrl: backgroundUrl,
  price,
  location,
  beds,
  bathrooms,
  tvs,
  sqft,
  authorPic,
  authorName,
  date,
  slug,
  excerpt,
  large = false,
}) => {
  return (
    <>
      {!large ? (
        <SCPropertyCard>
          <div
            className="header"
            style={{
              background: `url(${backgroundUrl}) no-repeat`,
              backgroundSize: 'cover',
              backgroundPositionX: 0,
              backgroundPositionY: '100%',
            }}
          >
            <div className="header__overlay"></div>

            <div className="price">
              <p>
                {' '}
                <span className="price__amount">${price}</span> / Night
              </p>
            </div>
          </div>
          <div className="body">
            <div className="body__main-info info">
              <div className="info__location">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="marker" />
                {location}
              </div>
              <div className="info__features">
                <div className="beds">
                  <FontAwesomeIcon icon={faBed} /> <span>{beds}</span>
                </div>
                <div className="bathrooms">
                  <FontAwesomeIcon icon={faBath} /> <span>{bathrooms}</span>
                </div>
                <div className="tvs">
                  <FontAwesomeIcon icon={faTv} /> <span>{tvs}</span>
                </div>
                <div className="sqft">
                  <FontAwesomeIcon icon={faSquare} />{' '}
                  <span>{numFormatting(sqft)}</span>
                </div>
              </div>
            </div>
            <div className="body__author author">
              <div className="author__picture">
                <img src={authorPic} alt={authorName} />
              </div>
              <div className="author__details details">
                <div className="details__author-name">{authorName}</div>
                <div className="details__publish-date">
                  <span>Listed on </span>
                  {dateFormat(date)}
                </div>
              </div>
            </div>
            <div className="body__actions actions">
              <div className="actions__save">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <span>Save</span>
              </div>
              <Link href={`/properties/${slug}`}>
                <div className="actions__details">
                  <a>Details</a>
                </div>
              </Link>
            </div>
          </div>
        </SCPropertyCard>
      ) : (
        <SCPropertyCardLarge>
          <div className="card">
            <Row>
              <Col className="col-4">
                <div className="card__aside">
                  <img src={backgroundUrl} alt={slug} />
                  <div className="price">
                    <p>
                      <span className="price__amount">${price}</span> / Night
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="col-8">
                <div className="card__info info">
                  <div className="info__location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="marker" />
                    {location}
                  </div>
                  <div className="info__features">
                    <div className="feature beds">
                      <FontAwesomeIcon icon={faBed} /> <span>{beds}</span>
                    </div>
                    <div className="feature bathrooms">
                      <FontAwesomeIcon icon={faBath} /> <span>{bathrooms}</span>
                    </div>
                    <div className="feature tvs">
                      <FontAwesomeIcon icon={faTv} /> <span>{tvs}</span>
                    </div>
                    <div className="feature sqft">
                      <FontAwesomeIcon icon={faSquare} />{' '}
                      <span>{numFormatting(sqft)}</span>
                    </div>
                  </div>
                  <div className="info__excerpt">
                    {excerpt ? (
                      <p>{excerpt}</p>
                    ) : (
                      <p>will be added letter from content</p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </SCPropertyCardLarge>
      )}
    </>
  );
};

// TODO: excerpt: if excerpt === null - place text from content fields

export default memo(PropertyCard);

PropertyCard.propTypes = {
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  beds: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  tvs: PropTypes.number.isRequired,
  sqft: PropTypes.number.isRequired,
  authorPic: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
};

const SCPropertyCard = styled.div`
  max-width: 360px;
  margin: 0 auto 30px auto;
  color: #77838f;
  border-radius: 4px;
  transition: box-shadow 0.5s ease;
  @media screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
  &:hover {
    -webkit-box-shadow: 1px 7px 30px -7px #f45757;
    box-shadow: 1px 7px 30px -7px #f45757;
  }

  .header {
    height: 230px;
    width: 100%;
    border-radius: 4px 4px 0 0;
    position: relative;
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 2;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.0001) 0%,
        rgba(0, 0, 0, 0.403901) 100%
      );
    }
  }
  .body {
    padding: 15px;
    @media screen and (min-width: 768px) {
      padding: 25px;
    }
    &__main-info {
    }
  }
  .price {
    position: absolute;
    z-index: 3;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    color: #fff;
    p {
      margin-bottom: 0;
    }
    &__amount {
      font-weight: 700;
    }
  }

  .info {
    &__location {
      color: #f45757;
      text-align: left;
      margin-bottom: 10px;
      .marker {
        margin-right: 5px;
      }
    }
    &__features {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #1e2022;
      }
    }
  }
  .author {
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 16px 0;
    margin-bottom: 15px;
    &__picture {
      margin-right: 15px;
      max-width: 60px;
      img {
        border-radius: 50%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
  .details {
    &__author-name {
      text-align: left;
      color: #1e2022;
    }
    &__publish-date {
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__save {
      font-weight: 600;
      .star-icon {
        margin-right: 9px;
      }
    }
    &__details {
      cursor: pointer;
      padding: 15px 48px;
      background: #ffeeee;
      transition: background 0.5s ease;
      a {
        font-weight: 600;
        color: #f45757;
        transition: color 0.1s ease;
      }
      &:hover {
        background: #f45757;
        a {
          color: #ffeeee;
        }
      }
    }
  }
`;

const SCPropertyCardLarge = styled(SCPropertyCard)`
  max-width: initial;
  .card {
    border: none;
    &__aside {
      position: relative;
      margin: 25px 0 25px 25px;
      img {
        border-radius: 4px;
        width: 100%;
        height: 160px;
        object-fit: cover;
        object-position: 0 100%;
      }
      .price {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        p {
          margin-bottom: 0;
        }
      }
    }
  }
  .info {
    padding: 25px 20px 25px 0;
    &__location {
      margin-bottom: 10px;
    }
    &__features {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 20px;
      margin-bottom: 20px;
      .feature + .feature {
        margin-left: 20px;
      }
    }
  }
`;
