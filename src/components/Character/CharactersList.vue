<template>
  <div>
    <div v-if="loading">Loading...</div> {{ info }}
    <CharacterListItem v-for="character in characters"
      :key="character.getId()"
      :character="character"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, watch, ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_QUERY, GET_CHARACTERS_BY_IDS_QUERY, GET_EPISODES_QUERY } from "../../graphql/getCharacters";
import CharacterListItem from './CharactersListItem.vue';
import { Filter } from '../../types/types';
import { GetCharactersResponseDTO } from '../../graphql/DTO/GetCharactersResponseDTO';
import { Character } from "./Character";
import { Info } from "./Info";

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
    let queryName = GET_CHARACTERS_BY_IDS_QUERY;
    let filterParams = searchOptions.value;
    // watch(searchOptions, (currentValue, oldValue) => {

    //   switch(Object.keys(searchOptions.value)[0]) {
    //     case 'name':
    //       queryName = GET_CHARACTERS_QUERY;
    //       break;
    //     case 'id':
    //       queryName = GET_CHARACTERS_BY_IDS_QUERY;
    //       break;
    //     case 'episode':
    //       queryName = GET_EPISODES_QUERY;
    //       break;
    //     default:
    //       queryName = GET_CHARACTERS_QUERY;
    //   }
    //   queryName = GET_CHARACTERS_QUERY;
    //   refetch({
    //     page: 1,
    //     filter: searchOptions.value
    //   });
    // });

    const { result, loading, error, refetch } = useQuery<GetCharactersResponseDTO>(queryName, {
        page: 1,
        filter: searchOptions.value
    });
    
    const characters = useResult(
      result,
      [],
      data => data?.characters?.results.map(dto => Character.fromDTO(dto))
    );

    const info = useResult(
      result,
      [],
      data => Info.fromDTO(data?.characters?.info!)
    )

    return {
      loading,
      error,
      characters,
      info,
      refetch,
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
