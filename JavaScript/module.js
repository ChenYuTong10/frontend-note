// 分别暴露模块
export let planet = "Earth";
export function Destroy() {
    console.log("The earth is destroyed!");
}

// 统一暴露
let dog = "wangchai";
function bark() {
    console.log("I am wangchai!");
}
export { dog, bark };

// 默认暴露
export default {
    cat: "Tom",
    catchMouse: function() {
        console.log("I can catch mouse!");
    }
};
