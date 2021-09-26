<template>
  <div class="SearchBar">
    <label class="SearchBar__label">
      Search by
    </label>
    <select 
      class="SearchBar__select"
      v-model="searchedType"
    >
      <option class="SearchBar__select__option" 
        v-for="filter in filterTypes" 
        :key="filter.type"
      >
      {{filter.label}}
      </option>
    </select>
    <span class="material-icons SearchBar__select__icon">
      arrow_drop_down
    </span>
    <input
      class="SearchBar__input"
      v-model="searchedValue"
    />
    <button 
      class="SearchBar__button"
      @click="handleSearch"
    >
      <span class="material-icons SearchBar__button__icon">
        search
      </span>
    </button>
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
  height: 56px;
  width: 504px;
  border: 1px solid #A9B1BD;
  border-radius: 8px;
  position: relative;
  display: flex;
}

.SearchBar__label {
  width: 128px !important;
  padding: 16px 20px;
}

.SearchBar__select {
  width: 108px !important;
  padding: 16px 0px 16px 20px !important;
  border-left: 1px solid #A9B1BD !important;
  border-right: 1px solid #A9B1BD !important;
}

.SearchBar__select:hover ~ .SearchBar__select__icon {
  color: #11B0C8;
}

.SearchBar__select__icon {
  position: absolute;
  left: 229px;
  top: 16px;
  font-size: 24px;
}

.SearchBar__button:hover {
  margin: 0;
  color: #11B0C8;
  cursor: pointer;
}

.SearchBar__button__icon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 28px
}

.SearchBar__input {
  padding-left: 16px !important;
}

.SearchBar__select, .SearchBar__input, .SearchBar__button, .SearchBar__select__option {
  all: unset;
};


</style>
