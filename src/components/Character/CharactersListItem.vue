<template>
  <div>
     <img :src="character.image" />
      {{character.id}} 
      {{character.name}} 
      {{character.gender}} 
      {{character.species}} 
      "{{character.episode[character.episode.length - 1].episode}}"
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "CharactersListItem",

  props: {
    character: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props: { character: any }) {
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
