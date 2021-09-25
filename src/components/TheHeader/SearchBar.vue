<template>
   <div class="SearchBar">
     <div class="SearchBar__container">
      <select 
        class="SearchBar__container__select"
        v-model="searchedType"
      >
        <option v-for="filter in filterTypes" 
          :key="filter.type"
        >
        {{filter.label}}
        </option>
      </select>
      <input
        class="SearchBar__container__input"
        :placeholder="`write ${searchedType}`"
        v-model="searchedValue"
      />
      <button 
        class="SearchBar__container__button"
        @click="handleSearch"
      >
        Search
      </button>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  // called once automaticly when the component is created
  setup(props, context) {

    const filterTypes = [ 
      {
        'name': 'name',
        'label': 'name',
        'type': 'character'
      },
       {
        'name': 'id',
        'label': 'identifier',
        'type': 'id'
      },
       {
        'name': 'episode',
        'label': 'episode',
        'type': 'episode'
      }
    ]
    const searchedType = ref<string>('name');
    const searchedValue = ref<string>('');

    const handleSearch = () => {
        context.emit('search', {
          name: searchedType.value,
          value: searchedValue.value,
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
.SearchBar {
  margin: 0;
}

.SearchBar__container {
  height: 56px;
  width: 505px;
  border: 1px solid #A9B1BD;
  border-radius: 4px;
  position: relative;
};

.SearchBar__container__select {
  all: unset !important;
};

.SearchBar__container__input {
  background: blue;
  all: unset !important;
};

.SearchBar__container__button {
  all: unset !important;
  width: 100px;
  height: 100px;
};


</style>
