<template>
  <div class="EmptyList">
    <img class="EmptyList__img"
         src="@/assets/rick-empty.png"
    />
    <div class="EmptyList__text">
      <h5 class="EmptyList__title">
        {{ title }}
      </h5>
      <small class="EmptyList__description">{{ description }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "EmptyList",
  props: {
    title: {
      type: String,
      default: 'Empty list'
    },
    description: {
      type: String,
      default: 'Nothing to see'
    },
    image: {
      type: String,
      default: ''
    },
  },
});
</script>

<style scoped>
.EmptyList {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: row;
}

.EmptyList__img {
  height: 400px
}

.EmptyList__title {
  font-size: 37px;
  margin-top: 5px;
}

.EmptyList__description {
  font-size: 16px;
  font-weight: 300;
  margin-top: 15px;
}

@media (max-width: 730px) {
  .EmptyList {
    flex-direction: column
  }
}
</style>
