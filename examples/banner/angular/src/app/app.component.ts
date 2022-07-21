import { Component, OnInit } from '@angular/core';
import { ContentClient } from 'dc-delivery-sdk-js';
import { Banner } from 'src/banner/banner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  banner?: Banner;
  deliveryKey = 'banner-example';
  client = new ContentClient({
    hubName: 'ampengineering',
  });

  async ngOnInit() {
    const { body } = await this.client.getContentItemByKey<Banner>(
      this.deliveryKey
    );
    this.banner = body;
  }
}
