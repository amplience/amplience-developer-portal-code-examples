<script>
  import Banner from './Banner.svelte';
  import { ContentClient } from 'dc-delivery-sdk-js';

  const client = new ContentClient({
    hubName: 'ampengineering',
  });
</script>

<main>
  {#await client.getContentItemByKey('banner-example') then { body: banner }}
    <Banner {...banner} />
  {/await}
</main>
