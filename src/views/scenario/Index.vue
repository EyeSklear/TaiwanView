<style lang="scss" scoped>
@keyframes ibannerbg {
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

//除了width以外，这里必须有固定的高度值，不可以集成父组件的div中高度再用百分比表示，如这里的height不可以设置为100%，否则显示失效
.container{
    width: 100%;
    height: 93vh;
    //height: calc(93vh + 250px);
    overflow: hidden;
    position: relative;
    .bg{
        height: calc(93vh);
        
        background: url("/resource/city.png");
        background-size: cover;
        animation: ibannerbg 30s linear infinite;


}
.main{
    width: 100%;
    height: 93vh;
    position: absolute;
    top: calc(60% - 500px);
    .el-carousel {
      height: 70%;
      width: 100%;
      :deep(.el-carousel__container) {
        height: calc(100% - 30px);
      }

      // /deep/ .el-carousel__indicators {
      //   opacity: 0;
      // }

      .el-carousel__item {
        border-radius: 6px;
        .card {
          margin: 20px;

          width: calc(100% - 40px);
          height: calc(100% - 40px);
          .image {
            width: 100%;
            height: 80%;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .name {
            font-size: 30px;
            font-weight: 800;
            margin-top: 20px;
          }
          .des {
            font-size: 20px;
            line-height: 50px;
            color: #8c8c8c;
            font-weight: 500;
          }
          .btn {
            position: absolute;
            bottom: 30px;
            right: 20px;
          }
        }
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
}
}
</style>

<template>
    <div class="container">
        <div class="bg"></div>
       <div class="main">
       <el-carousel :interval="5000" type="card" :autoplay="false">
        <el-carousel-item v-for="(item, index) in dataList" :key="index">
          <div class="card">
            <div class="image">
              <img :src="item.avatar" />
            </div>
            <div class="name">
              {{ item.name }}
            </div>
            <div class="des">
              {{ item.des }}
            </div>
            <div class="btn">
              <el-button
                type="primary"
                size="large"
                @click="clickHandle(item.path)"
                >查看详情</el-button
              >
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
 const dataList = [
      {
        path: "/mapview",
        name: "台湾可视化一张图",
        des: "对台湾街景、路况、监控视频、卫星影像与倾斜影像等进行展示",
        avatar: "./obimage.png",
      },
    //   {
    //     path: "/scenario/scenarioTwo",
    //     name: "区域流场一张图",
    //     des: "对长江区域流场进行可视化",
    //     avatar: "./flow.png",
    //   },
    //   {
    //     path: "/scenario/waterway",
    //     name: "AIS一张图",
    //     des: "展示长江区域航道现况",
    //     avatar: "./ship.png",
    //   },
    //   {
    //     path: "/scenario/scenarioFour",
    //     name: "工程方案一张图",
    //     des: "对长江区域已有工程以及现有方案进行描述",
    //     avatar: "./project.png",
    //   },
    ];

    const clickHandle = (path: string) => {
      router.push({
        path: path,
      });
    };
</script>