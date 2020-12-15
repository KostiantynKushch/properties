import styled from 'styled-components';

export const SCHeroSection = styled.div`
  background: #99a2aa;
  color: #fff;
`;
export const SCHeroInner = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    max-width: 555px;
    text-align: center;
  }
`;

export const SCSection = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
  @media screen and (min-width: 1024px) {
    padding: 120px 0;
  }
  text-align: center;
  color: #77838f;
`;

export const SCFeaturedCities = styled(SCSection)`
  .featured-cities {
    &__header {
      margin-bottom: 30px;
    }
    &__title {
      color: #1e2022;
    }
    &__short-desc {
      max-width: 457px;
      margin: 0 auto;
      margin-bottom: 40px;
    }
  }
  .city {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: box-shadow 0.5s ease;
    &:hover {
      -webkit-box-shadow: 1px 7px 30px -7px #f45757;
      box-shadow: 1px 7px 30px -7px #f45757;
    }
    &__query-link {
      text-decoration: none;
    }
    img {
      width: 100%;
      max-width: 263px;
      height: 150px;
      object-fit: cover;
      border-radius: 4px 4px 0 0;
      margin-bottom: 15px;
    }
    &__title {
      color: #1e2022;
    }
    &__listings {
      color: #f45757;
      margin-bottom: 10px;
    }
    &__exerpt {
      max-width: 212px;
      margin: 0 auto;
      color: #77838f;
      &:hover {
        color: #77838f;
      }
    }
  }
`;

export const SCFeaturedProperties = styled(SCSection)`
  text-align: center;
  background: #f7fafd;
  a {
    text-decoration: none;
  }

  .featured-properties {
    &__title {
      color: #1e2022;
    }
    &__short-desc {
      max-width: 457px;
      margin: 0 auto;
      margin-bottom: 40px;
    }
  }
`;

export const SCSectionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 0.7rem;
    text-align: center;
    background: #ffeeee;
    color: #f45757;
    padding: 5px 20px;
    border-radius: 16px;
    margin-bottom: 15px;
  }
`;

export const SCPropertyCard = styled.div`
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

export const SCDownload = styled(SCSection)`
  color: #fff;
  .download {
    &__title {
      font-size: 1.45rem;
      margin-bottom: 20px;
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__btn {
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .download__btn + .download__btn {
    margin-top: 15px;
  }

  @media screen and (min-width: 1024px) {
    .download {
      max-width: 50%;
      margin: 0 auto;
      &__title {
        font-size: 3.45rem;
        margin-bottom: 40px;
      }
      &__buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
`;

export const SCSectionTagDark = styled(SCSectionTag)`
  span {
    padding: 5px 40px;
    background: rgba(0, 0, 0, 0.15);
    color: #fff;
  }
`;
