<template>
  <div class="TheLoading">
    <div class="TheLoading__content">
      <img 
        class="TheLoading__content__img" 
        src="@/assets/rick-head.png"
      /> 
      <label class="TheLoading__content__text">
        {{ text }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "TheLoading",
  props: {
    text: {
      type: String,
      default: 'Loading character list...'
    },
  },
});
</script>

<style scoped>

.TheLoading {
  height: 100%
}
.TheLoading__content {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  align-items: center;
  display: flex;
  flex-direction: column;
}

.TheLoading__content__img {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  width: 100px;

}

.TheLoading__content__text {
  margin-top: 40px
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
