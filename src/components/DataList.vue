
<style lang='scss' scoped>
*{
padding: 0;
margin: 0;
//overflow-y: scroll;
//overflow-x: hidden;
}
.container {
  width: 100%;
  height: 250vh;
overflow: hidden;
  position: relative;
  .head-intro{
    width: 100%;
    height:93vh;
    background: url("/resource/city.png");
        background-size: cover;

  }
  .left {
    //flex: 1;
    position: absolute;
    
    width: 20vw;
    height: 200vh;
    background-color: antiquewhite;

    .left-tree {
      position: fixed;
      left: 5%;
top:0vh;
      width: 15%;
      height: 50vh;
      background-color: brown;
    display: none;

    }
  }

  .middle {
    //flex: 1;
    position: absolute;
    width: 60%;
    height: 200vh;
    left:20vw;
    background-color: azure;
    .search{
      width:56vw;
      position: absolute;
      left:2vw;
      right:2vw;
      top:3vh;
      height: 5vh;
      border: 2px solid black;
      padding: 20px;
      box-sizing: border-box;
      //padding: 10vh;
      background-color: bisque;
    }
  }
  .right {
    //position: relative;
    position: absolute;
    width: 20vw;
    height: 200vh;
    left:80vw;
    background-color: bisque;
    .hot{
      position:fixed ;
      width: 10vw;
        height: 20vh;
        left:85vw;
        top:10vh;
        background-color: black;
    }
    .feature{
      position:fixed ;
      width: 10vw;
        height: 20vh;
        left:85vw;
        top:40vh;
        background-color: black;
    }
  }

}
</style>
<template>
  <!-- <div style="position:absolute;left:20vw;">
    <DataCard></DataCard>
  </div> -->
  <div class="container">
    <div class="head-intro"></div>
    <div class="left">
      <div class="left-tree" id="left-tree">
      
      </div>
    </div>
    <div class="middle">
      <div class="search">
        搜索栏
      </div>
      <!-- <div 
      style="width:16vw;height:40vh;position:absolute;left:17vw;top:1vh;border: 2px solid black;;">
        <DataCard></DataCard>
      </div>
      <div 
      style="width:16vw;height:40vh;position:absolute;top:1vh;border: 2px solid black;;">
        <DataCard></DataCard>
      </div> -->

      <div
      v-for="index of [0,1,2,3,4,5,6,7,8,9,10]" :key="index"
      :style="{ width:'16vw',height:'40vh', position:'absolute',border: '2px solid black',top: ( Math.trunc(index/3)*42+60)+'vh',left: ( Math.trunc(index%3)*17+5)+'vw',}"
      >
      <DataCard></DataCard>

      </div>

    </div>
    <div class="right" id="right">
      <div class="hot">

      </div>
      <div class="feature">

</div>
    </div>
  </div>
</template>


<script setup lang="ts" >
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, ref, reactive, watchEffect, watch, onBeforeMount } from "vue";
import { useDraggable } from '@vueuse/core'
import { move } from '@/directives/drag'
import DataCard from './cards/DataCard.vue';
const router = useRouter()
const handleClick = () => {
  router.push({ path: '/Home' })
}

onBeforeMount(() => {
 
})
onMounted(() => {
  window.addEventListener('scroll', function() {
  const scrollTop =  document.documentElement.scrollTop;
  const threshold = window.innerHeight; // 设置阈值，比如屏幕高度的一半
  const stickyBox1 = document.getElementById('left-tree');
  const stickyBox2 = document.getElementById('right');
  console.log(threshold)
  
  if (scrollTop >= 0.88*threshold) {
    stickyBox1!.style.display = 'block'; // 显示sticky定位的box
    stickyBox2!.style.display = 'block';
  } else {
    stickyBox1!.style.display = 'none'; // 隐藏sticky定位的box
    stickyBox2!.style.display = 'none'; 
  }
});
  console.log('ipt2:')
})
</script>


