import { Injectable } from '@angular/core';

import {
  AdvancedLayout, ButtonsConfig, ButtonsStrategy, Description, DescriptionStrategy,
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

  // https://www.npmjs.com/package/@ks89/angular-modal-gallery#table-of-contents
  // https://ks89.github.io/angular-modal-gallery-2018-v7.github.io/

  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  ModalGalleryComponent: ButtonsConfig = {
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

  customFullDescription: Description = {
    strategy: DescriptionStrategy.ALWAYS_VISIBLE,
    // customFullDescription: '',
    imageText: '', // default is 'Image'
    // numberSeparator: '/', // default is '/'
    // beforeTextDescription: '', // default is ' - '
    style: {
      bgColor: 'transparent',
      textColor: 'white',
      // marginTop: '1px',
      // marginBottom: '1px',
      // marginLeft: '1px',
      // marginRight: '1px',
      position: 'absolute',
      bottom: '-40px',
      // height: '125px'
    }
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
