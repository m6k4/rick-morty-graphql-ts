<template>
  <section class="sec">
    <div class="container">
      <SearchBar @search="handleSearch" />
      <CharactersList :search-options="searchOptions" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SearchBar from './components/SearchBar.vue';
import CharactersList from './components/CharactersList.vue';

export default defineComponent({
  name: 'App',
  components: {
    SearchBar, 
    CharactersList,
  },
  // called once automaticly when the component is created
  setup() {

    const searchOptions = reactive ({
      query: "",
      limit: 10
    });

    const handleSearch = (query: string) => {
      searchOptions.query = query;
    };
    
    return {
      handleSearch,
      searchOptions,
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
