<template>
  <div class="CharacterTable">
    <section v-if="!isLoading && characters.length === 0"> 
      <EmptyList />
    </section>
    <section v-else>
      <header class="CharacterTable__header">
        <div class="CharacterTable__column">
          Photo
        </div>
        <div class="CharacterTable__column">
          Character ID
        </div>
        <div class="CharacterTable__column">
          Name
        </div>
        <div class="CharacterTable__column">
          Gender
        </div>
        <div class="CharacterTable__column">
          Species
        </div>
        <div class="CharacterTable__column">
          Last Episode
        </div>
        <div class="CharacterTable__column">
          Add To Favourites
        </div>
      </header>
      <div class="CharacterTable__row" 
        v-for="character in currentPageList"
        :key="character.getId()"
      >
        <div class="CharacterTable__column">
          <img class="CharacterTable__img"
            :src="character.getImageUrl()"
          />
        </div>
        <div class="CharacterTable__column">
          {{ character.getId() }}
        </div>
        <div class="CharacterTable__column">
          {{ character.getName() }}
        </div>
        <div class="CharacterTable__column">
          {{ character.getGender() }}
        </div>
        <div class="CharacterTable__column">
          {{ character.getSpecies() }}
        </div>
        <div class="CharacterTable__column">
          {{ character.getLatestEpisode().name }}
        </div>
        <div class="CharacterTable__column">
          <el-button 
            class="CharacterTable__button"
            :class="[character.getIsFavourite()  
              ? 'CharacterTable__button--favourite' 
              : 'CharacterTable__button'
            ]"
            @click="character.getIsFavourite() 
            ? $emit('removeFromFavourites', character.getId())
            : $emit('addToFavourites', character.getId())"
          >
            <span class="material-icons">
              star_rate
            </span>
          </el-button>
        </div>
      </div>
      <ThePagination 
        :total="characters.length"
        :page-size="pageSize"
        @current-change="handleChangePage"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRefs, Ref, ref, watch } from "vue";
import { Character } from "./Character";
import EmptyList from '../Common/EmptyList.vue';
import ThePagination from "../Common/ThePagination.vue";

export default defineComponent({
  name: "CharacterTable",
  components: {
    EmptyList,
    ThePagination,
    
  },
  props: {
    characters: {
      type: [] as PropType<Readonly<Character[]>>,
      default: []
    },
    isLoading: {
      type: Boolean,
      default: true
    }
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
.CharacterTable {
  margin: 0
}
.CharacterTable__button {
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #11B0C8;
  transition: all 0.5s;
  border-radius: 8px;
}
.CharacterTable__button span:nth-child(1){
  color: #11B0C8;
  width: 24px;
  height: 24px;
}

.CharacterTable__button--favourite {
  background: #11B0C8
}

.CharacterTable__button--favourite span:nth-child(1){
  color: #fff;
  width: 24px;
  height: 24px;
}

.CharacterTable__header, .CharacterTable__row {
  display: flex;
}

.CharacterTable__row {
  height: 76px;
  border-bottom: 2px solid rgba(229, 234, 244, 0.25); 
}
.CharacterTable__header {
  height: 54px;
  background: rgba(229, 234, 244, 0.25);
}

.CharacterTable__column {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 4px;
}

.CharacterTable__column:nth-child(1) {
  margin-left: 140px
}

.CharacterTable__img {
  height: 68px;
  border-radius: 4px;
}

@media (max-height: 1000px) {
  .CharacterTable__row {
     height: 48px;
  }
  .CharacterTable__img {
    height: 44px;
  }

  .CharacterTable__button {
    width: 36px;
    height: 36px;
  }

}
@media (max-width: 1366px) {
  .CharacterTable {
    font-size: 12px
  }
}
</style>
