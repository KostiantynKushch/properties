import { gql } from '@apollo/client';

export const GENERAL_SETTINGS = gql`
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

export const OPTIONS_PAGE = gql`
  query GetOptions {
    __typename
    pages(where: { name: "options-page" }) {
      nodes {
        acfOptions {
          logo {
            mediaItemUrl
          }
          tagline
          navigation {
            columns {
              columnTitle
              navigationLinks {
                link {
                  title
                  url
                  target
                }
              }
            }
          }
          contactInfo {
            title
            address
            email
            phone
          }
          copyrighting
        }
      }
    }
  }
`;

export const HEADER_SETTINGS = gql`
  query GetMainMenu {
    __typename
    pages(where: { name: "options-page" }) {
      nodes {
        acfOptions {
          logo {
            mediaItemUrl
          }
        }
      }
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

export const HOME_PAGE = gql`
  query GetHomePage {
    __typename
    pages(where: { name: "home-page" }) {
      nodes {
        isFrontPage
        acfHomeFields {
          heroTitle
          citiesSection {
            title
            tag
            shortDescription
            featuredCities {
              ... on City {
                id
                title
                slug
                excerpt
                featuredImage {
                  node {
                    sourceUrl(size: MEDIUM)
                  }
                }
              }
            }
          }
          properties {
            title
            tag
            shortDescription
            featuredProperties {
              ... on Property {
                id
                slug
                date
                acfProperties {
                  price
                  location
                  highlights {
                    bathrooms
                    beds
                    sqft
                    tvs
                  }
                }
                author {
                  node {
                    avatar {
                      url
                    }
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl(size: MEDIUM_LARGE)
                  }
                }
              }
            }
          }
          download {
            title
            tag
            background {
              sourceUrl(size: LARGE)
            }
            downloadButtons {
              buttonIcon {
                id
                sourceUrl(size: MEDIUM)
                altText
              }
              buttonLink
            }
          }
        }
        title
      }
    }
    categories(where: { parent: 11 }) {
      nodes {
        slug
        count
      }
    }
  }
`;

export const PROPERTIES_ARCHIVE_PAGE = gql`
  query GetPropertiesArchivePage {
    __typename
    pages(where: { name: "properties" }) {
      nodes {
        title
        content
      }
    }
  }
`;
