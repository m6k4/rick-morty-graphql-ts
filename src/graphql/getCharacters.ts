import gql from "graphql-tag"

export const GET_CHARACTERS_QUERY = gql`
  query getCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
        status
        gender
        species
        episode {
          episode
        }
    }
      info {
        count
        pages
        next
        prev
      }
  }
}
`

export const GET_CHARACTERS_BY_IDS_QUERY = gql`
  query getCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      status
      gender
      species
      episode {
        episode
      }
  }
}
`