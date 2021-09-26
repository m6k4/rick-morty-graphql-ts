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
        {{ filter.type }}
      </option>
    </select>
    <span class="material-icons SearchBar__select__icon">
      arrow_drop_down
    </span>

    <input class="SearchBar__input"
           v-on:keyup.enter="handleSearch"
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
import {Filter, FilterType} from '@/types/types';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'SearchBar',
  setup(props, context) {

    const filterTypes: Array<Filter> = [
      {
        type: FilterType.NAME,
      },
      {
        type: FilterType.ID,
      },
      {
        type: FilterType.EPISODE,
      }
    ]
    const searchedType = ref<string>('name');
    const searchedValue = ref<string>('');

    const handleSearch = () => {
      context.emit('search', {
        type: searchedType.value,
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
}

@media (max-width: 900px) {
  .SearchBar {
    width: 460px;
  }
}

@media (max-width: 768px) {
  .TheHeader__img {
    width: 400px;
  }
}

@media (max-width: 400px) {
  .SearchBar__label {
    display: none
  }

  .SearchBar__select__icon {
    display: none
  }

}

</style>
