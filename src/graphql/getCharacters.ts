import gql from "graphql-tag"

export const GET_CHARACTERS_QUERY = gql`
  query getCharacters($page: Int, $filter: FilterCharacter) {
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
  }
}
`