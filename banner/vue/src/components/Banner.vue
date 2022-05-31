<template>
  <div class="banner-container">
    <div class="banner-content">
      <h1 class="banner-title">{{ banner.bannerTitle }}</h1>
      <h2 class="banner-subtitle">{{ banner.bannerSubtitle }}</h2>
    </div>
    <img
      :src="banner.bannerImage"
      alt="background"
      class="banner-background-image"
    />
    <a :href="banner.linkUrl" class="link">
      {{ banner.linkTitle }}
    </a>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    banner: Object,
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto);

.banner-container {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  position: relative;
  width: 100%;
}

.banner-title {
  font-size: 30px;
}

.banner-content {
  position: absolute;
  top: 20px;
  width: 100%;
  padding: 0 20px;
  text-align: left;
  color: white;
}

.banner-background-image {
  width: 100%;
  height: auto;
}

.link {
  position: absolute;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  right: 20px;
  padding: 10px;
  text-decoration: none;
}

.link:hover {
  background-color: rgba(0, 0, 0, 1);
}
</style>
