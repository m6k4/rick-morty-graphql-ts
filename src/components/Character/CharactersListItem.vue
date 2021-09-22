<template>
  <div>
     <img :src="character.getImageUrl()" />
      {{character.getId()}} 
      {{character.getName()}} 
      {{character.getGender()}} 
      {{character.getSpecies()}} 
      "{{character.getLatestEpisode().getName()}}"
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Character } from "./Character";

export default defineComponent({
  name: "CharactersListItem",

  props: {
    character: {
      type: Character,
      default: {}
    }
  },
  setup(props) {
    const character = ref(props.character);
 
    return {
      character,
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
