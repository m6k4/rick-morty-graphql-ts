<template>
  <div>
     <img :src="character.getImageUrl()" />
      {{character.getId()}} 
      {{character.getName()}} 
      {{character.getGender()}} 
      {{character.getSpecies()}} 
      "{{character.getLatestEpisode().getName()}}"
      <el-button 
        v-if="isFavourite"
        @click="favouritesStore.removeFromFavourites(character.getId())"
      >
        Remove from fav
      </el-button>
      <el-button 
        v-else
        @click="favouritesStore.addToFavourites(character.getId())"
      >
        Add to fav
      </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Character } from "./Character";
import { favouritesStore } from './state/favouritesState';

export default defineComponent({
  name: "CharactersListItem",
  props: {
    isFavourite: {
      type: Boolean,
      default: false
    },
    character: {
      type: Character,
      default: {}
    }
  },
  setup(props) {
    const character = ref(props.character);
    return {
      character,
      favouritesStore
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 70px;
  width: 70px;
}
</style>
