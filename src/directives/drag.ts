import {Directive} from "vue"

// export const move:Directive<any,void>=(el:HTMLElement,bingding:DirectiveBinding)=>{


// //第一个子元素为header
// let moveElement:HTMLDivElement =el.firstElementChild as HTMLDivElement
// const mouseDown= (e:MouseEvent) =>{

// let X=e.clientX - e.offsetLeft
// let Y=e.clientY - e.offsetTop


// const move = (e:MouseEvent)=>{
//     e.style.left=e.clientX -X + 'px'
//     e.style.top=e.clientY -Y + 'px'

// }
// document.addEventListener('mousemove',move)
// document.addEventListener('mouseup',()=>{
// document.removeEventListener('mousemove',move)
// })
// }

// moveElement.addEventListener('mousedown',mouseDown)

// }

export const move: Directive = {
    mounted(el: HTMLElement) {
        let moveEl = el as HTMLElement;
        const mouseDown = (e: MouseEvent) => {
            //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            //console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
            let X = e.clientX - el.offsetLeft;
            let Y = e.clientY - el.offsetTop;
            const move = (e: MouseEvent) => {
                el.style.left = e.clientX - X + "px";
                el.style.top = e.clientY - Y + "px";
                //console.log(e.clientX, e.clientY, "---改变");
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", move);
            });
        };
        moveEl.addEventListener("mousedown", mouseDown);
    },
};
