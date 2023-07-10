import { get, post, del, patch }  from '../utils/request'

import axios from "axios";
import {
    RegisterJsonData,
    LoginJsonData,
  } from "./type/userType";

//========================User相关接口=================================
export async function login(jsonData: LoginJsonData) {
    return await post(`/user/login`, jsonData);
  }
  
  export async function getUserInfo() {
    return await get(`/user/getUserInfo`);
  }
  
  export async function register(jsonData: RegisterJsonData) {
    return await post(`/user/register`, jsonData);
  }
  
//   export async function getUserByEmail() {
//     return await get(`/user/getUserByEmail`);
//   }
//========================File相关接口=================================
export async function uploadFile(formData:FormData){
  return await post(`/file/uploadFile`, formData)
}


//========================Folder相关接口=================================
export async function addFolder(formData:FormData){
  return await post(`/folder/addFolder`, formData)
}