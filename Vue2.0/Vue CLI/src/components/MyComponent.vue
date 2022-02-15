<template>
  <div>
    <h1>我是 {{ name }}</h1>
    <h1>今年 {{ age }}</h1>
    <h1>{{ description }}</h1>
    <button @click="SelfIntroduction">自我介绍</button>
    <!-- 定义插槽,插槽命名,向父组件传递组件中的值 -->
    <slot name="demo" :me="me">当没有结构传入时,我会出现</slot>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
export default {
  name: "MyComponent",
  data() {
      return {
          introduction: `我是${this.name},今年${this.age},${this.description}`,
          me: {
            name: this.name,
            age: this.age,
            description: this.description
          }
      }
  },
  /*
    1.外部传入的值存在VueComponent实例对象中,可以使用"this"访问
    2.外部传入的属性值不允许修改,如果存在修改的需求,可以重新定义属性且使用"this"访问外部传入的值
    3.语法:
        props: ["name", "age", "description"]
        props: {
            name: String,
            age: Number,
            description: String
        }
   */
  props: {
    name: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      default: 18,
    },
    description: {
      type: String,
    },
  },
  methods: {
    // 可以类比按钮的"click"事件,按钮被绑定了事件,那么其一定会在按钮身上触发事件
      SelfIntroduction() {
          this.$emit("myEvent", this.introduction);
          // 解绑事件
          this.$off(["myEvent"]);  // 解绑多个自定义事件
          // this.$off();  // 解绑所有自定义事件
      }
  },
  mounted() {
      // 使用全局事件总线传递数据
      //   this.$bus.$on("busEvent", (data)=>{
      //     console.log(data);
      //   });
      // 订阅消息
      this.subId = pubsub.subscribe("messageEvent", (messageName, data) => {
          console.log(`消息的名称为${messageName},其数据是${data}`);
          // 注意这里推荐使用箭头函数的语法,因为通常情况下,函数需要将数据读或写入VueComponent中
          // 而如果使用"function"函数的写法,那么"this"是"undefined"
      })
  },
  beforeDestroy() {
      // 全局事件总线如果不需要某个事件了,最好释放
      // this.$bus.$off("busEvent");
      // 取消消息订阅
      pubsub.unsubscribe("messageEvent");
  },
};
</script>

<style></style>
