import { Injectable } from '@angular/core';

import {
  AdvancedLayout, ButtonsConfig, ButtonsStrategy,
  Image,
  KS_DEFAULT_BTN_CLOSE, KS_DEFAULT_BTN_DELETE, KS_DEFAULT_BTN_DOWNLOAD, KS_DEFAULT_BTN_EXTURL, KS_DEFAULT_BTN_FULL_SCREEN,
  PlainGalleryConfig,
  PlainGalleryStrategy,
} from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../data-access/entities/image-hero.entity';

@Injectable({
  providedIn: 'root'
})
export class KsGalleryService {

  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  buttonsConfigFull: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.FULL
  };

  buttonsConfigCustom: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      // KS_DEFAULT_BTN_ROTATE,
      KS_DEFAULT_BTN_FULL_SCREEN,
      KS_DEFAULT_BTN_DELETE,
      // KS_DEFAULT_BTN_EXTURL,
      // KS_DEFAULT_BTN_DOWNLOAD,
      KS_DEFAULT_BTN_CLOSE
    ]
  };

  private static getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }

  openImageModalRow(image: Image, images: Image[]) {
    const index: number = KsGalleryService.getCurrentIndexCustomLayout(image, images);
    this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(index, true) });
  }

  getImages(entities?: ImageHero[]): Image[] {
    return entities.map((item, index) => {
      if (item && item.data) {
        return new Image(
          item.id,
          {img: item.data, description: '', title: item.name, alt: '', ariaLabel: ''}
        );
      }
    });
  }
}
