<template>
  <!--
    "Vue3"的"template"标签中可以存在多个标签,
    实际上是"Vue3"在外层嵌套了一个不参与渲染的虚拟"Fragment"标签
  -->
  <div>
    <h1>我是{{ name }}</h1>
    <h1>今年{{ age }}岁</h1>
    <h1>{{ description }}</h1>
    <button @click="Greeting">点击欢迎Vue3</button>
  </div>
  <div>
    <h1>我是{{ name }}</h1>
    <h1>今年{{ age }}岁</h1>
    <h1>{{ description }}</h1>
    <button @click="ChangeName">点击更改名称</button>
  </div>
  <div>
    <h1>我是{{ person.name }}</h1>
    <h1>今年{{ person.age }}岁</h1>
    <h1>{{ person.description }}</h1>
    <button @click="ChangePerson">点击更改人</button>
  </div>
  <div>
    <h1>我的工作是{{ work.name }}</h1>
    <h1>薪水是{{ work.salary }}岁</h1>
    <button @click="ChangeWork">点击更改工作</button>
  </div>
  <div>
    姓: <input type="text" v-model="me.xing"> <br/>
    名: <input type="text" v-model="me.ming"> <br/>
    姓名: <input type="text" v-model="me.name">
  </div>
  <div>
    <div>总数: {{ totalCounts }}</div>
    <button @click="AddCounts">点击加1</button>
  </div>
  <div>
    <div>你点击的坐标: ({{ position.x}}, {{ position.y }})</div>
  </div>
  <div>
    防抖效果: <input type="text" v-model="keyword">
    <div>{{ keyword }}</div>
  </div>
  <!-- "Teleport"标签:将内部包裹的标签传送至指定标签内部,可以在弹出对话框等场景时运用 -->
  <teleport to='body' >
    <div>我被传送了</div>
  </teleport>
  <!--
    "Suspense"标签:当异步加载缓慢时,可以体验更好,需要配合"defineAsyncComponent"使用 
    适合在网速较慢或者组件的数据是异步的"Promise"对象(需要客户给钱优化,哈哈哈)的场景
  -->
  <Suspense>
    <template v-solt:default>
      <!-- 一般放置组件 -->
      <div>我出来了</div>
    </template>
    <template v-slot:fallback>
      <!-- 在组件出来前的提示信息等标签 -->
      <h3>加载中...</h3>
    </template>
  </Suspense>
</template>

<script>
import { ref, reactive, computed, watch, watchEffect, toRefs, customRef } from "vue";
import GetPosition from "./hooks/clickPosition";

export default {
  name: "App",
  // "Vue2"中的"data","methods"和"computed"等在"Vue3"都写在"setup"函数中
  // 但是"Vue3"兼容"Vue2"中的写法,也可以写"data"和"methods"配置项
  emits: ["upload"],
  // "setup"函数在"beforeCreate"生命周期函数之前,不能使用"this"
  setup: function (props, context) {
    // "props"是"Vue2"中父向子组件传递的属性,在"Vue3"中相同
    // "context"是包含了"attrs","emit"和"solts"属性,
    // "attrs"是组件未被声明接受但是传入的参数,"emit"是声明的自定义事件,
    // 在"Vue3"绑定自定义事件需要在"emits"配置项中声明(非必须),
    // "solts"是传入的虚拟DOM节点,也就是插槽

    // "ref"实现基本数据类型的响应式数据,这个数据会变成一个对象,类型为"RefImpl",
    // 其原型对象相当于"Vue2"中的"_data",其代理数据在对象的"value"属性中
    // 响应式的原理仍然是"Vue2"中的"Object.defineProperty(target, propName, { getter, setter })"
    // 如果希望对象的多个属性都变成响应式,那就需要一个一个写
    let name = ref("渣渣灰");
    let age = ref(18);
    let description = "是兄弟就来砍我";
    // 如果使用"ref"对对象实现响应式,其会被封装成"Proxy"对象,
    // 响应式的原理使用了"reactive"函数的原理
    let person = ref({
      name: "古天乐",
      age: 20,
      description: "打怪爆装备",
    });

    // "Vue3"中的"reactive"响应式原理借助了ES6新特性中的"Proxy"对象
    // "Proxy"对象可以检测到对象属性的增删改查且不需要每个属性都写一遍:
    // let work = { "name": "后端工程师", salary: "30k" };
    // const w = new Proxy(work, {
    // get(target, propName) {
    //  console.log("读取属性");
    //  return target[propName];
    // },
    // set(target, propName, value) {
    //    console.log("新增或者修改属性");
    //    target[propName] = value;
    // },
    //  deleteProperty(target, propName) {
    //    console.log("删除属性");
    //    return delte target[propName];
    // }
    // });
    //
    // 除此之外,"Vue3"中使用"Reflect"对对象进行增删查改的操作,
    // 同时如果操作失败(前面已经删除了属性),会返回"false".
    // 1.查: "Reflect.get(target, propName)";
    // 2.增改: "Reflect.set(target, propName, value)";
    // 3.删: "Reflect.deleteProperty(target, propName)".
    //
    // 结合上述两点:"Vue3"的响应式通过"Proxy"对象和"Reflect"对象实现:
    // let work = { "name": "后端工程师", salary: "30k" };
    // const w = new Proxy(work, {
    // get(target, propName) {
    //  console.log("读取属性");
    //  return Reflect.get(target, propName);
    // },
    // set(target, propName, value) {
    //    console.log("新增或者修改属性");
    //    Reflect.set(target, propName, value);
    // },
    //  deleteProperty(target, propName) {
    //    console.log("删除属性");
    //    return Reflect.deleteProperty(target, propName);
    // }
    // });
    let work = reactive({
      name: "后端工程师",
      salary: "30k",
    });

    function Greeting() {
      console.log("Hello, Vue3");
    }
    function ChangeName() {
      name.value = "李四";
      age.value = 20;
    }
    function ChangePerson() {
      (person.value.name = "传奇霸业CEO"), (person.value.age = 100);
    }
    function ChangeWork() {
      work.name = "全栈工程师";
      work.salary = "100k";
    }
    function AddCounts() {
      totalCounts.value += 1;
    }

    // 计算属性
    let me = reactive({ "xing": "", "ming": "" });
    me.name = computed({
        get() {
          return me.xing + "-" + me.ming;
        },
        set(value) {
          const array = value.split("-");
          me.xing = array[0];
          me.ming = array[1];
        }
    });
    // 简写形式:当计算属性不需要修改时,可以使用简写
    // me.name = computed(() => {
    //   return me.xing + "-" + me.ming;
    // });

    // 监视属性,监视多个参数时以数组的方式操作
    let totalCounts = ref(0);
    watch([totalCounts, age], (newValue, oldValue)=>{
      console.log(newValue, oldValue);
    }, {
      immediate: true,
      deep: true
    });
    // 监视"reactive"对象时,"Vue3"存在BUG
    // 无法正确获取"oldValue",且强制开启深度监视("deep"属性无法关闭)

    // 监视"reactive"对象中的某个数据时,需要写成函数
    // 例如监视"me.xing",需要写成"()=> me.xing"

    // 如果使用"ref"实现对象的响应式,监视的应该是对象的"value"值,而不是直接监视对象
    // 因为"ref"处理对象时借助了"reactive"的方法,其"value"是一个"Proxy"对象,
    // 更改对象的值仅仅是更改了"Proxy"中的值,而"value"是"Proxy"对象的地址,没有变化

    // "watchEffect"自动开启"immediate"属性
    // 它监视回调函数中所有用到的变量
    watchEffect(()=>{
      let temp = totalCounts.value;
      console.log("watchEffect调用了");
    });

    // "Vue3"中将"beforeCreate"和"created"两个合并成"setup"生命周期函数
    // 其他生命周期函数没有太大的改动,每个生命周期函数都有自己的"Composition API"

    // hooks
    let position = GetPosition();

    // "toRef"和"toRefs"函数
    // "toRef"返回对象中的某个属性的响应式对象
    // "toRefs"返回对象中所有属性的响应式对象
    let school = reactive({
      name: "家里蹲",
      address: "家里"
    });

    // "shallowRef"和"shallowReactive"函数
    // 仅对浅层次的数据进行响应式,对于"shallowRef"来说不会借助"reactive"的方法处理对象
    // 当确定对象的深层次属性不会发生变化或者整个被替换时,可以使用"shallowRef"和"shallowReactive"

    // "readonly"和"shallowReadonly"函数
    // 对数据进行深层或者浅层只读制约,区别于"const"
    // "const"修饰的变量地址不可变,而"readonly"处理的变量 值不可变

    // "toRaw"和"markRaw"函数
    // "toRaw"函数将"reactive"生成的响应式("ref"不行)对象变成普通对象
    // "markRaw"函数标记某个对象使其永远不会称为响应式对象

    // "customRef"函数:自定义规则,可玩性很大
    let keyword = myRef("Hello", 1000);
    function myRef(initValue, delay) {
      let timer = 0;
      return customRef((track, trigger)=>{
          return {
            get() {
              console.log(`读取数据${initValue}`);
              track();  // 追踪更新的数据
              return initValue;
            },
            set(newValue) {
              console.log(`更新数据${newValue}`);
              // 清楚定时器
              clearTimeout(timer);
              timer = setTimeout(() => {
                initValue = newValue;
                trigger();  // 通知"Vue"重新解析渲染模板
              }, delay);
            }
          }
      });
    }

    // "provide"和"inject"函数
    // 通过这两个可以实现父组件与后代组件的通信,相当于"Vue2"的全局事件总线;
    // "provide(key, value)"将名为"key"的数据传递给后代,"inject(key)"获取名为"key"的数据;
    // 一般在父组件和子组件之间使用"props"传递数据,而父组件和子组件的后代之间才使用"provide"和"inject"

    // "isRef","isReactive","isReadonly"和"isProxy"函数可以判断响应式数据,是否可改和是否是由"reactive"和"readonly"创建的代理对象

    // "defineAsyncComponent"异步引入组件,需要搭配"Suspense"标签
    // const child = defineAsyncComponent(()=>import("../xxx/xxx"));
    
    // "defineProps"和"defineEmits"
    // const props = defineProps({
    //  username: {
    //    type: String,
    //    default: 'zhangsan'
    //  },
    // });
    // 
    // 仅能在"srcipt-setup"中使用
    // const emit = defineEmits(['myEvent']);
    // emit('myEvent', 'zhangsan');
    // 
    // 需要在"emits"中定义一下事件名称
    // context.emit('upload', "image");

    return {
      name,
      age,
      description,
      person,
      work,
      me,
      ...toRefs(school),
      position,
      totalCounts,
      keyword,
      Greeting,
      ChangeName,
      ChangePerson,
      ChangeWork,
      AddCounts
    };
  },
  components: {},
};
</script>

<style></style>
