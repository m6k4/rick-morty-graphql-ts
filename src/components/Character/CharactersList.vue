<template>
  <div>
    <div v-if="loading">Loading...</div>
    <CharacterListItem v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, watch } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_QUERY, GET_CHARACTERS_BY_IDS_QUERY } from "../../graphql/getCharacters";
import CharacterListItem from './CharactersListItem.vue';
import { Filter } from '../../types/types';

export default defineComponent({
  name: "CharactersList",
  components: {
    CharacterListItem,
  },
  props: {
    searchOptions: {
      type: Object as PropType<Filter>,
      default() {
        return {};
      }
    }
  },
  setup(props: { searchOptions: Filter }) {

    const { searchOptions } = toRefs(props);
     console.log(searchOptions.value, 'PIERWSZY23')
    watch(searchOptions, (currentValue, oldValue) => {
      console.log(searchOptions.value, 'kolejny')
      // searchOptions.value = currentValue;
      refetch({
        page: 1,
        filter: searchOptions.value
      });
    });

    const { result, loading, error, refetch } = useQuery(GET_CHARACTERS_QUERY, {
        page: 1,
        filter: searchOptions.value
    });

    // const { result, loading, error } = useQuery(GET_CHARACTERS_BY_IDS_QUERY, {
    //     ids: [1],
    // });
    
    const characters = useResult(
      result,
      [],
      data => data?.characters?.results
    );

    return {
      loading,
      error,
      characters,
      refetch
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
