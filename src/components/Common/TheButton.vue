<template>
   <div class="CustomButton">
      <el-button class="CustomButton"
         :class="{animate: isAnimateHover, defaultHover: isDefaultHover}"
         :disabled="disabled || isLoading"
         @click.stop="handleClick"
         :style="{
            'background': background,
            'color': textColor,
            'border': border,
            'width': width,
            'border-radius': borderRadius + 'px',
            }"
      >
         <i v-if="isLoading" class="fa fa-spinner fa-spin CustomButton__icon" aria-hidden="true" />
         <div v-else>
            <span class="text">
               <slot name="text"></slot>
            </span>

            <div class="icon" :style="{'font-size': iconSize + 'px'}">
               <slot name="icon"></slot>
            </div>
         </div>
      </el-button>
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