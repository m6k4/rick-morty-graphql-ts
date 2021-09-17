<template>
  <div>
    <CharacterListItem v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_QUERY } from "../../graphql/getCharacters";
import CharacterListItem from './CharactersListItem.vue';

export default defineComponent({
  name: "CharactersList",
  components: {
    CharacterListItem,
  },
  props: {
    searchOptions: {
      type: Object,
      default() {
        return { query: "", limit: 10 };
      }
    }
  },
  setup(props: { searchOptions: Record<string, any> }) {

    const { result, loading, error } = useQuery(GET_CHARACTERS_QUERY, {
      variables: { 
        page: 1,
        filter: { name: 'Rick'}
      }
    });
    
    const characters = useResult(
      result,
      [],
      data => data?.characters?.results
    );

    return {
      loading,
      error,
      characters
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 100px;
  width: 100px;
}
</style>
