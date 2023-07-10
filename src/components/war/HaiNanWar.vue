<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;

    .header {
        position: absolute;
        top: 0;
        width: 100vw;
        height: 7vh;
        background-color: aquamarine;
        z-index: 999;
        opacity: 0.4;

    }

    .text {
        position: absolute;
        top: 7vh;
        width: 27vw;
        height: 37vh;
        background-color: red;
        z-index: 999;
        opacity: 0.4;

    }

    .pic {
        position: absolute;
        top: 44vh;
        width: 27vw;
        height: 36vh;
        background-color: black;
        z-index: 999;
        opacity: 0.4;
    }

    .subtitle {
        position: absolute;
        top: 80vh;
        width: 100vw;
        height: 10vh;
        background-color: green;
        z-index: 999;
        opacity: 0.4;
    }

    .timeline {
        position: absolute;
        top: 90vh;
        width: 100vw;
        height: 10vh;
        background-color: yellow;
        z-index: 999;
        opacity: 0.4;
    }

    .legend {
        position: absolute;
        top: 20vh;
        right: 0vh;
        width: 15vw;
        height: 24vh;
        display: block;
        //background-color: yellow;
        z-index: 999;
        //opacity: 0.4;
        color: white;

        @keyframes slide-in-bck-right {

            0% {
                transform: translateZ(700px) translateX(400px);
                opacity: 0;
            }

            100% {
                transform: translateZ(0) translateX(0);
                opacity: 1;
            }
        }

        div:first-child {
            width: 15vw;
            height: 8vh;
            background-color: rgba(255, 0, 0, 0.5);
            //opacity: 0.5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            animation: slide-in-bck-right 1s linear 0s 1 normal none;

        }

        div:nth-child(2) {
            width: 15vw;
            height: 8vh;
            background-color: rgba(238, 130, 238, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            animation: slide-in-bck-right 1s linear 0s 1 normal none;

        }

        div:last-child {
            width: 15vw;
            height: 8vh;
            background-color: rgba(176, 224, 230, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            animation: slide-in-bck-right 1s linear 0s 1 normal none;

        }
    }

    .boom-nj {
        position: absolute;
        top: 30vh;
        left: 41vw;
        z-index: 999
    }

    .occupy-nj {
        position: absolute;
        top: 32vh;
        left: 45vw;
        z-index: 999;

    }

}
</style>

<template>
    <div class="container" id="map" ref="container">


        <!-- <div class="header">

        </div>
        <div class="text">

        </div>
        <div class="pic">

        </div>
        <div class="pic">
        </div>
        <div class="subtitle">
        </div>
        <div class="timeline">
        </div> -->
        <div class="occupy-nj" v-if="occupyFlag">
            <img :src=occupyGif style="width: 8vw; height:12vh;margin-left: 1vw;margin-top:1vh">
        </div>
        <div class="legend" ref="legend">
            <div v-show="per1">解放军第一阶段进攻方向</div>
            <div v-show="per2">解放军第二阶段进攻方向</div>
            <div v-show="per3">解放军第三阶段进攻方向</div>
        </div>
        <div v-if="boomFlag">
            <audio id="audio3" ref="audio3" volume="0.2" loop>
                <source src='/static/baozhasheng.mp3' />
            </audio>
            <div class="boom-nj" v-if="gifFlag">
                <!-- <el-image style="width: 30vw; height:45vh;top:1vh; opacity: 0.8" preview-src-list :src="thumImage"
            fit="fill" /> -->
                <img :src=textGif alt="your_gif" style="width: 8vw; height:12vh;margin-left: 1vw;margin-top:1vh">
                <img :src=textGif alt="your_gif" style="width: 8vw; height:12vh;margin-left: 1vw;margin-top:2vh">
                <img :src=textGif alt="your_gif"
                    style="display:block;width: 8vw; height:12vh;margin-left: 4vw;margin-top:1vh">
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import router from "@/router";
import mapboxgl from "mapbox-gl";
import mapBoxGl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import { flashLayer, sleep, addLayer, cameraAlong, asyncAddLayer } from '@/utils/mapUtils'
import haiNanData from '../../../static/hainaiData'
import GIF from 'gif.js';
import { Globe } from "cesium";
import SuperGif from 'gif.js';
let map: mapBoxGl.Map;
const currentMouseValue = ref<any[]>([]);
const container = ref<HTMLElement>();
const per1 = ref(false)
const per2 = ref(false)
const per3 = ref(false)
const boomFlag = ref(false)
const gifFlag = ref(false)
const textGif = ref('/static/boom.gif')
const occupyGif = ref('/static/zhanling.gif')
const audio3 = ref(null)
const legend = ref<HTMLElement>()
// const gif = new SuperGif({ gif: canvas, src: '/static/boom.gif', loop_mode: false });
// gif.load(() => {
//       // GIF 图像加载完成后的回调函数
//       gif.play();
//       addGifMarker();
//     });

const occupyFlag = ref(false)
const playAudio3 = (audio: any) => {
    let dom = audio.value
    if (dom != null) {
        (dom as any).play()
    }
}
const loadMaobox = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
const initMap = async () => {

    mapboxgl.accessToken =
        "pk.eyJ1IjoiMTY2NTE2OTkzNzYiLCJhIjoiY2ttMDh5amJpMHE2dzJ3cTd5eWZsMGQxZyJ9.XErH3kSOuRC_OWXWCpDLkQ";
    map = new mapboxgl.Map({
        container: 'map',
        zoom: 2.5374786907136837,
        center: [159.97845802461478, 16.84024023382318],
        pitch: 6.343045841856863,
        bearing: 0,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        //style: 'http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json'
        style: 'mapbox://styles/mapbox/satellite-v9?optimize=true', // style URL
        //style:'mapbox://styles/mapbox/streets-v12',
        projection: 'globe',
        //style:'mapbox://styles/mapbox/outdoors-v12'
        //style: 'http://172.21.212.168:8899/mapProject/getPublishedMap/646331f7c1a2a11336ca3806'
    });
        map.on('style.load', () => {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 5 });
       
    });

    map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
    map.on("mousemove", (e: any) => {


        currentMouseValue.value[0] = String(Number(e.lngLat.lng).toFixed(5),);
        currentMouseValue.value[1] = String(Number(e.lngLat.lat).toFixed(5));
    });

    map.on('click', (e: any) => {
        console.log('当前的bearing值为：' + map.getBearing());
        console.log('当前的pitch值为：' + map.getPitch());
        console.log('当前的center值为：' + map.getCenter());
        console.log('当前的zoom值为：' + map.getZoom());
    })
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });
    const size = 100;

    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d')!;
        },

        // Call once before every frame where the icon will be used.
        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            // Draw the outer circle.
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
            context.fill();

            // Draw the inner circle.
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // Update this image's data with data from the canvas.
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // Continuously repaint the map, resulting
            // in the smooth animation of the dot.
            map.triggerRepaint();

            // Return `true` to let the map know that the image was updated.
            return true;
        }
    };
    map.on('load', () => {
    });

    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 300;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    const spinGlobe = () => {
        // return new Promise(resolve=>{
        //     setTimeout(() => {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            //14000正好对准海南岛
            let distancePerSecond = 14000 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            map.easeTo({ center, duration: 3000, easing: (n) => n });


        }
        //     resolve("resolve")
        // },3000)
        //     })

    }

    spinGlobe()
    //此处的3s为spinGlobe的三秒
    await sleep(3000)
    map.flyTo({
        zoom: 6.2936502213379955,
        center: [117.56397276343876, 31.903559533266588],
        bearing: 18.399999999999977,
        pitch: 0,
        duration: 2000, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        },
        essential: true
    });
    await sleep(1500)

    //渡江战役范围
    await asyncAddLayer('ping2taiyuan', 'ping2taiyuan', haiNanData.staticData.dujiangzhanyiArea, 'fill', 1000,
        {
            paint: {
                'fill-color': '#191970',
                'fill-opacity': 1,
            }, layout: {}, filter: []
        }, map)
    // const nanJingPoint = {
    //     type: "FeatureCollection",
    //     features: [
    //         {
    //             type: "Feature",
    //             properties: { id: 0, size: 10, color: "red" },
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [118.767413, 32.041544],
    //             },
    //         },
    //     ],
    // };
    // await asyncAddLayer('nanJingPoint', 'nanJingPoint', nanJingPoint, 'circle', 500,
    //     {
    //         paint: {
    //             'circle-color': 'red',
    //             'circle-radius': 15,
    //         },
    //         layout: {}, filter: []
    //     }, map)
    // let tick = 1.0
    // setInterval(() => {
    //     map.setPaintProperty('nanJingPoint', 'circle-blur', 0.6 + tick / 5);
    //     tick = (tick + 1.0) % 10;
    // }, 100);
    const warpre = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    description: '南京'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [118.767413, 32.041544]
                }
            },
        ]
    }
    await asyncAddLayer('warpre', 'warpre', warpre, 'symbol', 100,
        {
            layout: {
                'text-field': ['get', 'description'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-size': 35,
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
            },
            paint: {
                'text-color': '#ffffff',
                'text-halo-color': '#000000',
                'text-halo-width': 2,
                'text-opacity': 0.8
            }
        }, map)
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    map.addSource('dot-point', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [121.472644, 31.231706] // 南京
                    }
                },
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [120.20000, 30.26667] // 上海
                    }
                },
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [118.967413, 32.141544] // 杭州
                    }
                },
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [115.90000, 28.68333]// 南昌
                    }
                },
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [113.00000, 28.21667]// 长沙
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
    per1.value = true
    {
        addLayer(map, 'att1_1', 'att1_1', haiNanData.att1_1, 'fill', {
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.5,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att1_1_line',
            'type': 'line',
            'source': 'att1_1',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att1_2', 'att1_2', haiNanData.att1_2, 'fill', {
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.5,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att1_2_line',
            'type': 'line',
            'source': 'att1_2',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att1_3', 'att1_3', haiNanData.att1_3, 'fill', {
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.5,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att1_3_line',
            'type': 'line',
            'source': 'att1_3',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att1_4', 'att1_4', haiNanData.att1_4, 'fill', {
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.5,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att1_4_line',
            'type': 'line',
            'source': 'att1_4',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att1_5', 'att1_5', haiNanData.att1_5, 'fill', {
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.5,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att1_5_line',
            'type': 'line',
            'source': 'att1_5',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        await sleep(1500)
        per2.value = true
        addLayer(map, 'att2_1', 'att2_1', haiNanData.att2_1, 'fill', {
            paint: {
                'fill-color': '#EE82EE',
                'fill-opacity': 0.6,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att2_1_line',
            'type': 'line',
            'source': 'att2_1',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att2_2', 'att2_2', haiNanData.att2_2, 'fill', {
            paint: {
                'fill-color': '#EE82EE',
                'fill-opacity': 0.6,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att2_2_line',
            'type': 'line',
            'source': 'att2_2',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att2_3', 'att2_3', haiNanData.att2_3, 'fill', {
            paint: {
                'fill-color': '#EE82EE',
                'fill-opacity': 0.6,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att2_3_line',
            'type': 'line',
            'source': 'att2_3',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        await sleep(1500)
        per3.value = true
        addLayer(map, 'att3_1', 'att3_1', haiNanData.att3_1, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_1_line',
            'type': 'line',
            'source': 'att3_1',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att3_2', 'att3_2', haiNanData.att3_2, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_2_line',
            'type': 'line',
            'source': 'att3_2',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att3_3', 'att3_3', haiNanData.att3_3, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_3_line',
            'type': 'line',
            'source': 'att3_3',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att3_4', 'att3_4', haiNanData.att3_4, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_4_line',
            'type': 'line',
            'source': 'att3_4',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att3_5', 'att3_5', haiNanData.att3_5, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_5_line',
            'type': 'line',
            'source': 'att3_5',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att3_6', 'att3_6', haiNanData.att3_6, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_6_line',
            'type': 'line',
            'source': 'att3_6',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
        addLayer(map, 'att3_7', 'att3_7', haiNanData.att3_7, 'fill', {
            paint: {
                'fill-color': '#B0E0E6',
                'fill-opacity': 0.7,
            }, layout: {}, filter: []
        })
        map.addLayer({
            'id': 'att3_7_line',
            'type': 'line',
            'source': 'att3_7',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 2
            }
        });
    }
    await sleep(1500)
    map.flyTo({
        center: [118.76199845015492, 31.799819432110652],
        pitch: 0,
        bearing: 18.399999999999977,
        zoom: 7.906509702545266,
        duration: 1000, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        },
        essential: true
    });
    await sleep(1000)
    gifFlag.value = true
    boomFlag.value = true
    //必须加入200ms的延迟，否则无法显示
    await sleep(200)
    playAudio3(audio3)
    await sleep(3000)
    gifFlag.value = false
    boomFlag.value = false
    await sleep(200)
    occupyFlag.value = true
    await sleep(1500)
    occupyFlag.value = false
    // 移除所有图层
    const allLayers = map.getStyle().layers;
    allLayers.forEach(function (layer) {
        if (layer.id != 'background' && layer.id != 'satellite')
            map.removeLayer(layer.id);
    });
    legend.value!.style.display = "none"

    //移除所有数据源
    const allSources = Object.keys(map.getStyle().sources);
    allSources.forEach(function (source) {
        if (source != 'mapbox')
            map.removeSource(source)
    });
    await sleep(200)
    map.flyTo({
        center: [107.52816750050579, 38.18454033297172],
        pitch: 0,
        bearing: 0,
        zoom: 3.835938820552623,
        duration: 1000, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        },
        essential: true
    });
    await sleep(1000)
    map.addSource("1949_china", {
        type: "geojson",
        data: 'http://localhost:8899/resource/1949_chinaSqure.json',
    });
    map.addLayer({
        id: "1949_china",
        type: 'fill',
        source: "1949_china",
        paint: {
            "fill-opacity": 0.5,
            "fill-color": "#000080",
        },
    });
    await sleep(500)
    map.setPaintProperty("1949_china", 'fill-color', '#fd8d3c');
    await sleep(500)
    map.setPaintProperty("1949_china", 'fill-color', '#253494');
    await sleep(500)
    map.setPaintProperty("1949_china", 'fill-color', '#2c7fb8');
    await sleep(500)
    map.setPaintProperty("1949_china", 'fill-color', '#41b6c4');
    await sleep(500)
    map.setPaintProperty("1949_china", 'fill-color', '#a1dab4');
    await sleep(500)
    map.setPaintProperty("1949_china", 'fill-color', '#bd0026');
    map.removeLayer("1949_china");
    map.removeSource("1949_china")
    map.flyTo({
        center: [116.401795, 39.845333],
        pitch: -1.0273126806823636,
        bearing: 0,
        zoom: 7.906509702545266,
        duration: 1000, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        },
        essential: true
    });
    map.addSource('dot-point', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [116.401795, 39.845333] // 南京
                    }
                },
            ]
        }
    });
    map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
    map.flyTo({
        center: [107.076468, 35.445836],
        pitch: -1.5629373154773907,
        bearing: 0,
        zoom: 5.029678129250389,
        duration: 1500, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        },
        essential: true
    });
    await sleep(1500)
    for (const marker of [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [116.401795, 39.845333] // 南京
            }
        },
    ]) {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage =
            "url(http://localhost:8899/resource/tianan.png)"
        el.style.width = "250px";
        el.style.height = "250px";
        el.style.backgroundSize = "100%";
        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates as any)
            .addTo(map);
        await sleep(1500)
        el.style.display = "none"
    }

    addLayer(map, 'south_att_1', 'south_att_1', haiNanData.south_att_1, 'fill', {
        paint: {
            'fill-color': '#ff0000',
            'fill-opacity': 0.5,
        }, layout: {}, filter: []
    })
    map.addLayer({
        'id': 'south_att_1',
        'type': 'line',
        'source': 'south_att_1',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2
        }
    });
    addLayer(map, 'south_att_2', 'south_att_2', haiNanData.south_att_2, 'fill', {
        paint: {
            'fill-color': '#ff0000',
            'fill-opacity': 0.5,
        }, layout: {}, filter: []
    })
    map.addLayer({
        'id': 'south_att_2',
        'type': 'line',
        'source': 'south_att_2',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2
        }
    });
    addLayer(map, 'south_att_3', 'south_att_3', haiNanData.south_att_3, 'fill', {
        paint: {
            'fill-color': '#ff0000',
            'fill-opacity': 0.5,
        }, layout: {}, filter: []
    })
    map.addLayer({
        'id': 'south_att_3',
        'type': 'line',
        'source': 'south_att_3',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2
        }
    });

    await sleep(500)
    map.getStyle().layers.forEach(function (layer) {
        if (layer.id != 'background' && layer.id != 'satellite')
            map.removeLayer(layer.id);
    });
    //移除所有数据源
    Object.keys(map.getStyle().sources).forEach(function (source) {
        if (source != 'mapbox')
            map.removeSource(source)
    });
    map.flyTo({
        center: [109.7533494974391, 18.992619304884258],
        pitch: 66.53442672115443,
        bearing: 18.399999999999636,
        zoom: 8.807154459329084,
        duration: 1500, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        },
        essential: true
    });
   
    await sleep(3000)
    map.setStyle('mapbox://styles/mapbox/outdoors-v12')
    
    
console.log(map.getStyle().layers)


}
onMounted(async () => {
    loadMaobox().then(() => initMap())
    //initMap()

})
</script>