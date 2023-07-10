

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap');

.container {

    display: flex;

}
</style>

<template>
    <div class="container">

        <div class="right">
            <el-button color="#626aef" plain @click="openUploadFile()">
                上传文件
            </el-button>
            <el-button color="#626aef" plain @click="createFolder()">
                创建文件夹
            </el-button>

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
import { createFileChunk } from '@/utils/file'
import { uuid } from '@/types/common'
import { uploadFile } from '@/api'
//文件路径
const path = ref<[]>()
//上传文件
const openUploadFile = () => {

}
//新建文件夹
const createFolder = () => {

}
//test测试，测试是否先可以上传文件至后台
const uploadFiles = async (item: any) => {
    console.log(item.file);
    let id = uuid()
    let tempPath = uuid()
    let fileChunk = createFileChunk(item.file as File);
    console.log('fileChunk', fileChunk)
    let formData = new FormData()
    formData.append('file', fileChunk[0].file)
    formData.append('key', id)
    formData.append('name', item.file.name)
    const data = await uploadFile(formData)
    console.log('guaguagua' + data)


}

</script>