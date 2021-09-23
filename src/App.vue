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
import { defineComponent, ref, isRef, reactive } from 'vue';
import SearchBar from './components/TheHeader/SearchBar.vue';
import CharactersList from './components/Character/CharactersList.vue';
import { Filter } from './types/types';

export default defineComponent({
  name: 'App',
  components: {
    SearchBar, 
    CharactersList,
  },
  // called once automaticly when the component is created
  setup() {
    const searchOptions = reactive({
      name: '',
      value: ''
    });

    // const searchOptions = ref({});
    const handleSearch = (filters) => {
      searchOptions.name = filters.name;
      searchOptions.value = filters.value;
    };

    return {
      searchOptions,
      handleSearch,
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
