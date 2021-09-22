<template>
  <div class="CharactersList">
     <img 
        v-if="loadingAll"
        class="loading-logo" 
        src="@/assets/rick-head.png"
      />
    <el-tabs v-model="activeName">
      <el-tab-pane label="All characters" name="all">
        <CharacterListItem v-for="character in currentPageCharactersList"
          :key="character.getId()"
          :character="character"
        />
        <el-pagination background layout="prev, pager, next" 
          :total="allCharacters.length"
          :page-size="pageSize"
          @current-change="handleChangePage"
        />
      </el-tab-pane>
      <el-tab-pane label="Favourites" name="favourites">
        <CharacterListItem v-for="character in currentPageFavouritesCharactersList"
          :key="character.getId()"
          :character="character"
        />
        <el-pagination background layout="prev, pager, next" 
          :total="charactersFav.length"
          :page-size="pageSize"
          @current-change="handleChangePageForFavourites"
        />
      </el-tab-pane>
    </el-tabs> 
    <!-- <ThePagination 
      :count="671" 
      :page-size="pageSize"
      :page-count="34"
      @changePage="handleChangePage"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, watch, ref, computed, reactive, Ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_QUERY, GET_CHARACTERS_BY_IDS_QUERY, GET_INFO_QUERY } from "../../graphql/getCharacters";
import { Filter } from '../../types/types';
import { GetCharactersByIdsResponseDTO } from '../../graphql/DTO/GetCharactersByIdsResponseDTO';
import { GetCharactersResponseDTO } from '../../graphql/DTO/GetCharactersResponseDTO';
import { Character } from "./Character";
import { Info } from "./Info";
import CharacterListItem from './CharactersListItem.vue';
import ThePagination from '../Common/ThePagination.vue';
import { GetInfoResponseDTO } from "@/graphql/DTO/GetInfoResponseDTO";

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
    const activeName = ref('all');
    const searchOptions = ref(props.searchOptions); 
    const pageSize = 8;
    const loadingAll = ref(false);
    const favouritesIds = ref(["1", "2", "3", "4", "5", "6", "7", "19", "22", "23", "34", "45"]);
    const currentPageCharactersList = ref<Array<Character>>([]);
    const currentPageFavouritesCharactersList = ref<Array<Character>>([]);
    
    // INFO
    const { result: infoResult, onResult: infoOnResult } = useQuery<GetInfoResponseDTO>(GET_INFO_QUERY);

    const info = useResult(
      infoResult,
      [],
      data => Info.fromDTO(data?.characters?.info)
    );

    infoOnResult(infoResult => {
      loadingAll.value = true
      let { count }: any = info.value;
      const arrayOfAllIds: number[] = Array.from(Array(count+1).keys()).slice(1)
      refetch({
        ids: arrayOfAllIds,
      }).then(() => {
        loadingAll.value = false
        handleChangePage(1)
      }
      )
    })
  
    // CHARACTERS BY ID
    const { result, loading, error, onResult, networkStatus, refetch } = useQuery<GetCharactersByIdsResponseDTO>(GET_CHARACTERS_BY_IDS_QUERY, {
      ids: [],
    });
    
    const allCharacters = useResult(
      result,
      [],
      data => data?.charactersByIds.map(dto => Character.fromDTO(dto))
    );

    let charactersFav = ref<Array<Character>>([]);

    onResult(result => {
      if(allCharacters.value.length > 0) {
        charactersFav.value = allCharacters.value.filter((character) => 
          favouritesIds.value.includes((character.id))
        );
        console.log(charactersFav.value, 'przefiltrowane przez id')
        handleChangePageForFavourites(1);
      }
    })

    const handleChangePage = ((page) => {
      const firstIndex = (page - 1) * pageSize;
      currentPageCharactersList.value = allCharacters.value.slice(firstIndex, firstIndex + pageSize);
    })
    
    const handleChangePageForFavourites = ((page) => {
      const firstIndex = (page - 1) * pageSize;
      currentPageFavouritesCharactersList.value = charactersFav.value.slice(firstIndex, firstIndex + pageSize);
    })

    return {
      loadingAll,
      error,
      allCharacters,
      pageSize,
      currentPageCharactersList,
      currentPageFavouritesCharactersList,
      charactersFav,
      activeName,
      networkStatus,
      handleChangePage,
      handleChangePageForFavourites
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
