<template>
  <div>
    我是第一个组件 <br/>
    <!--
      浏览器的历史记录是一个栈,而我们在页面上跳转的方式存在两种
      1."push"模式:每次跳转产生一个历史记录,此时将其压入栈中,而前进和后退是栈顶指针的前后移动;
      2."repalce"模式:每次跳转产生的历史记录将替换栈顶元素.
      Vue默认开启的是"push"模式,如果需要开启"replace"模式,需要在"router-link"中加入"replace"属性
    -->
    <router-link :replace="true" to="/myFirstRouter/myFirstChild">点击切换第一个组件的第一个子组件</router-link> <br/>
    <router-link :replace="true" to="/myFirstRouter/mySecondChild">点击切换第一个组件的第二个子组件</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MyFirstRouter"
};
</script>

<style></style>
