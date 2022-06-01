<template>
  <section>
    <header>
      <h1>{{ banner.title }}</h1>
      <h2>{{ banner.subtitle }}</h2>
    </header>
    <img :src="banner.image.url().width(1200).height(680).build()" alt="" />
    <a :href="banner.link.url">
      {{ banner.link.title }}
    </a>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    banner: Object,
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto);
section {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  position: relative;
  width: 100%;
}
h1 {
  font-size: 30px;
}
header {
  position: absolute;
  top: 20px;
  width: 100%;
  padding: 0 20px;
  text-align: left;
  color: white;
}
img {
  width: 100%;
  height: auto;
}
a {
  position: absolute;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  right: 20px;
  padding: 10px;
  text-decoration: none;
}
a:hover {
  background-color: rgba(0, 0, 0, 1);
}
</style>
