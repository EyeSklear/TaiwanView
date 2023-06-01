const timeLists = [
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
];

const timefakeList = [
    "2022-11-13-06:00",
    "2022-11-13-06:30",
    "2022-11-13-07:00",
    "2022-11-13-07:30",
    "2022-11-13-08:00",
    "2022-11-13-08:30",
    "2022-11-13-09:00",
    "2022-11-13-09:30",
    "2022-11-13-10:00",
    "2022-11-13-10:30",
    "2022-11-13-11:00",
    "2022-11-13-11:30",
    "2022-11-13-12:00",
    "2022-11-13-12:30",
    "2022-11-13-13:00",
    "2022-11-13-13:30",
    "2022-11-13-14:00",
    "2022-11-13-14:30",
    "2022-11-13-15:00",
    "2022-11-13-15:30",
    "2022-11-13-16:00",
    "2022-11-13-16:30",
    "2022-11-13-17:00",
    "2022-11-13-17:30",
    "2022-11-13-18:00",
    "2022-11-13-18:30",
    "2022-11-13-19:00",
    "2022-11-13-19:30",
    "2022-11-13-20:00",
    "2022-11-13-20:30",
    "2022-11-13-21:00",
    "2022-11-13-21:30",
    "2022-11-13-22:00",
];

const videoList = [
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T1-63K+500.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T1-65K+500.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T1-70K+550.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_68010.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_69050.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_68100.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_1830.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_1890.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_1930.mp4",
    //require("@/assets/video_national_1890.mp4"),
];

const videozongtongList = [
    "http://localhost:8060/MapViewBack/data/video/video_national_91050.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_32570.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_33330.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_91450.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_33390.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_national_3362.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T65-4K+935.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T65-9K+600.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T65-0K+003.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T65-3K+045.mp4",
    "http://localhost:8060/MapViewBack/data/video/video_provincial_T64-17K+781.mp4",
];

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
export default {
    timeLists,
    timefakeList,
    videoList,
    videozongtongList,
    videoNameList,
    videozongtongNameList,
    areaOsmList,
    lineOsmList,
    bridgeIntroList,
    bridgeAssList,
    optionMap,
    optionObli,
    optionStreet,
    optionSate,
    optionVideo,
    optionGeo,
}