import { Component, OnInit } from '@angular/core';
import { ContentClient } from 'dc-delivery-sdk-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  banner: any;
  deliveryKey = 'example-banner';
  client = new ContentClient({
    hubName: 'ampengineering',
  });

  ngOnInit() {
    this.fetchBanner();
  }

  async fetchBanner() {
    this.client.getContentItemByKey(this.deliveryKey).then(({ body }) => {
      this.banner = body;
    });
  }
}
