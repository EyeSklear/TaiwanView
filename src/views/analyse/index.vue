<template>
  <h1>Page Two</h1>
  <button @click="handleClick">Home</button>
</template>

<script lang="ts">
import {useRouter} from 'vue-router';
import {defineComponent, onMounted, ref, reactive, watch} from "vue";

export default defineComponent({


  name: "analyse",
  setup() {
    const router = useRouter()

    const handleClick = () => router.push({path: '/Home'})
    onMounted(() => {
      console.log(router.currentRoute)
    })
    return {
      handleClick
    }
  }
})


</script>
