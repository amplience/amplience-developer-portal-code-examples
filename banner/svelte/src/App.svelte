<script>
  import Banner from './Banner.svelte';
  import { onMount } from 'svelte';
  import { ContentClient } from 'dc-delivery-sdk-js';

  let banner = null;

  const client = new ContentClient({
    hubName: 'ampengineering',
  });

  const deliveryKey = 'example-banner';

  async function fetchBanner() {
    banner = await client.getContentItemByKey(deliveryKey);
  }

  onMount(() => fetchBanner());
</script>

<main>
  {#if banner}
    <Banner {...banner.body} />
  {/if}
</main>
