<script>
  import Banner from './Banner.svelte';
  import { ContentClient } from 'dc-delivery-sdk-js';

  const client = new ContentClient({
    hubName: 'ampengineering',
  });
</script>

<main>
  {#await client.getContentItemByKey('banner-example') then content}
    <Banner {...content.body} />
  {/await}
</main>
