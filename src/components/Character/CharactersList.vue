<template>
  <div class="CharactersList">
     <img 
        v-if="loadingAll"
        class="loading-logo" 
        src="@/assets/rick-head.png"
      /> 
    <el-tabs v-model="activeName">
      <el-tab-pane label="All characters" name="all">
        <CharacterTable :characters="filteredList"
          @add-to-favourites="handleAddToFavourites"
          @remove-from-favourites="handleRemoveFromFavourites"
        />
      </el-tab-pane>
      <el-tab-pane label="Favourites" name="favourites">
        <CharacterTable :characters="favouritesList"
          @remove-from-favourites="handleRemoveFromFavourites"
        />
      </el-tab-pane>
    </el-tabs> 
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed, ComputedRef } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_BY_IDS_QUERY, GET_INFO_QUERY } from "../../graphql/getCharacters";
import { Filter } from '../../types/types';
import { GetCharactersByIdsResponseDTO } from '../../graphql/DTO/GetCharactersByIdsResponseDTO';
import { Character } from "./Character";
import { Info } from "./Info";
import { GetInfoResponseDTO } from "@/graphql/DTO/GetInfoResponseDTO";
import CharacterTable from './CharacterTable.vue';
import { Episode } from "./Episode";
import { favouritesStore } from './state/favouritesState';

export default defineComponent({
  name: "CharactersList",
  components: {
    CharacterTable
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
    const loadingAll = ref(false);
    const allCharacters = ref<Array<Character>>([])

    const handleAddToFavourites = ((characterId: number) => {
     console.log('add');
     favouritesStore.addToFavourites(characterId);
      allCharacters.value.forEach(character => {
        character.getId() ===  characterId ?
          character.setIsFavourite(true) : ''
       })
    })

    const handleRemoveFromFavourites =  ((characterId: number) => {
      favouritesStore.removeFromFavourites(characterId);
      allCharacters.value.forEach(character => {
      character.getId() ===  characterId ?
        character.setIsFavourite(false) : ''
      })
    })

    const favouritesList = computed (() => {
      return filteredList.value.filter(character => character.getIsFavourite())
    })

    const filteredList: ComputedRef<{ getId: () => number; getName: () => string; getGender: () => string; getSpecies: () => string; getImageUrl: () => string; getEpisode: () => Episode[]; getLatestEpisode: () => Episode; getIsFavourite: () => boolean; setIsFavourite: (status: boolean) => void; }[]> = computed (() => {
      if(!searchOptions.value.value) return allCharacters.value;
      if(allCharacters.value.length > 0 ) {
        if(searchOptions.value.name === 'name') {
          return allCharacters.value.filter((character) => 
            character.getName().toUpperCase().includes(searchOptions.value.value.toUpperCase()) 
          )
        }
        if(searchOptions.value.name === 'identifier') {
          return allCharacters.value.filter((character) =>
            character.getId() === searchOptions.value.value
          )
        }
        if(searchOptions.value.name === 'episode') {
            return allCharacters.value.filter((character) =>
            character.getEpisode().some((epidose) =>
              epidose.getName() === searchOptions.value.value.toUpperCase())
          )
        }
        return allCharacters.value;
      }
    })

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
      }
      )
    })
  
    // ALL CHARACTERS BY ID
    const { result, error, onResult, networkStatus, refetch } = useQuery<GetCharactersByIdsResponseDTO>(GET_CHARACTERS_BY_IDS_QUERY, {
      ids: [],
    })
    
    useResult(
      result,
      [],
      data => data?.charactersByIds.map(dto => Character.fromDTO(dto))
    );

    onResult(result => {
      allCharacters.value = result.data?.charactersByIds.map(dto => Character.fromDTO(dto))
    })
    
    return {
      favouritesList,
      filteredList,
      loadingAll,
      error,
      activeName,
      handleAddToFavourites,
      handleRemoveFromFavourites
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
