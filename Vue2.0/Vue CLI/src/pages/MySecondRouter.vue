<template>
  <div>
    我是第二个组件 <br/>
    <!-- 
      传递Query参数的第一种写法:
      <router-link :to="`/mySecondRouter/MyQueryChild?id=${id}&message=${message}`">点击展示带参(Query)路由</router-link>
      传递Query参数的第二种写法:
    -->
    <router-link :to="{ 
      // path: '/mySecondRouter/MyQueryChild',  // 注意这里不能用双引号
      name: 'queryLuyou',
      query: {
        id: this.id,
        message: this.message
      }
    }">
      点击展示带参(Query)路由
    </router-link>
    <!--
      传递Params参数的第一种写法:
      <router-link :to="/mySecondRouter/MyParamsChild/1/我是你爸爸">点击展示带参(Params)路由</router-link>
      传递Params参数的第二种写法:
    -->
    <router-link :to="{ 
      name: 'paramsLuyou',  // 这里只能使用"name"属性,不能使用"path"属性
      params: {
        id: this.id,
        message: this.message
      }
    }">
      点击展示带参(Params)路由
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MySecondRouter",
  // 路由"props"
  // props: ["id", "title"],
  data() {
    return {
      id: 1,
      message: "我是你爸爸"
    }
  },
  methods: {
    // 编程式路由
    // 通过"router-link"标签,其最后会解析为"a"标签,
    // 但是有的时候需要其他标签进行操作,比如:"button",
    // 因此需要一些主动的方法进行路由配置
    // 以"push"方式存储历史记录
    PushStorage() {
      // 参数与"router-link"标签中的"to"属性一样
      this.$router.push({ 
        // path: '/mySecondRouter/MyQueryChild',
        name: 'queryLuyou',
        query: {
          id: this.id,
          message: this.message
        }
      });
    },
    // 将"replace"方式存储历史记录
    ReplaceStorage() {
      this.$router.replace({ 
        // path: '/mySecondRouter/MyQueryChild',
        name: 'queryLuyou',
        query: {
          id: this.id,
          message: this.message
        }
      });
    },
    // 历史记录向前1次
    Forward() {
      this.router.forward();
    },
    // 历史记录后退1次
    Back() {
      this.$router.back();
    },
    // 历史记录前进或后退指定次数
    Go() {
      this.$router.go(2);
      this.$router.go(-2);
    }
  }
};
</script>

<style></style>
