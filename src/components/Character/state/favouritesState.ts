import { computed, reactive, readonly } from "vue";

  const state = reactive({
    favouritesIdsList: []
  })

  const addToFavourites = (id: number) => {
    state.favouritesIdsList.push(id);
  }

  const removeFromFavourites = (id: number) => {
    state.favouritesIdsList = state.favouritesIdsList.filter(item => item !== id);
  }

  export const favouritesStore = readonly({
    state,
    addToFavourites,
    removeFromFavourites
  });