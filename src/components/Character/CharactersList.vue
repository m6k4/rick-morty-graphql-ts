<template>
  <div class="CharactersList">
     <img 
        v-if="loadingAll"
        class="loading-logo" 
        src="@/assets/rick-head.png"
      />
    <el-tabs v-model="activeName">
      <el-tab-pane label="All characters" name="all">
        <CharacterListItem v-for="character in currentPageListCharacters"
          :key="character.getId()"
          :character="character"
        />
        <el-pagination background layout="prev, pager, next" 
          :total="filteredListLength"
          :page-size="pageSize"
          @current-change="handleChangePage"
        />
      </el-tab-pane>
      <el-tab-pane label="Favourites" name="favourites">
        <CharacterListItem v-for="character in currentPageListFavouritesCharacters"
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
import { defineComponent, toRefs, PropType, watch, ref, readonly, computed, reactive, Ref, toRef, unref, WritableComputedRef, ComputedRef } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_BY_IDS_QUERY, GET_INFO_QUERY } from "../../graphql/getCharacters";
import { Filter } from '../../types/types';
import { GetCharactersByIdsResponseDTO } from '../../graphql/DTO/GetCharactersByIdsResponseDTO';
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
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const activeName = ref('all');
    const { searchOptions } = toRefs(props)
    const pageSize = 8;
    const currentPageAllCharacters: Ref<number> = ref(1);
    const currentPageFavouritesCharacters: Ref<number> = ref(1);
    const loadingAll = ref(false);
    const favouritesIds = ref([1, 2, 3, 4, 6, 8, 11, 44, 16, 55, 34, 64, 21, 23, 24]);

    const filteredListLength: Ref<number> = computed (() => {
       if(filteredList.value) {
        return filteredList.value.length;
       }
    });
    const filteredList: any = computed (() => {
          console.log(searchOptions.value.name);

      if(allCharacters.value.length > 0 ) {
        if(searchOptions.value.name === 'name') {
          return allCharacters.value.filter((character) => 
            character.name.toUpperCase().includes(searchOptions.value.value.toUpperCase()) 
          )
        }
        if(searchOptions.value.name === 'identifier') {
          return allCharacters.value.filter((character) =>
            character.id === searchOptions.value.value
          )
        }
        if(searchOptions.value.name === 'episode') {
          
        }
        return allCharacters.value;
      }
    })

    const currentPageListCharacters = computed (() => {
      if(filteredList.value !== undefined) {
        console.log(filteredList)
        const firstIndex = (currentPageAllCharacters.value - 1) * pageSize;
        return filteredList.value.slice(firstIndex, firstIndex + pageSize);
      }
    });

    const currentPageListFavouritesCharacters = computed (() => {
      if(filteredList.value !== undefined) {
        const firstIndex = (currentPageFavouritesCharacters.value - 1) * pageSize;
        return charactersFav.value.slice(firstIndex, firstIndex + pageSize);
       }
    });

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
    const { result, error, onResult, networkStatus, refetch } = useQuery<GetCharactersByIdsResponseDTO>(GET_CHARACTERS_BY_IDS_QUERY, {
      ids: [],
    })
    
    const allCharacters = useResult(
      result,
      [],
      data => data?.charactersByIds.map(dto => Character.fromDTO(dto))
    );

    let charactersFav = ref<Array<Character>>([]);

    //watch na all characters zamiast tego
    onResult(result => {
      if(allCharacters.value.length > 0) {
        charactersFav.value = allCharacters.value.filter((character) => 
          favouritesIds.value.includes((parseInt(character.id)))
        );
        handleChangePageForFavourites(1);
      }
    })

    const handleChangePage = ((page) => {
      currentPageAllCharacters.value = page;
      // const firstIndex = (page - 1) * pageSize;
      // currentPageListCharacters.value = filteredList.value.value.slice(firstIndex, firstIndex + pageSize);
    })
    
    const handleChangePageForFavourites = ((page) => {
      currentPageFavouritesCharacters.value = page;
      // const firstIndex = (page - 1) * pageSize;
      // currentPageListFavouritesCharacters.value = charactersFav.value.slice(firstIndex, firstIndex + pageSize);
    })

    return {
      filteredListLength,
      filteredList,
      searchOptions,
      loadingAll,
      error,
      allCharacters,
      pageSize,
      currentPageListCharacters,
      currentPageListFavouritesCharacters,
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
