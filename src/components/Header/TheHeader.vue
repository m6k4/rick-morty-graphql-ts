<template>
  <header class="TheHeader">
    <img
        class="TheHeader__img"
        src="@/assets/logo.png"
    />
    <slot name="header-content"/>
  </header>
</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "TheHeader",
});
</script>

<style scoped>
.TheHeader {
  align-items: center;
  padding: 10px;
  width: 100%;
  display: flex;
  height: 132px;
  border-bottom: 2px solid rgba(229, 234, 244, 0.25);
}

.TheHeader__img {
  height: 70px;
  margin-left: 140px;
  margin-right: 80px
}

@media (max-width:1366px) {
  .TheHeader__img {
    margin-left: 20px;
  }
}
@media (max-width: 900px) {
  .TheHeader {
    height: 96px;
    display: flex;
    justify-content: center;
  }

  .TheHeader__img {
    height: 70px;
    margin-left: 20px;
    margin-right: 40px
  }
}

@media (max-width: 600px) {
  .TheHeader__img {
    display: none
  }
}

</style>
