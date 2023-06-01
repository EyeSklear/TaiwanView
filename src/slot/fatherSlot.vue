<template>

  <div>
    <!-- 匿名插槽 -->
    <!-- <son>
     <template v-slot>
         <div>hahaha</div>
     </template>
    </son> -->
    <son>
      <template #header>
        <div>1</div>
      </template>
      <template #default>
        <div>2</div>
      </template>
      <template #footer>
        <div style="width:500px;height:500px;background-color:red">3</div>
      </template>
    </son>
  </div>
</template>

<script setup lang="ts">
import son from "./sonSlot.vue"


</script>

<style lang="scss" scoped>


</style>

