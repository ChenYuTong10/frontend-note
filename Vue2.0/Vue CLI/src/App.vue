<template>
  <div>
    <div class="ref-prop">
      <h1 ref="title">Ref属性</h1>
      <button @click="DisplayRef">Vue中获取DOM元素</button>
    </div>
    <div>
      <!-- 父组件向子组件传递信息:只需要在子组件中使用"props"配置项 -->
      <MyComponent name="渣渣灰" :age="18" description="是兄弟就来砍我" />
    </div>
    <div>
      <button @click="showMixin">mixin</button>
    </div>
    <div>
      <!-- 子组件向父组件传递信息:需要使用"this.$emit()"函数,或者"ref"与"mounted"函数配合 -->
      <MyComponent
        name="渣渣灰"
        :age="18"
        description="是兄弟就来砍我"
        v-on:myEvent="SelfIntroduction"
      />
      <MyComponent ref="zhangsan" name="张三" :age="18" description="我无敌" />
    </div>
    <div>
      <button @click="EmitBusEvent">点击激发全局事件总线</button>
    </div>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <!-- 
        1.如果"transition"标签加上了"name="show""的属性,那么下面的CSS名称将
        变为".show-enter-active"和".show-leave-active",其余的类似;
        2."appear"属性控制页面展示时,是否立即展示动画;
        3.如果需要给多个元素加上动画,需要使用"transition-group"标签,且每一个元素都要绑定唯一的键值;
        4.可以使用第三方样式库,例如:"animate.css"等,可以使用更多动画效果.
       -->
      <transition :appear="true">
        <h2 v-show="isShow" style="background-color: orange">我蹦出来了</h2>
      </transition>
    </div>
    <div>
      <button @click="GetCourses">点击获取课程数据</button>
    </div>
    <div>
      <MyComponent
      name="渣渣灰"
      :age="18"
      description="是兄弟就来砍我"
      v-on:myEvent="SelfIntroduction"
      >
        <!-- 
          1.在相同组件中存在不同内容,可以在组件标签中写入不同的内容,
          但是记得在组件内部定义插槽,不然Vue不知道你要放到组件的哪里;
          2.使用"template"标签最后不会生成真正的DOM元素,因此有时与插槽搭配很好,
          同时使用"template"标签时,使用插槽还可以有以下的写法.
        -->
        <img slot="demo" src="https://s4.ax1x.com/2022/02/14/HyrwRO.jpg" alt="" />
        <!--
          <template v-slot:demo>
            <img src="https://s4.ax1x.com/2022/02/14/HyrwRO.jpg" alt="" />
          </template>
        -->
      </MyComponent>
    </div>
    <div>
      <MyComponent
      name="渣渣灰"
      :age="18"
      description="是兄弟就来砍我"
      v-on:myEvent="SelfIntroduction"
      >
        <!-- 可以使用"scope"接受来自组件的值,同时必须使用"template"标签包裹 -->
        <template slot="demo" scope="componentValues">
          <div>{{ componentValues }}</div>
        </template>
      </MyComponent>
    </div>
    <div>
      <!--
        1.路由:一对键值对,"key"是路由入口,"value"是执行或者处理终端;
        2.Vue中通过"vue-router"插件实现单页面应用(SPA),使用"$ npm install vue-router",
        注意Vue2.0只能安装vue-router@3.0,Vue3.0才能安装最新版.
      -->
      <!-- 传统跳转页面的做法
        <a href="#">点击展示第一个组件</a> <br/>
        <a href="#">点击展示第二个组件</a>
      -->
      <!-- 使用"vue-router"的库
        1."router-link"标签最终仍然会解析为"a"标签;
        2."active-class"属性可以控制激活时的样式;
        3.组件之间的切换是被创建和销毁,而不是显示和隐藏.
      -->
      <router-link to="/myFirstRouter">点击展示第一个组件</router-link> <br/>
      <router-link to="/mySecondRouter">点击展示第二个组件</router-link>
      <div>
        <!--
          缓存路由:前面说过组件之间的切换是被创建和销毁,比如用户填写某个表单时,
          需要跳转到其他组件中查看东西,而回来的时候由于原先的组件被销毁,填写的东西都会消失,
          因此我们需要缓存路由,其使用"keep-alive"标签即可实现,如果只需要缓存指定组件,
          那么可以加上"include"属性,并将组件的名称以数组的方式赋予给它,不写默认缓存全部组件.
        -->
        <keep-alive :include="['MyFirstRouter', 'MySecondRouter']">
          <!-- 展示指定的组件 -->
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import MyComponent from "./components/MyComponent";
import { MyMixin } from "./mixin/MyMixin";
import pubsub from "pubsub-js";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    DisplayRef() {
      // "this"指向组件实例对象
      console.log(this.$refs.title);
    },
    SelfIntroduction(introduction) {
      console.log(introduction);
      // 在下一次渲染模板完毕后,在进行调用
      // 比如:点击编辑按钮后,输入框自动获取焦点,如果不使用下面的方法,
      // Vue会执行完整个函数后,再进行渲染模板,然而执行自动获取焦点语句时,
      // 输入框还没有被渲染出来,因此会导致失效.
      this.$nextTick(function () {
        console.log("模板渲染完成后,在调用");
      });
    },
    EmitBusEvent() {
      // 使用全局事件总线传递数据
      // this.$bus.$emit("busEvent", "我是App组件");
      // 发布消息
      pubsub.publish("messageEvent", "我是App组件");
    },
    GetCourses() {
      /*
       * 老生常谈的跨域问题:
       * 0.常见的请求方式:
       *   (1)xhr (2)axios (3)fetch (4)vue-resource(不常用了,有需要再了解)
       *   后面两个用的比较多,但是"fetch"的返回结果会封装两层且IE浏览器不支持.
       * 1.跨域请求:当资源路径的协议,域名和端口相同时为"同源";
       *   (1)"CSRF"攻击:比如,用户访问了A网站并登录,此时浏览器中存在A网站的Cookie,
       *   如果用户点击其他危险链接且其资源路径为A网站,那么存在很大的安全隐患;
       *   (2)由于上述的"CSRF"攻击,浏览器会自动限制不同源的请求;
       * 2.解决方法:
       *   (1)由后端进行解决,通常通过设置"Access-Control-Allow-Origin"允许全部或者自己的网站访问;
       *   (2)由前端进行解决:配置代理服务器
       *      - nginx
       *      - jsonp(没了解过)
       *      - vue-cli:在"vue.config.js"文件中配置"devServer.proxy"属性,详细信息参考官网,有两种方式
       */
      axios
        .get(
          "http://chouyatou.club:8080/MyProject/Courses/SelectByPage?currentPage=1&pageSize=20"
        )
        .then(
          (result) => {
            console.log(result.data);
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
  },
  components: {
    MyComponent,
  },
  mixins: [MyMixin],
  mounted() {
    // 第二种自定义事件的写法,灵活性较强
    // 比如我需要等页面渲染后3秒才绑定事件
    setTimeout(() => {
      this.$refs.zhangsan.$on("myEvent", this.SelfIntroduction);
    }, 3000);
  },
  // 组件专有的两个生命周期函数,仅当组件被"keep-alive"标签包裹时生效
  // 比如:有表单的组件需要被缓存,其中还存在一个定时器,而被"keep-alive"标签包裹是不会执行"beforeDestroy"函数,
  // 因此不会关闭定时器,这时候就需要引入下面两个生命周期
  activated() {
    // 当组件被激活时调用
  },
  deactivated() {
    // 当组件失活时调用
  },
  // 组件内部的路由守卫,当通过路由规则(点击)进入该组件时调用
  // 参数与全局路由守卫含义相同
  beforeRouteEnter (to, from, next) {},
  beforeRouteLeave (to, from, next) {}
};
</script>

<style scoped>
/* 
  1.组件中的style样式最终会汇总,如果存在id或者类名冲突,那么会报错或者覆盖(取决于引入组件的先后顺序)
  那么如果添加"scoped"属性,那么可以避免这样的现象,但是App组件不适合添加该属性;
  2.组件的"style"除了使用原生CSS语法,还可以使用"less"语法,但是VueCLI不能直接解析less语法,
  因此使用"$ npm install less-loader"安装最新的解析器,但是由于VueCLI中使用的是webpack@4.0版本,
  而最新的"less-loader"需要webpack@5.0版本基础,因此需要安装"less-loader@7"版本;
  【PS】:"$ npm view less-loader versions"可以查看所用版本
*/

/* Vue提供了动画产生和消失的三种状态,分别如下 */
.v-enter {
}
.v-enter-active {
  animation: myAnimation 1s linear;
}
.v-enter-to {
}
.v-leave {
}
.v-leave-active {
  animation: myAnimation 1s linear reverse;
}
.v-leave-to {
}
@keyframes myAnimation {
  from {
    transform: translateX(-100%);
  }
  to: {
    transform: translateX(0);
  }
}
</style>
