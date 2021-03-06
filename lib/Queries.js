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
          downloadTitle
          downloadDescription
          downloadButtons {
            buttonIcon {
              id
              altText
              sourceUrl(size: MEDIUM)
            }
            buttonLink
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
                sourceUrl(size: MEDIUM)
                altText
                id
              }
              buttonLink
            }
          }
          reviewsSection {
            title
            tag
            description
            reviews {
              ... on Review {
                id
                title
                featuredImage {
                  node {
                    sourceUrl(size: THUMBNAIL)
                  }
                }
                acfReviews {
                  hotelName
                  review
                  socialMediaLinks {
                    facebook
                    instagram
                    twitter
                  }
                }
              }
            }
          }
          newsletter {
            title
            description
            formId
            fieldId
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
      }
    }
    propertyAmenities {
      nodes {
        id
        name
      }
    }
    propertyAccessibilities {
      nodes {
        id
        name
      }
    }
    propertyBedrooms {
      nodes {
        id
        name
      }
    }
    propertyExtras {
      nodes {
        id
        name
      }
    }
    propertyPropertyTypes {
      nodes {
        id
        name
      }
    }
  }
`;

export const GET_PROPERTIES_ID_TO_EXCLUDE = gql`
  query GetPostsToExclude($checkIn: String, $checkOut: String) {
    __typename
    getPostIDsToExclude(checkIn: $checkIn, checkOut: $checkOut)
  }
`;

export const GET_PROPERTIES_IDS_TO_SHOW = gql`
  query GetIDsToShow(
    $taxonomyID: ID!
    $category: String
    $guests: String
    $arrayToExclude: [ID]
  ) {
    __typename
    propertyAmenity(id: $taxonomyID) {
      properties(
        where: {
          categoryName: $category
          metaQuery: {
            relation: AND
            metaArray: [
              {
                key: "highlights_beds"
                value: $guests
                compare: GREATER_THAN_OR_EQUAL_TO
              }
            ]
          }
          notIn: $arrayToExclude
        }
      ) {
        nodes {
          databaseId
        }
      }
    }
  }
`;

export const GET_PROPERTIES = gql`
  query FetchProperties(
    $perPage: Int
    $offset: Int
    $category: String
    $guests: String
    $dateOrder: OrderEnum!
    $arrayToExclude: [ID]
    $propertiesToShow: [ID]
  ) {
    __typename
    properties(
      where: {
        offsetPagination: { size: $perPage, offset: $offset }
        categoryName: $category
        metaQuery: {
          relation: AND
          metaArray: [
            {
              key: "highlights_beds"
              value: $guests
              compare: GREATER_THAN_OR_EQUAL_TO
            }
          ]
        }
        orderby: { field: DATE, order: $dateOrder }
        in: $propertiesToShow
        notIn: $arrayToExclude
      }
    ) {
      nodes {
        id
        slug
        date
        excerpt(format: RAW)
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
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

export const GET_NEWSLETTER_FORM = gql`
  query GetForm($formId: ID) {
    __typename
    gravityFormsForm(id: $formId) {
      fields {
        nodes {
          ... on EmailField {
            id
            type
            isRequired
            label
            placeholder
          }
        }
      }
    }
  }
`;

export const CREATE_NEWSLETTER_DRAFT = gql`
  mutation CreateNewDraftEntry($formId: Int) {
    __typename
    createGravityFormsDraftEntry(input: { formId: $formId }) {
      resumeToken
    }
  }
`;

export const UPDATE_NEWSLETTER_VALUE = gql`
  mutation UpdateDraftEntry(
    $fieldId: Int
    $resumeToken: String
    $value: String
  ) {
    __typename
    updateDraftEntryEmailFieldValue(
      input: { fieldId: $fieldId, resumeToken: $resumeToken, value: $value }
    ) {
      entry {
        entryId
        resumeToken
        isDraft
        fields {
          edges {
            node {
              ... on EmailField {
                id
                type
              }
            }
            fieldValue {
              ... on EmailFieldValue {
                value
              }
            }
          }
        }
      }
      errors {
        message
      }
    }
  }
`;

export const SUBMIT_NEWSLETTER_FORM = gql`
  mutation SubmitDraftEntry($resumeToken: String) {
    __typename
    submitGravityFormsDraftEntry(input: { resumeToken: $resumeToken }) {
      entryId
      entry {
        entryId
        resumeToken
        isDraft
        fields {
          edges {
            node {
              ... on EmailField {
                type
                id
                label
              }
            }
            fieldValue {
              ... on EmailFieldValue {
                value
              }
            }
          }
        }
      }
    }
  }
`;
