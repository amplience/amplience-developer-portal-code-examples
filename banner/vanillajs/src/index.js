import './styles.css';
import { ContentClient } from 'dc-delivery-sdk-js';

const deliveryKey = 'example-banner';
const client = new ContentClient({
  hubName: 'ampengineering',
});

fetchBanner().then(response => renderBanner(response.body));

async function fetchBanner() {
  return await client.getContentItemByKey(deliveryKey);
}

function renderBanner(banner) {
  if (!banner) {
    return;
  }
  const { title, subtitle, image, link } = banner;
  const template = `
    <section class="banner">
      <header>
        <h1>${title}</h1>
        <h2>${subtitle}</h2>
      </header>
      <img
        src="${image.url().width(1200).height(680).build()}"
        alt="" 
      />
      <a href=${link.url}>
      ${link.title}
      </a>
    </section>
  `;
  document.getElementById('app').innerHTML = template;
}
