<template>
  <div>
    <table>
      <tr>
        <th>Photo</th>
        <th>Character ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Species</th>
        <th>Last Episode</th>
        <th>Add To Favourites</th>
      </tr>
      <tr v-for="character in currentPageList"
        :key="character.getId()"
      > {{ character.getIsFavourite()}}
        <td><img :src="character.getImageUrl()"/></td>
        <td>{{ character.getGender() }}</td>
        <td>{{ character.getName() }}</td>
        <td>{{ character.getGender() }}</td>
        <td>{{ character.getSpecies() }}</td>
        <td>{{ character.getLatestEpisode() }}</td>
        <td>
        <el-button 
          v-if="character.getIsFavourite()"
          @click="$emit('removeFromFavourites', character.getId())"
        >
          Remove from fav
        </el-button>
        <el-button 
          v-else
          @click="$emit('addToFavourites', character.getId())"
        >
          Add to fav
        </el-button>
        </td>
      </tr>
    </table>
    <el-pagination background layout="prev, pager, next" 
      :total="characters.length"
      :page-size="pageSize"
      @current-change="handleChangePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRefs, Ref, ref, watch } from "vue";
import { Character } from "./Character";

export default defineComponent({
  name: "CharacterTable",
  props: {
    characters: {
      type: [] as PropType<Readonly<Character[]>>,
      default: []
    },
  },
  setup(props, context) {
    const { characters } = toRefs<any>(props);
    const currentPage: Ref<number> = ref(1);
    const pageSize = 8;

    const currentPageList = computed (() => {
      if(characters.value && characters.value.length > 0) {
        const firstIndex = (currentPage.value - 1) * pageSize;
        return characters.value.slice(firstIndex, firstIndex + pageSize);
      }
    });

    const handleChangePage = ((page) => {
      currentPage.value = page;
    })
    
    return {
      characters,
      pageSize,
      currentPageList,
      handleChangePage
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 70px;
  width: 70px;
}
</style>
