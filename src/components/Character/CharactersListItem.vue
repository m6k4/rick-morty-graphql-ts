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
import { defineComponent, toRefs } from "vue";
import { Character } from "./Character";

export default defineComponent({
  name: "CharactersListItem",

  props: {
    character: {
      type: Character,
      default() {
        return {};
      }
    }
  },
  setup(props: { character: Character }) {
    const { character } = toRefs(props);
 
    return {
      character,
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
