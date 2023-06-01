// 声明一个模块，防止引入文件时报错
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';
declare module 'vue3-video-play'
declare module 'vue-pdf'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.mp4'
declare module '@deck.gl/geo-layers'
declare module '@deck.gl/mapbox'

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}