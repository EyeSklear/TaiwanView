<template>
    <div class="content">
        <div class="wrapper">
            <div class="form-wrapper">
                <div class="login-form">
                    <div class="tips">
                        <h1>注册新的全景台湾账户.</h1>
                        <span>已创建账户?</span>
                        <span class="signup-into" @click="toLogin()">登录</span>
                    </div>
                    <div class="form-wrapper">
                        <el-form :model="form" :rules="rules" ref="ruleFormRef">
                            <div class="input-wrapper user">
                                <el-form-item prop="email">
                                    <input v-model="form.email" class="inputs" type="text"  placeholder="请输入邮箱"/>
                                </el-form-item>
                            </div>
                             <div class="input-wrapper username">
                                <el-form-item prop="username">
                                    <input v-model="form.username"  type="text" class="inputs" placeholder="请输入用户名"/>
                                </el-form-item>
                            </div>
                            <div class="input-wrapper pwd">
                                <el-form-item prop="password">
                                    <input v-model="form.password" show-password type="password" class="inputs" placeholder="请输入密码"/>
                                </el-form-item>
                            </div> 
                            <div class="input-wrapper surepwd">
                                <el-form-item prop="password">
                                    <input v-model="form.surePassword" show-password type="password" class="inputs" placeholder="请确定密码"/>
                                </el-form-item>
                            </div>
                        </el-form>
                        <!-- <div class="input-wrapper user">
              <input type="text" class="inputs">
            </div>
            <div class="input-wrapper pwd">
              <input type="password" class="inputs" >
            </div> -->
                        <div class="input-wrapper veri-code">
                            <input type="text" class="inputs veri-code-input">
                            <span class="veri-code-tips">短信登录</span>
                        </div>
                        <div class="btn-wrapper">
                            <button class="form-btn other-login-btn" @click="registerHandler(ruleFormRef)">注册</button>
                            <!-- <button class="form-btn login-btn" @click="login(ruleFormRef)">登录</button> -->
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <h1>{{ msg }}</h1>
    <div>
      woshi 1
    </div>
    <div>
      <button @click="clickme()">click</button>
      <button @click="clickmee()">click2</button>
    </div>
    <div class="card">
      <button type="button" @click="flag = !flag">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
    <div style="display:flex">
    <div>
      <Transition :duration="2000" 
      appear
           appear-active-class="animate__animated animate__backInRight"
           appear-from-class="animate__animated animate__backInRight"
           appear-to-class="animate__animated animate__backInRight"
       >
        
        <p style="width:150px;height:150px;background-color: red ;">全</p>
      </Transition>
  </div>
  <div>
      <Transition :duration="2000" 
      appear
           appear-active-class="animate__animated animate__backInLeft"
           appear-from-class="animate__animated animate__backInLeft"
           appear-to-class="animate__animated animate__backInLeft"
       >
        
        <p  style="width:150px;height:150px;background-color: blue">景</p>
      </Transition>
  </div>
  </div> -->
</template>
  
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
import 'animate.css'
import type { FormInstance } from "element-plus";
import helloworld2 from './HelloWorld2.vue'
import router from '@/router';
import { Base64 } from "js-base64";
import {notice} from '@/utils/notice'
import { register } from '@/api';
// const flag = ref(true)
// // leave-active-class="animate__animated animate__fadeOut"
// //     enter-active-class="animate__animated animate__fadeIn"
// const beforeEnter = (el: Element) => {
//   console.log('进入之前from', el);
// }
// const clickme = () => {
//   router.push({ path: "/hello" })
//   console.log("me", router)
// }
// const clickmee = () => {
//   router.push({ path: "/hello3" })
//   console.log("me", router)
// }
// defineProps<{ msg: string }>()

// const count = ref(0)

const ruleFormRef = ref<FormInstance>();
const form = reactive({
    email: "",
    username: "",
    password: "",
    surePassword: "",
});
const validatePass = (rule: any, value: string, callback: any) => {
      if (value != form.password) {
        callback(new Error("前后密码不一致"));
      } else {
        callback();
      }
    };
const rules = reactive({
    email: [
        { required: true, message: "邮箱不能为空", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
      ],
      username: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      surePassword: [
        { required: true, message: "确认密码不能为空", trigger: "blur" },
        { validator: validatePass, trigger: "blur" },
      ],
});


const toLogin = () => {
    router.push({ path: "/login" });
};



const registerHandler = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
      await formEl.validate(async (valid) => {
        if (valid) {
          const jsonData = {
            email: form.email,
            name: form.username,
            password: Base64.btoa(form.password),
          };
          let data = (await register(jsonData)) as any;
          console.log("haha",data)
          if (data != null) {
            if (data.code === -3) {
              notice("warning", "失败", "邮箱已经存在!");
            } else if (data.code === 0) {
              notice("success", "成功", "注册成功!");
              router.push({ path: "/login" });
            } else {
              notice("warning", "失败", "注册失败!");
            }
          }
        }
      });
   
    }



</script>
  
  
<style scoped lang="scss">
* {
    padding: 0;
    margin: 0;
}

.content {
    width: 100vw;
    height: 100vh;
    background-color: rgb(82, 84, 97);
    position: relative;

    .wrapper {
        width: 70%;
        height: 80%;
        border-radius: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-image: linear-gradient(to right top,
                rgb(40, 42, 55,1) 0%,
                rgb(194, 196, 213,1) 20%,
                rgba(63, 69, 100, 0.9) 60%,
                rgba(57, 63, 92, 0.4) 100%),
            url(@/assets/bg.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 80px;
        box-sizing: border-box;

        .form-wrapper {
            width: 100%;
            height: 50vh;
            position: relative;
            top: -10px;

            .login-form,
            .signup-form {
                position: absolute;
                transition: 0.5s;

                .tips {
                    color: #fff;

                    h1 {
                        font-size: 45px;
                        margin: 20px 0;
                        font-family: "Newake", Times, serif;
                        letter-spacing: 2px;
                    }

                    span {
                        margin: 0 0 25px 0;
                        font-family: "Century Gothic", Times, serif;
                    }

                    span:first-child {
                        color: #d1d1d1;
                    }

                    span:last-child {
                        color: rgb(240, 238, 147);
                        cursor: pointer;
                    }
                }

                .form-wrapper {
                    .input-wrapper {
                        position: relative;
                        margin: 30px 0;
                        transition: 0.5s;

                        .inputs {
                            width: 100%;
                            height: 70px;
                            display: block;
                            border-radius: 18px;
                            border: 0;
                            background-color: rgb(50, 54, 69);
                            color: #fff;
                            padding: 20px 60px 0px 30px;
                            box-sizing: border-box;
                            outline: none;
                            font-size: 15px;
                            font-weight: 600;
                            font-family: "Century Gothic", Times, serif;

                            &:focus {
                                border: 1px solid rgb(21, 139, 243);
                                box-shadow: 0 0 1px 1px rgb(21, 139, 243);
                            }
                        }

                        &::before {
                            display: inline-block;
                            width: 50px;
                            height: 10px;
                            color: rgb(113, 114, 119);
                            position: absolute;
                            top: 10px;
                            left: 30px;
                            white-space: nowrap;
                            font-family: "Century Gothic", Times, serif;
                        }

                        &::after {
                            content: "";
                            display: inline-block;
                            width: 40px;
                            height: 40px;
                            position: absolute;
                            top: 36px;
                            right: 10px;
                            background-size: 50%;
                            background-repeat: no-repeat;
                            z-index: 1;
                            white-space: nowrap;
                        }
                    }

                    .user {
                        &::before {
                            content: "Email";
                        }

                        &::after {
                            background-image: url(@/assets/email.png);
                        }
                    }
                    .username {
                        input {
                            letter-spacing: 2px;
                        }

                        &::before {
                            content: "Email";
                        }

                        &::after {
                            background-image: url(@/assets//password.png);
                        }
                    }

                    .pwd {
                        input {
                            letter-spacing: 2px;
                        }

                        &::before {
                            content: "Password";
                        }

                        &::after {
                            background-image: url(@/assets//password.png);
                        }
                    }
                    .surepwd {
                        input {
                            letter-spacing: 2px;
                        }

                        &::before {
                            content: "Password";
                        }

                        &::after {
                            background-image: url(@/assets//password.png);
                        }
                    }


                    .veri-code {
                        opacity: 0;
                        z-index: -1;
                        position: relative;
                        transition: 0.5s;

                        .veri-code-input {
                            padding-right: 200px;
                        }

                        .veri-code-tips {
                            position: absolute;
                            right: 20px;
                            top: 36px;
                            color: rgb(39, 150, 247);
                            cursor: pointer;
                        }

                        &::before {
                            content: "Verification Code";
                        }
                    }
                }

                .form-btn {
                    width: 100%;
                    height: 60px;
                    background-color: rgb(0, 129, 241);
                    color: #fff;
                    border-radius: 50px;
                    border: 0;
                    font-size: 20px;
                    font-weight: 600;
                    margin: 15px auto;
                    cursor: pointer;
                    font-family: "Century Gothic", Times, serif;
                }
            }

            .login-form {
                z-index: 1;
                opacity: 1;
                animation: loginAnimation 1s;
                animation-fill-mode: forwards;
                animation-timing-function: ease;

                .btn-wrapper {
                    display: flex;
                    transform: translate(0, -90px);

                    .login-btn {
                        flex: 1;
                        margin-left: 10px;
                        transition: 0.5s;
                        

                        &:hover {
                            background-color: rgb(39, 150, 247);
                        }
                    }

                    .other-login-btn {
                        flex: 1;
                        
                        transition: 0.5s;
                        background-color: rgb(85, 91, 105);
                        margin:  0;

                        &:hover {
                            background-color: rgb(101, 109, 126);
                        }
                    }
                }

                .form-wrapper {
                    .other-login {
                        transform: translate(0, -60%);

                        .divider {
                            width: 100%;
                            margin: 20px 0;
                            text-align: center;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .line {
                                display: inline-block;
                                max-width: 45%;
                                width: 45%;
                                flex: 1;
                                height: 1px;
                                background-color: #fff;
                            }

                            .divider-text {
                                vertical-align: middle;
                                margin: 0px 20px;
                                line-height: 0;
                                display: inline-block;
                                width: 50px;
                                color: #fff;
                            }
                        }

                        .other-login-wrapper {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .other-login-item {
                                border: 1px solid #fff;
                                padding: 10px;
                                text-align: center;
                                border-radius: 10px;
                                cursor: pointer;
                                font-weight: 600;
                                color: rgb(51, 49, 116);
                                margin: 0 10px;

                                img {
                                    width: 30px;
                                    height: 30px;
                                    vertical-align: middle;
                                }

                                span {
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }

            .signup-form {
                opacity: 0;
            }
        }
    }
}

@keyframes loginAnimation {
    0% {
        transform: translate(0, 100px);
    }

    100% {
        transform: translate(0, 0px);
    }
}
</style>
  