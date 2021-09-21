<template>
  <div class="CharactersList">
     <img 
        v-if="loading"
        class="loading-logo" 
        src="@/assets/rick-head.png"
      /> {{ loading }}
    <CharacterListItem v-for="character in currentPageCharactersList"
      :key="character.getId()"
      :character="character"
    />
    <ThePagination 
      :count="671" 
      :page-size="pageSize"
      :page-count="34"
      @changePage="handleChangePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, watch, ref, computed, reactive } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_QUERY, GET_CHARACTERS_BY_IDS_QUERY, GET_EPISODES_QUERY } from "../../graphql/getCharacters";
import { Filter } from '../../types/types';
import { GetCharactersByIdsResponseDTO } from '../../graphql/DTO/GetCharactersByIdsResponseDTO';
import { GetCharactersResponseDTO } from '../../graphql/DTO/GetCharactersResponseDTO';
import { Character } from "./Character";
import { Info } from "./Info";
import CharacterListItem from './CharactersListItem.vue';
import ThePagination from '../Common/ThePagination.vue';

export default defineComponent({
  name: "CharactersList",
  components: {
    CharacterListItem,
    ThePagination
  },
  props: {
    searchOptions: {
      type: Object as PropType<Filter>,
      default: {}
    }
  },
  setup(props) {
    const searchOptions = ref(props.searchOptions); 
    // const currentPage = ref(1);
    const pageSize = 8;
    const currentPageCharactersList = ref<Array<Character>>([]);
    // let queryName = GET_CHARACTERS_BY_IDS_QUERY;
    // let filterParams = searchOptions.value;

    const { result: firstPageResult, loading: firstPageLoading } = useQuery<GetCharactersResponseDTO>(GET_CHARACTERS_QUERY, {
      page: 1,
      filter: {},
    });

    let characters = useResult<GetCharactersResponseDTO, Array<Character>, Array<Character>>(
      firstPageResult,
      [],
      data => data?.characters.results.map(dto => Character.fromDTO(dto))
    )
    const count = useResult(
      firstPageResult,
      [],
      data => data?.characters?.info?.count!
    )

    // const pages = useResult(
    //   firstPageResult,
    //   [],
    //   data => data?.characters?.info?.pages!
    // )
    watch(count, (currentValue, oldValue) => {
      let newCount: any = currentValue;
      const arrayOfAllIds: number[] = Array.from(Array(newCount+1).keys()).slice(1)
      refetch({
        ids: arrayOfAllIds,
      }).then(() =>
        handleChangePage({ page: 1 })
      )
    })

    const { result, loading, error, refetch } = useQuery<GetCharactersByIdsResponseDTO>(GET_CHARACTERS_BY_IDS_QUERY, {
      ids: [1, 2, 3, 4, 5, 6, 7, 8],
    });

    characters = useResult(
      result,
      [],
      data => data?.charactersByIds.map(dto => Character.fromDTO(dto))
    );

    // currentPageCharactersList.value = [...characters.value];
  
    const handleChangePage = (({ page }) => {
      console.log(page, 'page')
      const firstIndex = (page - 1) * pageSize;
      currentPageCharactersList.value = characters.value.slice(firstIndex, firstIndex + pageSize);
    })

    // const currentPageCharactersList = computed (() => {
    //   const firstIndex = (currentPage.value - 1) * pageSize;
    //   return characters.value?.slice(firstIndex, firstIndex + pageSize);
    // })

    return {
      loading,
      error,
      characters,
      count,
      pageSize,
      currentPageCharactersList,
      refetch,
      handleChangePage
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.CharacterList {
  height: 100vh;
}

.loading-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100px;
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
