<template>
  <div>
  我是传参路由
    <div>
        消息序号:{{ $route.params.id }}, 消息内容: {{ $route.params.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MyParamsChild",
  mounted() {
      console.log(this.$route);
  }
};
</script>

<style></style>
