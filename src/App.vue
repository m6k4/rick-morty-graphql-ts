<template>
  <div class="AppView">
    <header class="AppView__header">
      <img 
        class="header--logo" 
        src="@/assets/logo.png"
      />
      <div class="header--search" >
        <SearchBar @search="handleSearch" />
      </div>
    </header>
    <section class="AppView__container">
      <CharactersList :search-options="searchOptions" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SearchBar from './components/TheHeader/SearchBar.vue';
import CharactersList from './components/Character/CharactersList.vue';

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
  color: #2c3e50;
  margin-top: 10px;
}

.AppView {
  width: 100%;
  height: 100%;
}

.AppView__header {
  align-items: center;
  padding: 10px;
  width: 100%;
  display: flex;
  height: 100px;
}

.header--logo {
  height: 100px
}

.header--search {
  margin-left: 50px;
}

</style>
