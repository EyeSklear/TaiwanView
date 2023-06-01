
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap');

.container {
    padding: 0;
    margin: 0;
    display: inline-block;
    //position: relative;
    // top: 20vh;
    // left: 30vw;
    
    width: 16vw;
    height:40vh;
    //border: 2px solid black;
    //border-radius: 10px;

    .head-pic {
        position: relative;
        height: 16vh;
        //background-color: rgba(44, 110, 110, 0.6);
        background-size: contain;
        //background: url('@/assets/3.png');
        

        .card-into {
            position: absolute;
            width: 16vw;
            height: 20%;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.5);
            opacity: 0.6;
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 20px;
            color: white;
            display: flex;
            align-items: center;
        }
    }

    .text {
        height: 24vh;
        position: relative;

        .title {
            display: flex;
            align-items: center;
            width: 12.8vw;
            height: 12%;
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 24px;
            padding: 15px 20px 10px 10px;
            line-height: 24px;

        }

        .author {
            width: 12.8vw;
            height: 8%;
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 16px;
            padding: 5px 10px 5px 10px;
            font-weight: 300;
        }

        .intro {
            width: 12.8vw;
            height: 25%;
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 16px;
            padding: 5px 10px 5px 10px;
            font-weight: 300;
            line-height: 25px;
        }

        .tag {
            width: 12.8vw;
            height: 10%;
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 16px;
            padding: 5px 10px 5px 10px;
            font-weight: 300;

            //line-height: 15px;
            div {
                display: inline-block;
                width: 15%;
                //height: 100%;
                margin-right: 0.8vw;
            }
        }

    }
}
</style>
<template>
    <div class="container">
        <div class="head-pic">
            <el-image style="height: 16vh;width: 16vw;" :src="getImageUrl('gg')" fit="fill" />
            <div class="card-into">
                <span style="margin-left:10px">气象类数据 </span>
            </div>
        </div>
        <div class="text">
            <div class="title">
                <span>台湾省降雨预测数据</span>
            </div>
            <div class="author">
                fgzkkx
            </div>
            <div class="intro">
                台湾省气象数据台湾省气象数据台湾省气象数据
            </div>
            <div class="tag">
                <div>
                    tag
                </div>
                <div>
                    tag
                </div>
                <div>
                    tag
                </div>
            </div>



        </div>


    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
const router = useRouter()
const handleClick = () => router.push({ path: '/Home' })
const getImageUrl = (name:any) => {
        return new URL('@/assets/3.png', import.meta.url).href
    }
onMounted(() => {
    console.log("haha")
    console.log(router.currentRoute)
})


</script>