<template>
  <div class="CharactersView">
    <TheHeader>
      <template #header-content>
        <SearchBar @search="handleSearch"/>
      </template>
    </TheHeader>
    <section>
      <CharactersList :filter-option="filterOption"/>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import SearchBar from '../components/Header/SearchBar.vue';
import CharactersList from '../components/Character/CharactersList.vue';
import TheHeader from '../components/Header/TheHeader.vue';
import {FilterOption} from "@/types/types";

export default defineComponent({
  name: 'Characters',
  components: {
    SearchBar,
    CharactersList,
    TheHeader
  },

  setup() {
    const filterOption = reactive<FilterOption>({
      type: null,
      value: null
    });

    const handleSearch = (filters: FilterOption) => {
      filterOption.type = filters.type;
      filterOption.value = filters.value;
    };

    return {
      filterOption,
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
