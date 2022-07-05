import { Component, Input } from '@angular/core';
import { ContentBody, Image } from 'dc-delivery-sdk-js';

export interface Banner extends ContentBody {
  headline: string;
  strapline: string;
  background: {
    image: Image;
    alt: string;
  };
  link: {
    title: string;
    url: string;
  };
}
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  @Input() banner!: Banner;
}
