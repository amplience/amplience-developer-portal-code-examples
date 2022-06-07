import { Component, OnInit } from '@angular/core';
import { ContentClient } from 'dc-delivery-sdk-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  banner: any;
  deliveryKey = 'banner-example';
  client = new ContentClient({
    hubName: 'ampengineering',
  });

  async ngOnInit() {
    const { body } = await this.client.getContentItemByKey(this.deliveryKey);
    this.banner = body;
  }
}
