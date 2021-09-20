<template>
   SearchBar
   <select v-model="searchedType">
    <option v-for="(type, index) in filterTypes" 
      :key="index"
    >
    {{type}}
    </option>
  </select>
  <input
    :placeholder="`write ${searchedType}`"
    v-model="searchedValue"
  />
  <button @click="handleSearch">
    Search
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  // called once automaticly when the component is created
  setup(props, context) {

    const filterTypes = [
      'name', 'id', 'episode'
    ]
    const searchedType = ref<string>('name');
    const searchedValue = ref<string>('');

    const handleSearch = () => {
        context.emit('search', {
          [searchedType.value]: searchedValue.value,
        })
    }
    
    return {
      filterTypes,
      searchedType,
      searchedValue,
      handleSearch,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
