<template>
  <div class="CharactersList">
    <TheLoading v-if="isLoading"/>
    <section
        v-else
        class="CharactersList__content"
    >
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="All characters" name="all">
          <CharacterTable :characters="filteredCharacterList"
                          @set-favourite="setFavourite"
          />
        </el-tab-pane>
        <el-tab-pane label="Favourites" name="favourites">
          <CharacterTable :characters="favouriteCharacterList"
                          @set-favourite="setFavourite"
          />
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from "vue";
import CharacterTable from './CharacterTable.vue';
import TheLoading from '../Common/TheLoading.vue';
import {FilterOption} from "@/types/types";
import useCharacter from "@/components/Character/composable/useCharacter";

export default defineComponent({
  name: "CharactersList",
  components: {
    CharacterTable,
    TheLoading
  },
  props: {
    filterOption: {
      type: Object as PropType<FilterOption>,
      default: {
        type: null,
        value: null
      }
    }
  },
  setup(props) {
    const activeTabName = ref<string>('all');

    const {
      filteredCharacterList,
      isError,
      isLoading,
      favouriteCharacterList,
      setFavourite,
      fetch,
      filter
    } = useCharacter();

    fetch();

    watch(props, () => {
      const filterOptions: FilterOption = (props as { filterOption: FilterOption }).filterOption;
      filter(filterOptions);
    });

    return {
      filteredCharacterList,
      favouriteCharacterList,
      isError,
      isLoading,
      setFavourite,
      fetch,
      filter,
      activeTabName
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.CharacterList {
  height: 100vh;
}

.el-tabs__header {
  padding: 28px 0;
}

@media (max-height: 1000px) {
  .el-tabs__header {
    padding: 12px 0;
  }
}

.el-tabs__nav {
  margin-left: 140px
}

.el-tabs__active-bar {
  background-color: #11B0C8 !important;
}

.el-tabs__header {
  background-color: #fff !important;
}

.el-tabs__item.is-active {
  color: #11B0C8 !important;
}

.el-tabs__item:hover {
  color: #11B0C8 !important;
}


@media (max-width: 1366px) {
  .el-tabs__nav{
    margin-left: 20px
  }
}

</style>
