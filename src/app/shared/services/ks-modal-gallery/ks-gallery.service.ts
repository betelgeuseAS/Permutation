import { Injectable } from '@angular/core';

export interface KsOwnImage {
  data: string;
  alt?: string;
}

import {
  AdvancedLayout,
  Image,
  PlainGalleryConfig,
  PlainGalleryStrategy,
} from '@ks89/angular-modal-gallery';

@Injectable({
  providedIn: 'root'
})
export class KsGalleryService {

  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  private static getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }

  openImageModalRow(image: Image, images: Image[]) {
    const index: number = KsGalleryService.getCurrentIndexCustomLayout(image, images);
    this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(index, true) });
  }

  getImages(entities?: Array<KsOwnImage>): Image[] {
    return entities.map((item, index) => {
      if (item && item.data) {
        return new Image(
          index,
          {img: item.data, description: '', title: '', alt: item.alt, ariaLabel: ''}
        );
      }
    });
  }
}
