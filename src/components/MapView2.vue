<template>
  <div class="scene-map-wrapper3">
    <div id="zoom">{{ zoom }}</div>
    <div id="satezoom">
      {{ currentMouseValue[0] }},{{ currentMouseValue[1] }}
    </div>
    <div id="timevideo" v-if="sateValue == 'road2'">
      <el-card style="width: 300px" shadow="Hover">{{
        timefakeList[timeValue]
        }}
      </el-card>
    </div>
    <div id="video" v-if="videoValue != ''">
      <div
          style="
          width: 445px;
          position: relative;
          height: 30px;
          z-index: 20;
          font-size: 20;
          text-align: center;
          color: white;
        "
      >
        {{ videoName }}
      </div>
      <video
          id="myVideo1"
          ref="video"
          controls
          autoplay
          disablePictureInPicture="true"
          controlslist="nodownload noremoteplayback"
      >
        <source id="mp4_src" :src="videoSrc" type="video/mp4"/>
      </video>
    </div>
    <div id="osmctrl" v-if="OSMViewCheck">
      <div class="layer">
        <div style="display: inline-block; margin-right: 15px">
          <el-switch
              v-model="osmall"
              @change="changeosm(6, osmall)"
              style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          ></el-switch>
          <!-- <h3>OSM_liberty</h3> -->
        </div>
        <div style="display: inline-block">
          <!-- <el-switch  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch> -->
          <h3>全部</h3>
        </div>
      </div>
      <div class="layer">
        <div style="display: inline-block; margin-right: 15px">
          <el-switch
              v-model="osmBridge"
              @change="changeosm(1, osmBridge)"
              style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          ></el-switch>
          <!-- <h3>OSM_liberty</h3> -->
        </div>
        <div style="display: inline-block">
          <!-- <el-switch  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch> -->
          <h3>桥梁</h3>
        </div>
      </div>
      <div class="layer">
        <div style="display: inline-block; margin-right: 15px">
          <el-switch
              v-model="osmBuilding"
              @change="changeosm(2, osmBuilding)"
              style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          ></el-switch>
          <!-- <h3>OSM_liberty</h3> -->
        </div>
        <div style="display: inline-block">
          <!-- <el-switch  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch> -->
          <h3>建筑</h3>
        </div>
      </div>
      <div class="layer">
        <div style="display: inline-block; margin-right: 15px">
          <el-switch
              v-model="osmLand"
              @change="changeosm(3, osmLand)"
              style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          ></el-switch>
          <!-- <h3>OSM_liberty</h3> -->
        </div>
        <div style="display: inline-block">
          <!-- <el-switch  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch> -->
          <h3>陆地</h3>
        </div>
      </div>
      <div class="layer">
        <div style="display: inline-block; margin-right: 15px">
          <el-switch
              v-model="osmRoad"
              @change="changeosm(4, osmRoad)"
              style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          ></el-switch>
          <!-- <h3>OSM_liberty</h3> -->
        </div>
        <div style="display: inline-block">
          <!-- <el-switch  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch> -->
          <h3>道路</h3>
        </div>
      </div>
      <div class="layer">
        <div style="display: inline-block; margin-right: 15px">
          <el-switch
              v-model="osmWater"
              @change="changeosm(5, osmWater)"
              style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          ></el-switch>
          <!-- <h3>OSM_liberty</h3> -->
        </div>
        <div style="display: inline-block">
          <!-- <el-switch  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch> -->
          <h3>河流</h3>
        </div>
      </div>
    </div>
    <div id="left" v-if="leftVisual">
      <el-scrollbar height="80%">
        <!-- <div><el-button>haha</el-button></div>
        <div>{{ timefakeList[timeValue] }}</div> -->

        <div style="width: 260px; height: 800px" v-if="sateValue === 'road1'">
          <el-steps
              :active="active"
              direction="vertical"
              finish-status="finish"
          >
            <div v-for="(item, index) in timeList" :key="index">
              <el-step
                  @click="
                  active = index;
                  initMap();
                "
                  :title="timefakeList[index]"
              />
            </div>
          </el-steps>
        </div>
      </el-scrollbar>
    </div>
    <div id="mapChoose" v-if="leftVisual">
      <el-select
          v-model="mapValue"
          class="m-2"
          clearable
          placeholder="瓦片地图"
          @change="changeMap"
      >
        <el-option
            v-for="item in optionMap"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select
          v-model="streetValue"
          class="m-2"
          clearable
          placeholder="街景"
          @change="changeStreet"
      >
        <el-option
            v-for="item in optionStreet"
            :key="item.label"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select
          v-model="sateValue"
          class="m-2"
          clearable
          placeholder="路况"
          @change="changeSate"
      >
        <el-option
            v-for="item in optionSate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select
          v-model="videoValue"
          class="m-2"
          clearable
          placeholder="视频"
          @change="changeVideo"
      >
        <el-option
            v-for="item in optionVideo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select
          v-model="geoValue"
          class="m-2"
          clearable
          placeholder="道路设施"
          @change="changeGeo"
      >
        <el-option
            v-for="item in optionGeo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="fold" @click="leftVisual = false" v-if="leftVisual">
      <el-icon size="20" style="position: relative; top: 20px"
      >
        <ArrowLeftBold
        />
      </el-icon>
    </div>
    <div class="unfold" @click="leftVisual = true" v-if="!leftVisual">
      <el-icon size="20" style="position: relative; top: 20px"
      >
        <ArrowRightBold
        />
      </el-icon>
    </div>
    <div id="wash">
      <el-button size="large" @click="open()">数据跟踪</el-button>
    </div>
    <div id="zip" v-if="geoValue != ''">
      <el-button size="large" @click="zip()">数据加密</el-button>
    </div>
    <div ref="container" id="map"></div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, reactive, watch} from "vue";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import pdf from "vue-pdf";
import router from "@/router";
import {ElTree, ElScrollbar} from "element-plus";
import {MapboxLayer} from "@deck.gl/mapbox";
import {Tile3DLayer} from "@deck.gl/geo-layers";
import {Tiles3DLoader, CesiumIonLoader} from "@loaders.gl/3d-tiles";
import {ElMessageBox, ElMessage, ElNotification} from "element-plus";
import * as Cesium from "cesium";
import "../../node_modules/cesium/Source/Widgets/widgets.css";
import staticData from "../../static/data.js";

import type {Action} from "element-plus";
import mapboxgl from "mapbox-gl";
//import pdf from 'vue-pdf';
import mapBoxGl from "mapbox-gl";
import {prefix} from "@/prefix";
import {isInteger} from "lodash";

export default defineComponent({
  name: "MapView",
  components: {},

  setup(props, {emit}) {
    const leftVisual = ref<boolean>(true);
    const timer = ref<any>(null);
    const uuid = ref<any>("");
    const timeValue = ref<any>(0);
    const currentWebValue = ref<any>("当前无数据展示");
    const currentZipValue = ref<any>("");
    const zipCode = ref<any>("");
    const zip = async () => {
      if (currentZipValue.value != "") {
        await ElMessageBox.prompt("请输入加密密码", "压缩密码", {
          confirmButtonText: "完成",
          cancelButtonText: "取消",
        }).then(async ({value}) => {
          zipCode.value = value;
          let name = currentZipValue.value;

          ElMessage({
            type: "success",
            message: `你的加密密码为${value}`,
          });
          const data = await axios.get(
              `http://localhost:8060/getZip?password=${value}&name=${name}`
          );
          console.log(data.data);
          uuid.value = String(data.data);
          console.log("haah", uuid.value);
          console.log(
              "http://localhost:8060/MapViewBack/data/outputZip/" +
              uuid.value +
              ".zip"
          );
        });
        setTimeout(() => {
          window.open(
              "http://localhost:8060/MapViewBack/data/outputZip/" +
              uuid.value +
              ".zip"
          );
        }, 200);
      } else {
        +ElMessage({
          type: "error",
          message: `此数据不支持加密`,
        });
      }
    };

    const openPdf = () => {
      window.open(
          "http://localhost:8060/getPdf?name=105",
          "_blank",
          "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400"
      );
    };
    const open = () => {
      ElMessageBox.alert(
          `<div style="width:390px"><strong> <i style="width:390px">${currentWebValue.value}</i></strong></div>`,
          "数据来源",
          {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: "OK",

            dangerouslyUseHTMLString: true,
          }
      );
    };
    const timeList = reactive([
      "2022-11-13-06-00-01",
      "2022-11-13-06-31-57",
      "2022-11-13-07-00-00",
      "2022-11-13-07-31-13",
      "2022-11-13-07-59-52",
      "2022-11-13-08-31-34",
      "2022-11-13-09-02-22",
      "2022-11-13-09-30-24",
      "2022-11-13-10-00-53",
      "2022-11-13-10-32-28",
      "2022-11-13-11-00-50",
      "2022-11-13-11-29-22",
      "2022-11-13-12-02-09",
      "2022-11-13-12-31-01",
      "2022-11-13-13-00-43",
      "2022-11-13-13-29-00",
      "2022-11-13-13-59-04",
      "2022-11-13-14-31-13",
      "2022-11-13-14-59-40",
      "2022-11-13-15-31-57",
      "2022-11-13-16-00-14",
      "2022-11-13-16-31-06",
      "2022-11-13-17-01-06",
      "2022-11-13-17-31-03",
      "2022-11-13-17-59-11",
      "2022-11-13-18-32-31",
      "2022-11-13-19-02-03",
      "2022-11-13-19-30-38",
      "2022-11-13-20-02-56",
      "2022-11-13-20-32-02",
      "2022-11-13-21-01-15",
      "2022-11-13-21-30-39",
      "2022-11-13-21-59-59",
    ]);
    const timefakeList = staticData.timefakeList
    const active = ref(0);
    const currentMouseValue = ref<any[]>([]);
    const timebegin = () => {
      //initMap()

      let layers = map.getStyle().layers;

      timer.value = setInterval(() => {
        let str = String((timeValue.value - 1) % timefakeList.length);
        let strs = String(timeValue.value);
        let name = timeList[timeValue.value];
        //console.log(map);
        removeLayer(str);
        //map.on('loads',()=>{
        map.addSource(strs, {
          type: "raster",
          tiles: [
            `http://localhost:8060/getPointTiles?name=${name}&x={x}&y={y}&z={z}`,
          ],
        });
        // let newLayer ={
        //   id: strs,
        //   type: "raster",
        //   source: strs,
        // }
        map.addLayer({
          id: strs,
          type: "raster",
          source: strs,
        });
        timeValue.value = (timeValue.value + 1) % timefakeList.length;

        // })
      }, 1200);
      timeValue.value = 0;
    };
    const next = () => {
      if (active.value++ > 2) active.value = 0;
    };
    const dataSelect = ref<string>("路况");
    const video = ref<any>(null);
    const OSMViewCheck = ref(false);
    const videoSrc = ref<any>(
        "http://localhost:8060/MapViewBack/data/video/video_provincial_T1-63K+500.mp4"
    );
    const videozongtongSrc = ref<any>(
        "http://localhost:8060/MapViewBack/data/video/video_national_91050.mp4"
    );
    const videozongtongName = ref<any>("國道3甲(萬芳交流道到台北端)");

    //const videoChoose=ref<any>(URL('http://www.w3school.com.cn/example/html5/mov_bbb.mp4'))
    //videoChoose.value='~@/assets/video1.MP4'
    const dataSelectList = ref<any[]>([]);
    const videoList = staticData.videoList
    const videozongtongList = staticData.videozongtongList
    const videoNameList = [
      "台1線63K+500",
      "台1線65K+500",
      "台1線70K+550",
      "台68線(南寮端到新竹一交流道)",
      "台68線(新竹二交流道到新竹一交流道)",
      "台68線(新竹二交流道到新竹科園交流道)",
      "國道1號(高架楊梅端到湖口交流道)",
      "國道1號(竹北交流道到湖口服務區)",
      "國道1號(竹北交流道到新竹交流道",
    ];
    const videozongtongNameList = [
      "國道3甲(萬芳交流道到台北端)",
      "國道3號(木柵休息站到新店交流道)",
      "國道3號(安坑交流道到中和交流道)",
      "國道3甲(木柵交流道到萬芳交流道)",
      "國道3號(中和交流道到安坑交流道)",
      "國道3號(土城交流道到中和交流道)",
      "台65線4K+935",
      "台65線9K+600",
      "台65線0K+003",
      "台65線3K+045",
      "台64線17K+781",
    ];
    const areaOsmList = [
      "osm_traffic_a_free_1",
      "osm_pois_a_free_1",
      "osm_pofw_a_free_1",
      "osm_places_a_free_1",
      "osm_natural_a_free",
      "gis_osm_water_a_free_1",
      "gis_osm_transport_a_free_1",
    ];
    const lineOsmList = [
      "gis_osm_natural_free_1",
      "gis_osm_places_free_1",
      "gis_osm_pofw_free_1",
      "gis_osm_pois_free_1",
      "gis_osm_railways_free_1",
      "gis_osm_traffic_free_1",
      "gis_osm_transport_free_1",
      "gis_osm_waterways_free_1",
    ];
    const bridgeIntroList = [
      "zhongxingbridge",
      "zhongxiaobridge",
      "danshuihebridge",
      "danjiangbridge",
      "taibeibridge",
      "taibeibridge",
      "chongyangbridge",
      "guandubridge",
    ];
    const bridgeAssList = ["109", "109", "109", "109", "109"];
    const videoName = ref<any>("");
    const video1 = ref<any>("@/assets/video_provincial_T1-63K+500.mp4"); //接收视频
    const treeMap = ref<any>(null);
    const selectRef = ref<any>();
    //map样式
    const center = ref<[number, number]>([121.505, 25.023]);
    const zoom = ref<number>(10.0);
    const osmBridge = ref<any>();
    const osmBuilding = ref<any>();
    const osmLand = ref<any>();
    const osmRoad = ref<any>();
    const osmWater = ref<any>();
    const osmall = ref<any>();
    const mapValue = ref("");
    const streetValue = ref("");
    const sateValue = ref("");
    const videoValue = ref("");
    const obliValue = ref("");
    const geoValue = ref("");
    const changeosm = (val: any, val2: any) => {
      if (val == 2 && osmBuilding.value == true) {
        osmBridge.value = false;
        osmLand.value = false;
        osmRoad.value = false;
        osmWater.value = false;
        osmall.value = false;
        styles.value =
            "http://localhost:3000/taiwan_source/liberty_building.json";
      }
      if (val == 1 && osmBridge.value == true) {
        osmBuilding.value = false;
        osmLand.value = false;
        osmRoad.value = false;
        osmWater.value = false;
        osmall.value = false;
        styles.value =
            "http://localhost:3000/taiwan_source/liberty_bridge.json";
      }
      if (val == 3 && osmLand.value == true) {
        osmBridge.value = false;
        osmBuilding.value = false;
        osmRoad.value = false;
        osmWater.value = false;
        osmall.value = false;
        styles.value = "http://localhost:3000/taiwan_source/liberty_land.json";
      }
      if (val == 4 && osmRoad.value == true) {
        osmBridge.value = false;
        osmLand.value = false;
        osmBuilding.value = false;
        osmWater.value = false;
        osmall.value = false;
        styles.value = "http://localhost:3000/taiwan_source/liberty_road.json";
      }
      if (val == 5 && osmWater.value == true) {
        osmBridge.value = false;
        osmLand.value = false;
        osmBuilding.value = false;
        osmRoad.value = false;
        osmall.value = false;
        styles.value = "http://localhost:3000/taiwan_source/liberty_water.json";
      }

      if (val == 6 && osmall.value == true) {
        osmBridge.value = false;
        osmLand.value = false;
        osmRoad.value = false;
        osmWater.value = false;
        osmBuilding.value = false;
        styles.value = "http://localhost:3000/taiwan_source/osm_libertyCh.json";
      }
      initMap();
    };
    const optionMap = [
      {
        value: "sates",
        label: "Google卫星影像",
        id: 10,
      },
      {
        value: "OSMView",
        label: "OSM矢量数据",
        id: 20,
      },
      {
        value: "obliqueImage10",
        label: "45度倾斜影像",
        id: 30,
      },
    ];
    const optionStreet = [
      {
        value: "street1",
        label: "新竹工业园",
      },
      {
        value: "street2",
        label: "总统府附近",
      },
    ];
    const optionSate = [
      {
        value: "road1",
        label: "单选时刻",
      },
      {
        value: "road2",
        label: "时序演播",
      },
    ];
    const optionVideo = [
      {
        value: "xinzhu",
        label: "新竹工业园区域",
      },
      {
        value: "zongtong",
        label: "台北-新北区域",
      },
    ];
    const optionObli = [
      {
        value: "obliqueImage10",
        label: "45度倾斜影像",
      },
    ];
    const optionGeo = [
      {
        value: "construct",
        label: "施工路段",
      },
      {
        value: "road",
        label: "道路工程",
      },
      {
        value: "fog",
        label: "易有雾路段",
      },
      {
        value: "remark",
        label: "限速路段",
      },
      {
        value: "tank",
        label: "开放/禁行路段",
      },
      {
        value: "tunnel",
        label: "地下通道",
      },
      {
        value: "bridgeIntro",
        label: "桥梁介绍",
      },
      {
        value: "bridgeAssets",
        label: "桥梁评估",
      },
      {
        value: "bridge3Dtiles",
        label: "桥梁三维模型",
      },
    ];

    const changeMap = async (val: any) => {
      dataSelectList.value = [];
      layerList.value = [];
      streetValue.value = "";
      videoValue.value = "";
      obliValue.value = "";
      geoValue.value = "";
      sateValue.value = "";
      mapValue.value = val;
      if (viewer != null) {
        viewer.destroy();
        viewer = null;
      }

      styles.value =
          "http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json";
      if (val === "OSMView") {
        currentWebValue.value = "https://download.geofabrik.de/";
        OSMViewCheck.value = true;
        osmall.value = true;
        styles.value = "http://localhost:3000/taiwan_source/osm_libertyCh.json";
      } else {
        OSMViewCheck.value = false;
      }

      if (val != "" && val != "OSMView") {
        dataSelectList.value.push(val); //val为
        layerList.value.push({
          id: val,
          visualId: val,
          visualType: val,
        });
        //init3dtiles()
      }
      if (val == "") {
        OSMViewCheck.value = false;
        osmBuilding.value = false;
        osmBridge.value = false;
        osmLand.value = false;
        osmRoad.value = false;
        osmWater.value = false;
        osmall.value = false;
      }

      await initMap();
    };
    const changeStreet = (val: any) => {
      styles.value =
          "http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json";
      videoValue.value = "";
      obliValue.value = "";
      geoValue.value = "";
      sateValue.value = "";
      OSMViewCheck.value = false;
      mapValue.value = "";
      if (viewer != null) {
        viewer.destroy();
        viewer = null;
      }
      if (val == "street1")
        window.location.href =
            "http://localhost:8070/#24.869047222371844,121.00935189407159";
      if (val == "street2")
        window.location.href =
            "http://localhost:8070/#25.042077521030286,121.51409414786328";
    };
    const changeSate = async (val: any) => {
      styles.value = "http://localhost:3000/taiwan_source/traffic.json";
      dataSelectList.value = [];
      layerList.value = [];
      streetValue.value = "";
      OSMViewCheck.value = false;
      videoValue.value = "";
      obliValue.value = "";
      geoValue.value = "";
      mapValue.value = "";
      sateValue.value == val;
      if (viewer != null) {
        viewer.destroy();
        viewer = null;
      }
      if (val != "" && val == "road1") {
        clearInterval(timer.value);
        dataSelectList.value.push(val); //val为
        layerList.value.push({
          id: val,
          visualId: val,
          visualType: val,
        });
      } else if (val != "" && val == "road2") {
        zoom.value = 16.90881122;
        center.value = [121.519748, 25.0344949];
        map.scrollZoom.disable();
        map.doubleClickZoom.disable();
        // console.log("hahaha");
        // dataSelectList.value.push(val); //val为
        // layerList.value.push({
        //   id: val,
        //   visualId: val,
        //   visualType: val,
        // });
        timebegin();
      } else {
        clearInterval(timer.value);
      }

      await initMap();
    };

    const changeVideo = async (val: any) => {
      //console.log(val)
      styles.value = "http://localhost:3000/taiwan_source/video.json";
      dataSelectList.value = [];
      layerList.value = [];
      streetValue.value = "";
      sateValue.value = "";
      OSMViewCheck.value = false;
      mapValue.value = "";
      obliValue.value = "";
      geoValue.value = "";
      videoValue.value = val;
      if (viewer != null) {
        viewer.destroy();
        viewer = null;
      }
      if (val != "") {
        dataSelectList.value.push(val); //val为
        layerList.value.push({
          id: val,
          visualId: val,
          visualType: val,
        });
      }

      await initMap();
    };
    const changeObli = async (val: string) => {
      dataSelectList.value = [];
      layerList.value = [];
      streetValue.value = "";
      sateValue.value = "";
      mapValue.value = "";
      OSMViewCheck.value = false;
      videoValue.value = "";
      geoValue.value = "";
      if (viewer != null) {
        viewer.destroy();
        viewer = null;
      }
      if (val != "") {
        dataSelectList.value.push(val); //val为
        layerList.value.push({
          id: val,
          visualId: val,
          visualType: "45度倾斜影像",
        });
      }

      await initMap();
    };
    const changeGeo = async (val: string) => {
      zoom.value = 8;
      center.value = [121.06, 24.12];
      if (viewer != null) {
        viewer.destroy();
        viewer = null;
      }

      if (val === "") {
        styles.value =
            "http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json";
      } else {
        styles.value =
            //"http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json";
            "http://localhost:3000/taiwan_source/road.json";
      }

      dataSelectList.value = [];
      layerList.value = [];
      mapValue.value = "";
      streetValue.value = "";
      sateValue.value = "";
      OSMViewCheck.value = false;
      videoValue.value = "";
      obliValue.value = "";
      if (val === "construct") {
        styles.value =
            "http://localhost:3000/taiwan_source/liberty_building.json";
      }
      if (val != "") {
        dataSelectList.value.push(val); //val为
        layerList.value.push({
          id: val,
          visualId: val,
          visualType: val,
        });
      }
      await initMap();
    };
    const styles = ref<any>(
        "http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json"
    );
    const mapListOnline: { id: number; label: string; url: string }[] = [
      {
        id: 100,
        label: "中国底图灰色版",
        url: "mapbox://styles/johnnyt/cl9miecpn001t14rspop38nyk",
      },
      {
        id: 200,
        label: "中国底图蓝黑版",
        url: "mapbox://styles/johnnyt/cl9mkdnso000q15rlcoxiaab0",
      },
      {
        id: 300,
        label: "OSM",
        url: "http://localhost:3000/taiwan_source/osm_liberty.json",
      },
    ];
    const defaultProps = {
      children: "children",
      label: "label",
    };
    const AutoShow = () => {
      selectRef.value.toggleMenu();
    };
    const layerList = ref<any[]>([]);
    const container = ref<HTMLElement>();
    let map: mapBoxGl.Map;
    let viewer: any;
    //格式化时间
    //Mapbox的3dtiles
    const init3dtiles = () => {
      // 使用cesiumIon数据
      // let layer = this.load3DTilesFromIon({
      //   id: "3dTiles",
      //   describe: "3dTiles",
      //   url: "http://172.21.213.44:8087/static/resRepository/tileset/tileset.json",
      //   layerType: "3DTiles",
      // });
      // 使用自己的数据
      let layer = load3DTiles({
        id: "3dTiles_2635",
        describe: "3dTiles",
        url: "http://127.0.0.1:8072/Taiwan2/tileset.json",
        layerType: "3DTiles",
      });
      console.log("layer", layer);
      map.addLayer(layer);
    };
    const load3DTiles = (layerConfig: any) => {
      let layer = new MapboxLayer({
        id: layerConfig.id,
        type: Tile3DLayer,
        data: layerConfig.url,
        loader: Tiles3DLoader,
        onTileError: (err: any) => {
          console.log(err);
        },
        onTilesetLoad: (tileset: any) => {
          tileset.setProps({maximumScreenSpaceError: 1});
          console.log(tileset);
          // let mMtx=new core_1.Matrix4().makeTranslation(1,1,2000);
          // tileset.modelMatrix=mMtx;
          // 以下步骤是针对"http://172.21.213.44:8087/static/resRepository/tileset/tileset.json"数据的平移修正，其他数据可以注释掉以下代码
          // let center = tileset.cartesianCenter; //正球投影中心
          // let lonlat = this.webMercator2lonLat(center); //经纬度
          // let ellipsoidCenter = this.lonlat2ellipsoid(
          //   lonlat.x,
          //   lonlat.y,
          //   lonlat.z
          // ); //椭球投影中心
          // console.log(center)
          // console.log(lonlat)
          // console.log(ellipsoidCenter)
          // let m = new core_1.Matrix4([
          //   1.0,
          //   0.0,
          //   0.0,
          //   0.0,
          //   0.0,
          //   1.0,
          //   0.0,
          //   0.0,
          //   0.0,
          //   0.0,
          //   1.0,
          //   0.0,
          //   ellipsoidCenter.x - center.x,
          //   ellipsoidCenter.y - center.y,
          //   ellipsoidCenter.z - center.z,
          //   1.0,
          // ]); //偏差矩阵
          // tileset.modelMatrix = m;
        },
      });
      return layer;
    };
    //初始化cesium
    const cesiumInit = () => {
      Cesium.Ion.defaultAccessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2RjODQxYy0xNDI0LTRmNmYtOTJjNy02Njk3NGFmNGZlMzMiLCJpZCI6ODg1MTgsImlhdCI6MTY0OTI1MzIzNn0._0nz9pC6RF2dXjkzTilweCdZOP6jE-9Efc1QqjMOR_Q";
      viewer = new Cesium.Viewer("cesiumContainer", {
        // terrainProvider: Cesium.createWorldTerrain(),
        //   geocoder: false,
        //   homeButton: false,
        sceneModePicker: false,
        // infobox: false,
        baseLayerPicker: true,
        navigationHelpButton: false,
        //   animation: false,
        //   timeline: false,
        fullscreenButton: false,
        vrButton: false,
      });
      // 提示错误Blocked script execution in ‘about:blank’ because the document’s frame is sandboxed and the ‘allow-scripts’ permission is not set.的解决方法
      let iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
      iframe.setAttribute(
          "sandbox",
          "allow-same-origin allow-scripts allow-popups allow-forms"
      );
      iframe.setAttribute("src", ""); //必须设置src为空 否则不会生效
      viewer.cesiumWidget.creditContainer.style.display = "none"; // 隐藏版权
      viewer.scene.debugShowFramesPerSecond = false; //显示帧数
      // 不显示星空且背景透明
      viewer.scene.skyBox.show = true;
      // this.viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.5);

      // 视角大小
      Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
      // 显示阴影
      viewer.scene.globe.enableLighting = false;
      viewer.shadows = false;
      viewer.clock.multiplier = 1000;
      // this.viewer.imageryLayers.get(0).show = false; //不显示底图
      // this.viewer.scene.globe.baseColor = Cesium.Color.WHITE; //设置地球颜色
      // 设置home在中国(左下角，右上角)
      const ChinaRectangle = Cesium.Rectangle.fromDegrees(
          120,
          24,
          122.789387,
          26
      );
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = ChinaRectangle;
      //
      viewer.scene.imageryLayers.addImageryProvider(
          new Cesium.UrlTemplateImageryProvider({
            url: 'http://localhost:8070/getTile2?x={x}&y={y}&z={z}'
          }))
      //
      viewer.camera.flyHome(5);

    };
    const add3DTiles = () => {
      // 加载3DTiles数据
      // debugger;
      let tileset = new Cesium.Cesium3DTileset({
        // url: "data/model/3dtilesFromGltf/tileset.json",
        url: "http://127.0.0.1:8072/Taiwan2/tileset.json",
        maximumScreenSpaceError: 2, //最大的屏幕空间误差
        //maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数
        debugShowBoundingVolume: false,
        // modelMatrix: myTransform,
      });
      // let that = this;
      // tileset.readyPromise.then(function (tilesetData) {
      //   // debugger;
      //   let translation = that.changeHeight(tilesetData, 30);
      //   console.log(Cesium.Matrix4.fromTranslation(translation));
      //   tilesetData.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      // });
      //console.log(tileset);
      (viewer as any).scene.primitives.add(tileset);
    };
    //初始化地图
    const initMap = () => {
      mapboxgl.accessToken =
          "pk.eyJ1IjoiMTY2NTE2OTkzNzYiLCJhIjoiY2ttMDh5amJpMHE2dzJ3cTd5eWZsMGQxZyJ9.XErH3kSOuRC_OWXWCpDLkQ";
      map = new mapBoxGl.Map({
        container: container.value as HTMLElement,
        style: styles.value,
        center: center.value,
        zoom: zoom.value,
      });
      map.on("load", async () => {
        await initLayers();
      });
      if (sateValue.value == "road2") {
        map.scrollZoom.disable();
        map.doubleClickZoom.disable();
      }
      //视角改变则更改页面中心变化
      map.on("move", (e) => {
        //console.log(e)
        center.value[0] = Number(map.getCenter().lng);
        center.value[1] = Number(map.getCenter().lat);
        zoom.value = map.getZoom();
        //currentMouseValue.value=[String(Number(e.lng).toFixed(2)),String(Number(e.lat).toFixed(2))]
      });
      map.on("mousemove", (e) => {
        //console.log(e.lngLat)

        currentMouseValue.value[0] = String(Number(e.lngLat.lng).toFixed(2));
        currentMouseValue.value[1] = String(Number(e.lngLat.lat).toFixed(2));
      });
    };
    //初始化图层
    const initLayers = async () => {
      for (let i = layerList.value.length - 1; i >= 0; i--) {
        await removeLayer(layerList.value[i]);
        await addMapLayer(layerList.value[i]);
      }
    };
    // 移除图层
    const removeLayer = (id: string) => {
      if (map.getLayer(id) != undefined) {
        map.removeLayer(id);
        map.removeSource(id);
      }
    };
    // 增加图层
    const addMapLayer = async (param: {
      id: string;
      visualId: string;
      visualType: string;
    }) => {
      if (map.getLayer(param.id) === undefined) {
        ////增加矢量图层
        let type: "line" | "circle" | "fill" = "line";
        //////////////////////////geoJson数据/////////////////////////
        if (
            param.visualType === "OSM" ||
            param.visualType === "bridge" ||
            param.visualType === "construct" ||
            param.visualType === "fog" ||
            param.visualType === "remark" ||
            param.visualType === "tank" ||
            param.visualType === "tunnel" ||
            param.visualType === "road" ||
            param.visualType === "importantbridge"
        ) {
          /////////////////////////////////其余道路设施数据/////////////////////////////////////
          if (param.visualType != "OSM") {
            currentZipValue.value = param.visualType;
            currentWebValue.value =
                "https://download.geofabrik.de/asia/taiwan.html";
            let type: "fill" | "circle" | "line" = "line";
            zoom.value = 12;
            let name = param.visualType;
            const geojson = await axios
                .get(`http://localhost:8060/getJson?name=${name}`)
                .then((res) => {
                  return res;
                });
            // console.log(geojson);
            if (geojson.data != null && (geojson as any).status === 200) {
              let strss = String(param.visualId);
              map.addSource(strss, {
                type: "geojson",
                data: geojson.data,
              });
              //线图层
              if (type === "line") {
                map.addLayer({
                  id: strss,
                  type: type,
                  source: strss,
                  paint: {
                    "line-opacity": 0.5,
                    "line-width": 10,
                    "line-color": "#ff0000",
                  },
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                });
              } else {
                map.addLayer({
                  id: strss,
                  type: "fill",
                  source: strss,
                  paint: {
                    "fill-opacity": 0.5,
                    "fill-color": "#ff0000",
                  },
                });
              }
              if (param.visualType === "bridge") {
                // const geojsonBridgeDetail = await axios
                //   .get(`http://localhost:8060/getJson?name=bridgeDetail`)
                //   .then((res) => {
                //     return res;
                //   });
                //   map.addSource("bridgeDetail", {
                //     type: "geojson",
                //     data: geojsonBridgeDetail.data,
                //   });
                //   map.addLayer({
                //       id: "bridgeDetail",
                //       type: type,
                //       source: "bridgeDetail",
                //       paint: {
                //         "line-opacity": 0.5,
                //         "line-width": 10,
                //         "line-color": "#000080",
                //       },
                //       layout: {
                //         "line-join": "round",
                //         "line-cap": "round",
                //       },
                //     });
              } else if (param.visualType === "tunnel") {
                const geojsonTunnelDetail = await axios
                    .get(`http://localhost:8060/getJson?name=tunnelDetail`)
                    .then((res) => {
                      return res;
                    });
                map.addSource("tunnelDetail", {
                  type: "geojson",
                  data: geojsonTunnelDetail.data,
                });
                map.addLayer({
                  id: "tunnelDetail",
                  type: type,
                  source: "tunnelDetail",
                  paint: {
                    "line-opacity": 0.5,
                    "line-width": 10,
                    "line-color": "#000080",
                  },
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                });
                map.on("click", "tunnelDetail", (e) => {
                  let strs =
                      ((e.features as any)[0].properties.name == null
                          ? ""
                          : "名字 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.name) +
                      ((e.features as any)[0].properties.wigth == null
                          ? ""
                          : "<br>" +
                          "宽 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.wigth) +
                      ((e.features as any)[0].properties.length == null
                          ? ""
                          : "<br>" +
                          "长 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.length) +
                      ((e.features as any)[0].properties.height == null
                          ? ""
                          : "<br>" +
                          "高 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.height);
                  e.preventDefault();
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(strs)
                      .addTo(map);
                });
                map.on("mouseenter", "tunnelDetail", () => {
                  map.getCanvas().style.cursor = "pointer";
                });
                map.on("mouseleave", "tunnelDetail", () => {
                  map.getCanvas().style.cursor = "";
                });
              } else if (param.visualType === "road") {
                const geojsonBridgeDetail = await axios
                    .get(`http://localhost:8060/getJson?name=bridgeDetail`)
                    .then((res) => {
                      return res;
                    });
                map.addSource("bridgeDetail", {
                  type: "geojson",
                  data: geojsonBridgeDetail.data,
                });
                map.addLayer({
                  id: "bridgeDetail",
                  type: type,
                  source: "bridgeDetail",
                  paint: {
                    "line-opacity": 0.5,
                    "line-width": 10,
                    "line-color": "#000080",
                  },
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                });
                map.on("click", "bridgeDetail", (e) => {
                  let strs =
                      ((e.features as any)[0].properties.name == null
                          ? ""
                          : "名称 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.name) +
                      ((e.features as any)[0].properties.length == null
                          ? ""
                          : "<br>" +
                          "长 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.length) +
                      ((e.features as any)[0].properties.width == null
                          ? ""
                          : "<br>" +
                          "宽 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.width) +
                      ((e.features as any)[0].properties.deadweight == null
                          ? ""
                          : "<br>" +
                          "载重 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.deadweight) +
                      ((e.features as any)[0].properties.structure == null
                          ? ""
                          : "<br>" +
                          "结构 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.structure);
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(strs)
                      .addTo(map);
                });
                map.on("mouseenter", "bridgeDetail", () => {
                  map.getCanvas().style.cursor = "pointer";
                });
                map.on("mouseleave", "bridgeDetail", () => {
                  map.getCanvas().style.cursor = "";
                });

                const geojsonBridgeDetail2 = await axios
                    .get(`http://localhost:8060/getJson?name=bridgeDetail2`)
                    .then((res) => {
                      return res;
                    });
                map.addSource("bridgeDetail2", {
                  type: "geojson",
                  data: geojsonBridgeDetail2.data,
                });
                map.addLayer({
                  id: "bridgeDetail2",
                  type: type,
                  source: "bridgeDetail2",
                  paint: {
                    "line-opacity": 0.5,
                    "line-width": 10,
                    "line-color": "#000080",
                  },
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                });
                map.on("click", "bridgeDetail2", (e) => {
                  let strs =


                      "名称 :" +
                      "&nbsp" +
                      "中兴桥" +
                      ((e.features as any)[0].properties.length == null
                          ? ""
                          : "<br>" +
                          "长 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.length) +
                      ((e.features as any)[0].properties.width == null
                          ? ""
                          : "<br>" +
                          "宽 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.width) +
                      ((e.features as any)[0].properties.deadweight == null
                          ? ""
                          : "<br>" +
                          "载重 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.deadweight) +
                      ((e.features as any)[0].properties.structure == null
                          ? ""
                          : "<br>" +
                          "结构 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.structure);
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(strs)
                      .addTo(map);
                });
                map.on("mouseenter", "bridgeDetail2", () => {
                  map.getCanvas().style.cursor = "pointer";
                });
                map.on("mouseleave", "bridgeDetail2", () => {
                  map.getCanvas().style.cursor = "";
                });

                const geojsonRoadDetail = await axios
                    .get(`http://localhost:8060/getJson?name=roadDetail`)
                    .then((res) => {
                      return res;
                    });
                console.log("hahah", geojsonRoadDetail);
                map.addSource("roadDetail", {
                  type: "geojson",
                  data: geojsonRoadDetail.data,
                });
                map.addLayer({
                  id: "roadDetail",
                  type: type,
                  source: "roadDetail",
                  paint: {
                    "line-opacity": 0.5,
                    "line-width": 10,
                    "line-color": "#000080",
                  },
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                });
                map.on("click", "roadDetail", (e) => {
                  let strs =
                      ((e.features as any)[0].properties.name == null
                          ? ""
                          : "名称 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.name) +
                      ((e.features as any)[0].properties.material == null
                          ? ""
                          : "<br>" +
                          "材质 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.material) +
                      ((e.features as any)[0].properties.width == null
                          ? ""
                          : "<br>" +
                          "宽 :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.width);

                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(strs)
                      .addTo(map);
                });
                map.on("mouseenter", "roadDetail", () => {
                  map.getCanvas().style.cursor = "pointer";
                });
                map.on("mouseleave", "roadDetail", () => {
                  map.getCanvas().style.cursor = "";
                });
              }

              map.on("click", strss, (e) => {
                //易有雾路段
                if (param.visualType === "fog") {
                  let strs =
                      ((e.features as any)[0].properties.name == null
                          ? ""
                          : "name :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.name) +
                      ((e.features as any)[0].properties.name == null
                          ? ""
                          : "<br>" +
                          "fog :" +
                          "&nbsp" +
                          (e.features as any)[0].properties.fog);
                  //  "name :" +
                  //       "&nbsp" +
                  //       ((e.features as any)[0].properties.name == null
                  //         ? "无"
                  //         : (e.features as any)[0].properties.name)
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(
                          // (e.features as any)[0].properties.name == null)?"":
                          //  "name :" +
                          //    "&nbsp" +
                          //    (e.features as any)[0].properties.name)
                          // "name :" +
                          //   "&nbsp" +
                          //   ((e.features as any)[0].properties.name == null
                          //     ? "无"
                          //     : (e.features as any)[0].properties.name)
                          strs
                      )
                      .addTo(map);
                } else if (param.visualType === "road") {
                  //道路工程
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(
                          "名称 :" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.name == null
                              ? "无"
                              : (e.features as any)[0].properties.name) +
                          "<br>" +
                          "预定开工日期:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.date_1 == null
                              ? "无"
                              : (e.features as any)[0].properties.date_1) +
                          "<br>" +
                          "校准验收日期:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.date_2 == null
                              ? "无"
                              : (e.features as any)[0].properties.date_2) +
                          "<br>" +
                          "开工日期:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.date_3 == null
                              ? "无"
                              : (e.features as any)[0].properties.date_3) +
                          "<br>" +
                          "完工日期:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.date_4 == null
                              ? "无"
                              : (e.features as any)[0].properties.date_4) +
                          "<br>" +
                          "专业名称:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.proName == null
                              ? "无"
                              : (e.features as any)[0].properties.proName)
                      )
                      .addTo(map);
                } else if (param.visualType === "remark") {
                  //限速路段
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(
                          "名称 :" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.name == null
                              ? "无"
                              : (e.features as any)[0].properties.name) +
                          "<br>" +
                          "限速:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.speed == null
                              ? "无"
                              : (e.features as any)[0].properties.speed) +
                          "<br>" +
                          "备注:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.remark == null
                              ? "无"
                              : (e.features as any)[0].properties.remark) +
                          "<br>"
                      )
                      .addTo(map);
                } else if (param.visualType === "importantbridge") {
                  //桥梁介绍
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(
                          "名称 :" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.name == null
                              ? "无"
                              : (e.features as any)[0].properties.name)
                      )
                      .addTo(map);
                } else {
                  if (e.defaultPrevented) return;
                  new mapboxgl.Popup()
                      .setLngLat(e.lngLat)
                      .setHTML(
                          "名称 :" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.name == null
                              ? "无"
                              : (e.features as any)[0].properties.name) +
                          "<br>" +
                          "备注:" +
                          "&nbsp" +
                          ((e.features as any)[0].properties.remark == null
                              ? "无"
                              : (e.features as any)[0].properties.remark)
                      )
                      .addTo(map);
                }
              });
              map.on("mouseenter", strss, () => {
                map.getCanvas().style.cursor = "pointer";
              });
              map.on("mouseleave", strss, () => {
                map.getCanvas().style.cursor = "";
              });
            }
          } else {
            let type: "fill" | "circle" | "line" = "line";
            for (let i = 0; i < lineOsmList.length; i++) {
              const geojson = await axios
                  .get(`http://localhost:8060/getJson?name=${lineOsmList[i]}`)
                  .then((res) => {
                    return res;
                  });
              if (geojson != null && (geojson as any).status === 200) {
                let strss = String(lineOsmList[i]);
                map.addSource(strss, {
                  type: "geojson",
                  data: geojson.data,
                });
                map.addLayer({
                  id: strss,
                  type: type,
                  source: strss,
                  paint: {
                    "line-opacity": 0.5,
                    "line-width": 10,
                    "line-color": "#FFFF00",
                  },
                });
              }
            }
            type = "fill";
            for (let i = 0; i < areaOsmList.length; i++) {
              const geojson = await axios
                  .get(`http://localhost:8060/getJson?name=${areaOsmList[i]}`)
                  .then((res) => {
                    return res;
                  });
              if (geojson != null && (geojson as any).status === 200) {
                let strss = String(areaOsmList[i]);
                map.addSource(strss, {
                  type: "geojson",
                  data: geojson.data,
                });
                map.addLayer({
                  id: strss,
                  type: type,
                  source: strss,
                  paint: {
                    "fill-opacity": 0.5,
                    "fill-color": "#f24545",
                  },
                });
              }
            }
          }
        }

        //////视频
        else if (param.visualType === "zongtong") {
          currentWebValue.value = "https://168.thb.gov.tw/thb168";
          let type: "fill" | "circle" | "line" = "circle";

          map.flyTo({
            zoom: 11,
            center: [121.55386, 25.01415],
            speed: 0.6,
          });
          map.addSource("zongtong", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [],
            },
          });
          map.addLayer({
            id: "zongtong",
            type: "circle",
            source: "zongtong",
            paint: {
              "circle-radius": ["get", "size"],
              "circle-color": ["get", "color"],
              "circle-opacity": 1,
              "circle-stroke-color": "red",
              "circle-stroke-opacity": 1,
            },
          });
          init3dtiles();
          const geojsons = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {size: 10, id: 0},
                geometry: {
                  type: "Point",
                  coordinates: [121.55386, 25.01415],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 1},
                geometry: {
                  type: "Point",
                  coordinates: [121.56401, 24.97744],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 2},
                geometry: {
                  type: "Point",
                  coordinates: [121.507179, 24.978037],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 3},
                geometry: {
                  type: "Point",
                  coordinates: [121.58905, 25.00306],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 4},
                geometry: {
                  type: "Point",
                  coordinates: [121.50028, 24.97909],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 5},
                geometry: {
                  type: "Point",
                  coordinates: [121.476389, 24.986389],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 6},
                geometry: {
                  type: "Point",
                  coordinates: [121.4425, 25.02497],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 7},
                geometry: {
                  type: "Point",
                  coordinates: [121.4403, 24.98702],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 8},
                geometry: {
                  type: "Point",
                  coordinates: [121.4379, 25.06609],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 9},
                geometry: {
                  type: "Point",
                  coordinates: [121.442, 25.03969],
                },
              },
              {
                type: "Feature",
                properties: {size: 10, id: 10},
                geometry: {
                  type: "Point",
                  coordinates: [121.4806, 25.03868],
                },
              },
            ],
          };

          for (const marker of geojsons.features) {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage =
                "url(http://localhost:8060/getImage?name=camera2)";
            el.style.width = "50px";
            el.style.height = "50px";
            el.style.backgroundSize = "100%";
            el.addEventListener("click", () => {
              videoSrc.value =
                  videozongtongList[marker.properties.id as number];
              videoName.value =
                  videozongtongNameList[marker.properties.id as number];
              //console.log(videoSrc.value);
              video.value.load();

              map.flyTo({
                zoom: 12,
                center: marker.geometry.coordinates as any,
                speed: 0.7,
              });
            });
            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates as any)
                .addTo(map);
          }
        } else if (param.visualType === "xinzhu") {
          currentWebValue.value = "https://168.thb.gov.tw/thb168";
          let type: "fill" | "circle" | "line" = "circle";
          map.flyTo({
            zoom: 11,
            center: [121.0225, 24.838333],
            speed: 0.6,
          });
          map.addSource("xinzhu", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [121.0023, 24.87474],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [120.9918, 24.86444],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [121.0013, 24.83024],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [120.970556, 24.826111],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [120.984722, 24.822778],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [121.018611, 24.803333],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [121.02944, 24.8763896],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [121.0225, 24.838333],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10},
                  geometry: {
                    type: "Point",
                    coordinates: [121.010058, 24.807636],
                  },
                },
              ],
            },
          });
          map.addLayer({
            id: "xinzhu",
            type: "circle",
            source: "xinzhu",
            paint: {
              "circle-radius": ["get", "size"],
              "circle-color": ["get", "color"],
              "circle-opacity": 1,
              "circle-stroke-color": "red",
              "circle-stroke-opacity": 1,
            },
          });

          const geojsons = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  name: "台1線63K+500",
                  id: 0,
                  iconSize: [60, 60],
                },
                geometry: {
                  type: "Point",
                  coordinates: [121.0023, 24.87474],
                },
              },
              {
                type: "Feature",
                properties: {
                  name: "台1線65K+500",
                  id: 1,
                  iconSize: [60, 60],
                },
                geometry: {
                  type: "Point",
                  coordinates: [120.9918, 24.86444],
                },
              },
              {
                type: "Feature",
                properties: {
                  name: "台1線70K+550",
                  id: 2,
                  iconSize: [60, 60],
                },
                geometry: {
                  type: "Point",
                  coordinates: [121.0013, 24.83024],
                },
              },
              {
                type: "Feature",
                properties: {
                  name: "台68線(南寮端到新竹一交流道)",
                  id: 3,
                  iconSize: [60, 60],
                },
                geometry: {
                  type: "Point",
                  coordinates: [120.970556, 24.826111],
                },
              },
              {
                type: "Feature",
                properties: {
                  name: "台68線(新竹二交流道到新竹一交流道)",
                  id: 4,
                  iconSize: [60, 60],
                },
                geometry: {
                  type: "Point",
                  coordinates: [120.984722, 24.822778],
                },
              },
              {
                type: "Feature",
                properties: {
                  name: "台68線(新竹二交流道到新竹科園交流道)",
                  id: 5,
                  iconSize: [50, 50],
                },
                geometry: {
                  type: "Point",
                  coordinates: [121.018611, 24.803333],
                },
              },
              {
                type: "Feature",
                name: "國道1號(高架楊梅端到湖口交流道)",
                properties: {size: 10, id: 6},
                geometry: {
                  type: "Point",
                  coordinates: [121.02944, 24.8763896],
                },
              },
              {
                type: "Feature",
                name: "國道1號(竹北交流道到湖口服務區)",
                properties: {size: 10, id: 7},
                geometry: {
                  type: "Point",
                  coordinates: [121.0225, 24.838333],
                },
              },
              {
                type: "Feature",
                name: "國道1號(竹北交流道到新竹交流道",
                properties: {size: 10, id: 8},
                geometry: {
                  type: "Point",
                  coordinates: [121.010058, 24.807636],
                },
              },
            ],
          };

          for (const marker of geojsons.features) {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage =
                "url(http://localhost:8060/getImage?name=camera2)";
            el.style.width = "50px";
            el.style.height = "50px";
            el.style.backgroundSize = "100%";
            el.addEventListener("click", () => {
              videoSrc.value = videoList[marker.properties.id as number];
              videoName.value = videoNameList[marker.properties.id as number];
              //console.log(marker.properties.id as number);
              video.value.load();

              map.flyTo({
                zoom: 12,
                center: marker.geometry.coordinates as any,
                speed: 0.7,
              });
            });

            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates as any)
                .addTo(map);
          }
        } else if (param.visualType === "bridgeAssets") {
          {
            let type: "fill" | "circle" | "line" = "circle";

            // map.flyTo({
            //   zoom: 7,
            //   center: [121.0225, 24.838333],
            //   speed: 0.6,
            // });
            map.addSource("bridgeAssets", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.70937497356, 25.0985232934093],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.51780011468, 24.9831191847414],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.23935098189, 24.9661580002595],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.542072494808, 24.9966165914489],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.850316939943, 24.5741443282514],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.579240824378, 24.0983990754294],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.678011682207, 23.9184647740649],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.547781, 24.14407283],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.331579226495, 22.6321922435301],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.154053419028, 22.7577015240756],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.591204952889, 23.0823716547096],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.534863370313, 22.5340060103379],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.792406341102, 24.8383667829529],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.620804000002, 23.9880452252715],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.479652000037, 24.5751422430364],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [121.804229341106, 24.4662175586389],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.480951657416, 23.681207213813],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.32508771461, 23.3105718139321],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.301849658894, 23.0448105318379],
                    },
                  },
                  {
                    type: "Feature",
                    properties: {size: 10, color: "red"},
                    geometry: {
                      type: "Point",
                      coordinates: [120.395085500042, 23.4268365458527],
                    },
                  },
                ],
              },
            });
            map.addLayer({
              id: "bridgeAssets",
              type: "circle",
              source: "bridgeAssets",
            });
            const geojson = {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.70937497356, 25.0985232934093],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.51780011468, 24.9831191847414],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.23935098189, 24.9661580002595],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.542072494808, 24.9966165914489],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.850316939943, 24.5741443282514],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.579240824378, 24.0983990754294],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.678011682207, 23.9184647740649],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.547781, 24.14407283],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.331579226495, 22.6321922435301],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.154053419028, 22.7577015240756],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.591204952889, 23.0823716547096],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.534863370313, 22.5340060103379],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.792406341102, 24.8383667829529],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.620804000002, 23.9880452252715],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.479652000037, 24.5751422430364],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.804229341106, 24.4662175586389],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.480951657416, 23.681207213813],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.32508771461, 23.3105718139321],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.301849658894, 23.0448105318379],
                  },
                },
                {
                  type: "Feature",
                  properties: {size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [120.395085500042, 23.4268365458527],
                  },
                },
              ],
            };

            for (const marker of geojson.features) {
              const el = document.createElement("div");
              el.className = "marker";
              el.style.backgroundImage =
                  "url(http://localhost:8060/getImage?name=bridge)";
              el.style.width = "100px";
              el.style.height = "100px";
              el.style.backgroundSize = "100%";
              el.addEventListener("click", () => {
                window.open(
                    "http://localhost:8060/getPdf?name=109",
                    "_blank",
                    "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500"
                );
              });
              new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates as any)
                  .addTo(map);
            }
          }
        } else if (param.visualType === "bridgeIntro") {
          {
            currentWebValue.value =
                "https://zh.m.wikipedia.org/zh-hant/Category:%E5%8F%B0%E7%81%A3%E8%B7%A8%E6%B2%B3%E6%A9%8B%E6%A2%81";
            let type: "fill" | "circle" | "line" = "circle";
            map.addSource("bridgeIntro", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [],
              },
            });
            map.addLayer({
              id: "bridgeIntro",
              type: "circle",
              source: "bridgeIntro",
            });
            const geojson = {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {id: 0, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.495889, 25.047167],
                  },
                },
                {
                  type: "Feature",
                  properties: {id: 1, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.501, 25.051806],
                  },
                },
                {
                  type: "Feature",
                  properties: {id: 2, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.505222, 25.077917],
                  },
                },
                {
                  type: "Feature",
                  properties: {id: 3, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.41778, 25.17531],
                  },
                },
                {
                  type: "Feature",
                  properties: {id: 4, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.506386, 25.063753],
                  },
                },
                {
                  type: "Feature",
                  properties: {id: 5, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.502194, 25.085028],
                  },
                },
                {
                  type: "Feature",
                  properties: {id: 6, size: 10, color: "red"},
                  geometry: {
                    type: "Point",
                    coordinates: [121.457222, 25.125556],
                  },
                },
              ],
            };

            for (const marker of geojson.features) {
              const el = document.createElement("div");
              el.className = "marker";
              el.style.backgroundImage =
                  "url(http://localhost:8060/getImage?name=bridge)";
              el.style.width = "100px";
              el.style.height = "100px";
              el.style.backgroundSize = "100%";
              let name = bridgeIntroList[marker.properties.id as number];
              el.addEventListener("click", () => {
                window.open(
                    `http://localhost:8060/getroadhtml?name=${name}`,
                    "_blank",
                    "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500"
                );
              });
              new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates as any)
                  .addTo(map);
            }
          }
        }
        //////路况
        else if (param.visualType === "road1") {
          currentWebValue.value =
              "https://t0-traffic.tiles.virtualearth.net/comp/ch/132123122113200100?it=Z,TF&n=z";
          map.flyTo({
            zoom: 17,
            center: [121.51892754711338, 25.035121008773544],
            speed: 0.9,
          });

          let name = String(timeList[active.value]);
          let strs = String(active.value);
          map.addSource(strs, {
            type: "raster",
            tiles: [
              `http://localhost:8060/getPointTiles?name=${name}&x={x}&y={y}&z={z}`,
            ],
          });
          map.addLayer({
            id: strs,
            type: "raster",
            source: strs,
          });
        } else if (param.visualType === "road2") {
          currentWebValue.value =
              "https://t0-traffic.tiles.virtualearth.net/comp/ch/132123122113200100?it=Z,TF&n=z";
        } else if (param.visualType === "sates") {
          currentWebValue.value = "http://www.gditu.net/";
          let strs = String(param.id);
          map.addSource(strs, {
            type: "raster",
            tiles: [`http://localhost:8070/getTile2?x={x}&y={y}&z={z}`],
          });
          map.addLayer({
            id: strs,
            type: "raster",
            source: strs,
          });
          //////45度倾斜影像
        } else if (param.visualType === "obliqueImage10") {
          currentWebValue.value =
              "https://developers.google.com/maps/documentation/javascript/examples/aerial-simple";
          let strs = String(param.id);
          map.flyTo({
            zoom: 20,
            center: [121.51892754711338, 25.035121008773544],
            speed: 0.7,
          });
          map.addSource(strs, {
            type: "raster",
            //tiles: [`${prefix}visual/ObliqueImage/{x}/{y}/{z}`],
            tiles: [`http://localhost:8060/getObliqueImage?x={x}&y={y}&z={z}`],
          });
          map.addLayer({
            id: strs,
            type: "raster",
            source: strs,
          });
        } else if (param.visualType === "bridge3Dtiles") {
          cesiumInit();
          add3DTiles();
          currentWebValue.value = 'https://cesium.com/platform/cesiumjs/'
          // let strs = String(param.id);
          // map.flyTo({
          //   zoom: 14,
          //   center: [121.50892754711338, 25.055121008773544],
          //   //speed: 0.7,
          // });
          // map.addSource("satess", {
          //   type: "raster",
          //   tiles: [`http://localhost:8070/getTile2?x={x}&y={y}&z={z}`],
          // });
          // map.addLayer({
          //   id: "satess",
          //   type: "raster",
          //   source: "satess",
          // });
          // // map.addSource(strs, {
          // //   type: "raster",
          // //   //tiles: [`${prefix}visual/ObliqueImage/{x}/{y}/{z}`],
          // //   tiles: [`http://localhost:8060/getObliqueImage?x={x}&y={y}&z={z}`],
          // // });
          // // map.addLayer({
          // //   id: strs,
          // //   type: "raster",
          // //   source: strs,
          // // });
          // init3dtiles()
        }
      }

      //控件

      //绘制事件
    };

    //检索
    onMounted(async () => {
      console.log("gaga", router.currentRoute.value)
      initMap();
      //cesiumInit()
      //add3DTiles()
    });
    return {
      uuid,
      zip,
      zipCode,
      changeosm,
      currentWebValue,
      currentZipValue,
      open,
      osmBridge,
      osmBuilding,
      osmLand,
      osmRoad,
      osmWater,
      osmall,
      timeList,
      currentMouseValue,
      load3DTiles,
      init3dtiles,
      timeValue,
      timebegin,
      openPdf,
      active,
      zoom,
      next,
      videoName,
      timefakeList,
      video,
      video1,
      videoList,
      videoNameList,
      videoSrc,
      selectRef,
      mapValue,
      OSMViewCheck,
      streetValue,
      sateValue,
      videoValue,
      obliValue,
      geoValue,
      optionMap,
      optionObli,
      optionStreet,
      optionSate,
      optionVideo,
      optionGeo,
      changeMap,
      changeStreet,
      changeSate,
      changeVideo,
      changeObli,
      changeGeo,
      AutoShow,
      leftVisual,
      container,
      layerList,
      treeMap,
      dataSelectList,
      mapListOnline,
      initMap,
      addMapLayer,
      removeLayer,
      dataSelect,
      defaultProps,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(a.mapboxgl-ctrl-logo) {
  display: none !important;
}

div.scene-map-wrapper3 {
  cursor: pointer;

  div#osmctrl {
    position: absolute;
    text-align: center;
    top: 160px;
    left: 20px;
    z-index: 20;
    width: 150px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.5);

    .layer {
      position: relative;
      margin-left: 10px;
      text-align: left;

      //display: inline-block;
    }
  }

  div#video {
    font-size: larger;
    position: absolute;
    text-align: center;
    top: 120px;
    left: 20px;
    z-index: 20;
  }

  div#timevideo {
    font-size: larger;
    position: absolute;
    text-align: center;
    top: 150px;
    left: 20px;
    z-index: 20;
  }

  #cesiumContainer {
    width: 100%;
    height: 100vh;
    //background-color: aqua;
    z-index: 30;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  div#zoom {
    color: burlywood;
    font-size: larger;
    position: absolute;
    text-align: center;
    top: 30px;
    right: 20px;
    z-index: 20;
  }

  div#satezoom {
    color: burlywood;
    font-size: larger;
    position: absolute;
    text-align: center;
    bottom: 10px;
    left: 10px;
    z-index: 20;
  }

  div#mapChoose {
    position: absolute;
    top: 30px;
    left: 20px;
    z-index: 20;
    margin: 7px;

    :deep(.el-select-dropdown) {
      width: 185px;
    }

    :deep(.el-select .el-input__inner) {
      font-size: larger;
    }

    :deep(.el-select-dropdown__item) {
      font-size: larger;
      width: 180px;

      span {
        font-size: larger;
      }
    }

    :deep(.el-select .el-input__wrapper) {
      margin: 10px;
      width: 180px;
      height: 60px;
    }

    :deep(.el-select .el-input__inner) {
      color: black;
    }
  }

  div#left {
    position: absolute;
    top: 150px;
    left: 60px;
    bottom: 0;
    z-index: 30;

    :deep(.el-step__head.is-finish) {
      color: #c0c4cc;
      border-color: #c0c4cc;
    }

    :deep(.el-step__title.is-finish) {
      color: black;
      border-color: #c0c4cc;
    }

    :deep(.el-step__title.is-wait) {
      color: black;
      border-color: #c0c4cc;
    }

    :deep(.el-step__title.is-process) {
      color: red;
      border-color: #c0c4cc;
    }

    video {
      width: 445px;
      position: relative;
      height: 300px;
      z-index: 20;
    }
  }

  .fold {
    position: absolute;
    top: 46px;
    left: 0px;
    background-color: white;
    width: 30px;
    height: 60px;
    z-index: 20;
  }

  .unfold {
    position: absolute;
    top: 46px;
    left: 0px;
    background-color: white;
    width: 30px;
    height: 60px;
    z-index: 20;
  }

  div#wash {
    position: absolute;
    bottom: 10px;
    right: 30px;

    height: 60px;
    z-index: 20;
  }

  div#zip {
    position: absolute;
    bottom: 50px;
    right: 30px;

    height: 60px;
    z-index: 20;
  }

  div#map {
    position: absolute;
    top: 1px;
    bottom: 0;

    width: 100%;
    height: auto;
    //background: rgba(255, 255, 255, 0.2);
    .mapboxgl-ctrl-logo {
      display: none;
    }
  }
}
</style>
