<template>
  <div>
    <h1>Page Two</h1>
    <button @click="handleClick">Home</button>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {defineComponent, onMounted, ref, reactive, watch} from "vue";

const router = useRouter()

const handleClick = () => router.push({path: '/Home'})
onMounted(() => {
  console.log("haha")
  console.log(router.currentRoute)
})


</script>