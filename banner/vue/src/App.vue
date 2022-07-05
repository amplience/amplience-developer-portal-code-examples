<template>
  <Banner v-if="banner" v-bind="banner" />
</template>

<script>
import { ContentClient } from 'dc-delivery-sdk-js';
import BannerVue from './components/Banner.vue';
export default {
  name: 'App',
  components: {
    Banner: BannerVue,
  },
  async created() {
    await this.fetchBanner();
  },
  data: function () {
    return {
      client: new ContentClient({ hubName: 'ampengineering' }),
      deliveryKey: 'banner-example',
      banner: null,
    };
  },
  methods: {
    async fetchBanner() {
      const { body } = await this.client.getContentItemByKey(this.deliveryKey);
      this.banner = body;
    },
  },
};
</script>
