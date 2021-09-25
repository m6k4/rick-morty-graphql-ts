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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #A9B1BD;
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
