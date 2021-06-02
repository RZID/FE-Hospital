<template>
  <div class="bg-red h-navbar">
    <div
      class="container d-flex h-100 w-100 align-items-center justify-content-center justify-content-md-start"
    >
      <h4 class="text-white mb-0">{{ title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
    };
  },
};
</script>

<style scoped>
.bg-red {
  background-color: rgb(88, 1, 1);
}
.h-navbar {
  height: 55px;
}
</style>
