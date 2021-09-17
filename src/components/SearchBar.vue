<template>
   SearchBar
   <input
        placeholder="write character name"
        v-model="searchedValue"
        @input="handleInputChange"
      />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  // called once automaticly when the component is created
  setup(props, context) {

    const searchedValue = ref<string>('');

    const handleInputChange = () => {
      setTimeout(() => {
        context.emit('search', searchedValue.value)
      }, 500)
    }
    
    return {
      searchedValue,
      handleInputChange,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
