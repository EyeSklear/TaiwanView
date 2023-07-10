

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap');

.container {

    display: flex;

    .left-aside {
        display: flex;
        justify-content: center;

        width: 12vw;
        height: 60vh;

        :deep(.el-sub-menu__title) {
            color: red;

        }

        :deep(el-menu) {
            display: flex;
            justify-content: center;
        }
    }

    .title {
        font-family: 'Noto Sans SC', sans-serif;
        font-size: 40px;
    }
    .right{
        padding:20px;
    }
    .picture{
        display:flex;
        justify-content: space-around;
        :deep(.el-upload-list__item-thumbnail){
            //display: inline-block;
            width:300px;
            height:300px;
        }
        :deep(.el-upload-list__item){
            //display: inline-block;
            width:300px;
            height:300px;
            margin:20px;
        }
    }

}
</style>

<template>
    <div class="container">
        <div class="left-aside">
            <el-menu default-active="2" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1" style="width:12vw;">
                    <template #title>

                        <el-icon>
                            <location />
                        </el-icon>
                        <span class="title">图片</span>
                    </template>
                    <el-menu-item-group title="Group One">
                        <el-menu-item index="1-1">item one</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="1-4">
                        <template #title>item four</template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <span>音频</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>视频</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>GIF</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right">
           <el-button color="#626aef"  plain @click="openUploadFile()">
上传文件
           </el-button>
           <el-button color="#626aef"  plain @click="createFolder()">
创建文件夹
           </el-button>

        </div>
        <div class="picture">
            <el-upload
    v-model:file-list="fileList"
    style="margin:20px"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :http-request="uploadFiles"
  >
 
    <el-icon><Plus /></el-icon>
    
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" class="imagee"/>
  </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { UploadFile, UploadFiles } from "element-plus";
import {createFileChunk} from '@/utils/file'
import { uuid } from '@/types/common'
import { uploadFile } from '@/api'
const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/resource/city.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log("handlePictureCardPreview",uploadFile, uploadFiles)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
//上传文件
const openUploadFile = () =>{

}
//新建文件夹
const createFolder = () =>{

}
//test测试，测试是否先可以上传文件至后台
const uploadFiles = async (item:any) =>{
    console.log(item.file);
    let id = uuid()
    let tempPath= uuid()
    let fileChunk = createFileChunk(item.file as File);
    console.log('fileChunk',fileChunk)
    let formData = new FormData()
    formData.append('file',fileChunk[0].file)
    formData.append('key',id)
    formData.append('name',item.file.name)
    const data = await uploadFile(formData)
    console.log('guaguagua'+data)

    
}

</script>