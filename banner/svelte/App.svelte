<script>
  import Banner from './Banner.svelte';
  import { onMount } from 'svelte';
  import { ContentClient, Image } from 'dc-delivery-sdk-js';

  let banner = null;

  const client = new ContentClient({
    hubName: 'ampengineering',
  });

  const deliveryKey = 'example-banner';

  async function fetchBanner() {
    banner = await client.getContentItemByKey(deliveryKey);
    banner.body.image = new Image(banner.body.image)
      .url()
      .width(1200)
      .height(680)
      .build();
  }

  onMount(() => fetchBanner());
</script>

<main>
  {#if banner}
    <Banner {...banner.body} />
  {/if}
</main>
