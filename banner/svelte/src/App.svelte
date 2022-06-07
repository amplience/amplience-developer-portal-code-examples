<script>
  import Banner from './Banner.svelte';
  import { onMount } from 'svelte';
  import { ContentClient } from 'dc-delivery-sdk-js';

  let banner = null;

  const client = new ContentClient({
    hubName: 'ampengineering',
  });

  const deliveryKey = 'banner-example';

  onMount(async () => {
    const { body } = await client.getContentItemByKey(deliveryKey);
    banner = body;
  });
</script>

<main>
  {#if banner}
    <Banner {...banner} />
  {/if}
</main>
