import './styles.css';
import React, { useEffect, useState } from 'react';
import { ContentClient, Image } from 'dc-delivery-sdk-js';
import Banner from './Components/Banner';

const client = new ContentClient({
  hubName: 'ampengineering',
});

const deliveryKey = 'example-banner';

export default function App() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    async function fetchBanner() {
      const banner = await client.getContentItemByKey(deliveryKey);

      setBanner(banner.body);
    }

    fetchBanner();
  }, []);

  return <Banner {...banner} />;
}
