<template>
    <div class="shell">
        <div class="image1" ></div>
        <div class="heading">
            <h1>When you are confused</h1>
        </div>
        <div class="text">
            <h1>Set goals in your mind</h1>
        </div>

        <div class="image2" ></div>
        <div class="heading">
            <h1>When you're down</h1>
        </div>
        <div class="text">
            <h1>Try to wake up the beast in your heart</h1>
        </div>

        <div class="image3" style=""></div>
        <div class="heading">
            <h1>When prople leave you</h1>
        </div>
        <div class="text">
            <h1>It's time to start your season</h1>
        </div>

        <div class="image4" ></div>
        <div class="heading">
            <h1>Come on,stranger.</h1>
        </div>
    </div>

</template>



<script setup lang="ts">
import router from "@/router"

const toRegister = () => {
    router.push({ path: '/register' })
}

const tologin = () => {
    router.push({ path: '/login' })
}

</script>

<style scope lang="scss">
    * {
        padding: 0;
        margin: 0;
        overflow: hidden;
    } 

    .shell{
        height: 100vh;
       overflow-y: scroll;
       overflow-x: hidden;
        perspective: 3px;
    }
    .shell div{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: 30px;
        letter-spacing: 2px;
    }
    .image1{
        transform: translateZ(-1px) scale(1.6);
        background-size: cover;
        height: 100vh;
        z-index: -1;
        background-image: url(@/assets/1.png);
    }
    .image2{
        transform: translateZ(-1px) scale(1.6);
        background-size: cover;
        height: 100vh;
        z-index: -1;
        background-image: url(@/assets/2.png);
    }
    .image3{
        transform: translateZ(-1px) scale(1.6);
        background-size: cover;
        height: 100vh;
        z-index: -1;
        background-image: url(@/assets/3.png);
    }
    .image4{
        transform: translateZ(-1px) scale(1.6);
        background-size: cover;
        height: 100vh;
        z-index: -1;
        background-image: url(@/assets/4.png);
    }
    .text{
        height: 50vh;
        background-color: #fff;
    }
    .text h1{
        color: #000;
    }
    .heading{
        z-index: -1;
        transform: translateY(-30vh) translateZ(1px);
        color: #fff;
        font-size: 30px;
    } 
</style>