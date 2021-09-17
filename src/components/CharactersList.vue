<template>
  <div>
    {{characters}} characters
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS_QUERY } from "../graphql/getCharacters";

export default defineComponent({
  name: "CharactersList",

  props: {
    searchOptions: {
      type: Object,
      default() {
        return { query: "", limit: 10 };
      }
    }
  },
  setup(props: { searchOptions: Record<string, any> }) {

    console.log(props);
    const { result, loading, error } = useQuery(GET_CHARACTERS_QUERY);

    const characters = useResult(
      result,
      [],
      data => data?.characters
    );

    return {
      loading,
      error,
      characters
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
