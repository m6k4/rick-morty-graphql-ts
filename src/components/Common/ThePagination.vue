<template>
  <div class="ThePagination">
    <div class="base-pagination">
    <button
      :disabled="isPreviousButtonDisabled"
      @click="changePage(currentPage--)"
    >
      ←
    </button>
    <button
      :disabled="isNextButtonDisabled"
      @click="changePage(++currentPage)"
    >
      →
    </button>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";


export default defineComponent({
  name: "ThePagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
     pageCount: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const totalRecords = ref(props.total); 
    const pageCount = ref(props.pageCount); 
    const pageSize = ref(props.pageSize); 
    const currentPage = ref(1); 
    
    const isPreviousButtonDisabled = computed (() => {
      return currentPage.value === 1;
    })

    const isNextButtonDisabled = computed (() => {
      return currentPage.value === pageCount.value;
    })

    const changePage = ((page: number) => {
      context.emit('changePage', {
        page
      })
    })
  
    return {
      totalRecords,
      pageSize,
      currentPage,
      isPreviousButtonDisabled,
      isNextButtonDisabled,
      changePage
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
