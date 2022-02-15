<template>
  <div>
  我是传参路由
    <div>
        消息序号:{{ $route.query.id }}, 消息内容: {{ $route.query.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MyQueryChild",
  mounted() {
      console.log(this.$route);
  }
};
</script>

<style></style>
