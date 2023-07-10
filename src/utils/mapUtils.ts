// import mapboxgl from "mapbox-gl";
// import mapBoxGl from "mapbox-gl";//闪烁函数
// let map: mapBoxGl.Map;
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import mapBoxGl from "mapbox-gl";
//闪烁函数
export function  flashLayer (layerid: any,map:mapBoxGl.Map)  {
    // Set the initial opacity to 0
    map?.setPaintProperty(layerid, 'fill-opacity', 0);
    
    let delta = -0.3
    let opacity = 1;
    // Define the duration of the flashing effect
    const duration = 3000; // in milliseconds

    // Set up the interval to alternate the layer's opacity
    let start = Date.now();
    let interval = setInterval(() => {
        let timePassed = Date.now() - start;
        opacity += delta
        //不能设置为0 否则会报错
        if (opacity < 0.06 || opacity > 0.94) {
            delta = -delta; // 到达最小或最大值时，逆转透明度的变化方向
        }
        //let opacity = Math.sin((timePassed / duration) * Math.PI);
        map?.setPaintProperty(layerid, 'fill-opacity', opacity);
        if (timePassed > duration) {
            clearInterval(interval);
            map?.setPaintProperty(layerid, 'fill-opacity', 0.6);
        }
    }, 200);
}

//休眠时间
export async function sleep(delay: any) {
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`等待了${delay}秒钟，继续执行`);
}
//静态增加图层
export const addLayer = (map:mapBoxGl.Map,sourceId: string, layerId: string, data: any, type: string, layerConfig?: any) => {

    map.addSource(sourceId, {
        type: 'geojson',
        data: data
    });
    map.addLayer({
        id: layerId,
        type: type,
        source: sourceId,
        paint: layerConfig?.paint,
        layout: layerConfig?.layout,
        //filter: layerConfig?.filter
    });
}
//相机随视角变化
export const cameraAlong = async (path: any[],map:mapBoxGl.Map) => {
    return new Promise(resolve => {
        const animationDuration = 10000;
        const cameraAltitude = 5000;
        // get the overall distance of each route so we can interpolate along them
        const routeDistance = turf.lineDistance(turf.lineString(path));
        const cameraRouteDistance = turf.lineDistance(
            turf.lineString(path)
        );

        let start: any;
        let isAnimating = true;
        function frame(time: any) {
            if (!isAnimating) return;
            if (!start) start = time;
            // phase determines how far through the animation we are
            const phase = (time - start) / animationDuration;
            // phase is normalized between 0 and 1
            // when the animation is finished, reset start to loop the animation
            if (phase > 1) {
                // wait 1.5 seconds before looping
                // setTimeout(() => {
                //     start = 0.0;
                // }, 1500);
                resolve('resolve')
                return
            }

            // use the phase to get a point that is the appropriate distance along the route
            // this approach syncs the camera and route positions ensuring they move
            // at roughly equal rates even if they don't contain the same number of points
            const alongRoute = turf.along(
                turf.lineString(path),
                routeDistance * phase
            ).geometry.coordinates;

            const alongCamera = turf.along(
                turf.lineString(path),
                cameraRouteDistance * phase
            ).geometry.coordinates;

            const camera = map.getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
                {
                    lng: alongCamera[0],
                    lat: alongCamera[1]
                },
                cameraAltitude
            );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
                lng: alongRoute[0],
                lat: alongRoute[1]
            });

            map.setFreeCameraOptions(camera);

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    })

}

//在mapbox上加载栅格影像并设置浮现效果(异步改同步)
export  const setImage = async (map:mapBoxGl.Map,sourceId:string,layerId:string,coordinates:number[][]) => {
    return new Promise(resolve => {
        map.addSource(sourceId, {
            type: "image",
            url: `http://localhost:8060/getImage?name=${sourceId}`,
            coordinates:coordinates,
                // [
                //     [113.91345, 39.40586],
                //     [114.02812, 39.37383],
                //     [113.947875, 39.27091],
                //     [113.81328, 39.30673],
                // ],
        });
        map.addLayer({
            id: layerId,
            type: "raster",
            source: sourceId,
            //   'raster-resampling': 'nearest',
            //   'raster-translate': [0, 0, 3000], 
            //   'raster-translate-anchor': 'map'
            paint: {
                'raster-opacity': 0,
            }
        });
        //map?.setPaintProperty('imageWar', 'fill-opacity', 0);
        let opacity = 0;
        const interval = setInterval(() => {
            if (opacity < 0.99) {
                opacity = opacity + 0.01
                map?.setPaintProperty(layerId, 'raster-opacity', opacity);
            }
            else {
                clearInterval(interval)
                resolve('resolve')
                return
            }
        }, 20)
    })
}


export const asyncAddLayer = async (sourceId: string, layerId: string, data: any, type: string, delay:delay,layerConfig?: any,map:mapBoxGl.Map) => {
    return new Promise(resolve => {
        setTimeout(() => {
            map.addSource(sourceId, {
                type: 'geojson',
                data: data
            });
            map.addLayer({
                id: layerId,
                type: type,
                source: sourceId,
                paint: layerConfig?.paint,
                layout: layerConfig?.layout,
                //filter: layerConfig?.filter
            });
            resolve("resolve")

        }, delay)
    })

}