<template>
  <div class="CharactersView">
    <TheHeader>
      <template #header-content>
        <SearchBar @search="handleSearch" />
      </template>
    </TheHeader>
    <section>
      <CharactersList :search-options="searchOptions" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SearchBar from '../components/TheHeader/SearchBar.vue';
import CharactersList from '../components/Character/CharactersList.vue';
import TheHeader from '../components/Platform/TheHeader.vue';

export default defineComponent({
  name: 'Characters',
  components: {
    SearchBar, 
    CharactersList,
    TheHeader
  },
  
  // called once automaticly when the component is created
  setup() {
    const searchOptions = reactive({
      name: '',
      value: ''
    });

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

<style scoped>
.CharactersView {
  margin: 0;
}
</style>
