<template>
  <Banner v-if="banner" :banner="banner" />
</template>

<script type='module'>
import { ContentClient, Image } from "dc-delivery-sdk-js";
import BannerVue from "./components/Banner.vue";
export default {
  name: "App",
  components: {
    Banner: BannerVue,
  },
  async created() {
    await this.fetchBanner();
  },
  data: function () {
    return {
      client: new ContentClient({ hubName: "ampengineering" }),
      deliveryKey: "example-banner",
      banner: null,
    };
  },
  methods: {
    async fetchBanner() {
      this.banner = await this.client.getContentItemByKey(this.deliveryKey);

      this.banner.body.bannerImage = new Image(this.banner.body.bannerImage)
        .url()
        .width(1200)
        .height(680)
        .build();

      this.banner = this.banner.body;
    },
  },
};
</script>

<style>
</style>
