/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import { Component } from '@angular/core';

import {
  AccessibilityConfig,
  CarouselConfig,
  CarouselImageConfig, CarouselPreviewConfig,
  DotsConfig,
  Image,
  ImageEvent,
  PlayConfig
} from '@ks89/angular-modal-gallery';

@Component({
  selector: 'ks-carousel-page',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss']
})
export class CarouselComponent {

  // Carousel: https://ks89.github.io/angular-modal-gallery-2018-v7.github.io/features/carousel
  // Project src/app/carousel https://github.com/Ks89/angular-modal-gallery

  // HTML:
  // <ks-carousel
  //   [id]="0" - required; type: number
  //   [images]="images" - required; type: Image[]
  //   [carouselConfig]="{}" - optional; type: CarouselConfig
  //   [playConfig]="{}" - optional; type: PlayConfig
  //   [carouselImageConfig]="{}" - optional; type: CarouselImageConfig
  //   [dotsConfig]="{}" - optional; type: DotsConfig
  //   [previewConfig]="{}" - optional; type: CarouselPreviewConfig
  //   [infinite]="true" - optional; type: boolean
  //   [accessibilityConfig]="{}" - optional; type: AccessibilityConfig
  //   (show)="this.onShow($event)"
  //   (firstImage)="this.onFirstImage($event)"
  //   (lastImage)="this.onLastImage($event)"></ks-carousel>
  // >
  //   <div class="projected">This is my projected book-content!</div>
  // </ks-carousel>

  imageIndex = 1;
  galleryId = 1;
  autoPlay = true;
  showArrows = true;
  showDots = true;

  imagesRect: Image[] = [
    new Image(
      0,
      {
        img: '/assets/images/gallery/milan-pegasus-gallery-statue.jpg',
        description: 'Description 1'
      },
      {
        img: '/assets/images/gallery/thumbs/t-milan-pegasus-gallery-statue.jpg',
        title: 'First image title',
        alt: 'First image alt',
        ariaLabel: 'First image aria-label'
      }
    ),
    new Image(1, { img: '/assets/images/gallery/pexels-photo-47223.jpeg' }, { img: '/assets/images/gallery/thumbs/t-pexels-photo-47223.jpg' }),
    new Image(
      2,
      {
        img: '/assets/images/gallery/pexels-photo-52062.jpeg',
        description: 'Description 3',
        title: 'Third image title',
        alt: 'Third image alt',
        ariaLabel: 'Third image aria-label'
      },
      {
        img: '/assets/images/gallery/thumbs/t-pexels-photo-52062.jpg',
        description: 'Description 3'
      }
    ),
    new Image(
      3,
      {
        img: '/assets/images/gallery/pexels-photo-66943.jpeg',
        description: 'Description 4',
        title: 'Fourth image title (modal obj)',
        alt: 'Fourth image alt (modal obj)',
        ariaLabel: 'Fourth image aria-label (modal obj)'
      },
      {
        img: '/assets/images/gallery/thumbs/t-pexels-photo-66943.jpg',
        title: 'Fourth image title (plain obj)',
        alt: 'Fourth image alt (plain obj)',
        ariaLabel: 'Fourth image aria-label (plain obj)'
      }
    ),
    new Image(4, { img: '/assets/images/gallery/pexels-photo-93750.jpeg' }, { img: '/assets/images/gallery/thumbs/t-pexels-photo-93750.jpg' }),
    new Image(
      5,
      {
        img: '/assets/images/gallery/pexels-photo-94420.jpeg',
        description: 'Description 6'
      },
      { img: '/assets/images/gallery/thumbs/t-pexels-photo-94420.jpg' }
    ),
    new Image(6, { img: '/assets/images/gallery/pexels-photo-96947.jpeg' }, { img: '/assets/images/gallery/thumbs/t-pexels-photo-96947.jpg' })
  ];

  accessibilityConfig: AccessibilityConfig = {
    backgroundAriaLabel: 'CUSTOM Modal gallery full screen background',
    backgroundTitle: 'CUSTOM background title',

    plainGalleryContentAriaLabel: 'CUSTOM Plain gallery book-content',
    plainGalleryContentTitle: 'CUSTOM plain gallery book-content title',

    modalGalleryContentAriaLabel: 'CUSTOM Modal gallery book-content',
    modalGalleryContentTitle: 'CUSTOM modal gallery book-content title',

    loadingSpinnerAriaLabel: 'CUSTOM The current image is loading. Please be patient.',
    loadingSpinnerTitle: 'CUSTOM The current image is loading. Please be patient.',

    mainContainerAriaLabel: 'CUSTOM Current image and navigation',
    mainContainerTitle: 'CUSTOM main container title',
    mainPrevImageAriaLabel: 'CUSTOM Previous image',
    mainPrevImageTitle: 'CUSTOM Previous image',
    mainNextImageAriaLabel: 'CUSTOM Next image',
    mainNextImageTitle: 'CUSTOM Next image',

    dotsContainerAriaLabel: 'CUSTOM Image navigation dots',
    dotsContainerTitle: 'CUSTOM dots container title',
    dotAriaLabel: 'CUSTOM Navigate to image number',

    previewsContainerAriaLabel: 'CUSTOM Image previews',
    previewsContainerTitle: 'CUSTOM previews title',
    previewScrollPrevAriaLabel: 'CUSTOM Scroll previous previews',
    previewScrollPrevTitle: 'CUSTOM Scroll previous previews',
    previewScrollNextAriaLabel: 'CUSTOM Scroll next previews',
    previewScrollNextTitle: 'CUSTOM Scroll next previews',

    carouselContainerAriaLabel: 'Current image and navigation',
    carouselContainerTitle: '',
    carouselPrevImageAriaLabel: 'Previous image',
    carouselPrevImageTitle: 'Previous image',
    carouselNextImageAriaLabel: 'Next image',
    carouselNextImageTitle: 'Next image',
    carouselPreviewsContainerAriaLabel: 'Image previews',
    carouselPreviewsContainerTitle: '',
    carouselPreviewScrollPrevAriaLabel: 'Scroll previous previews',
    carouselPreviewScrollPrevTitle: 'Scroll previous previews',
    carouselPreviewScrollNextAriaLabel: 'Scroll next previews',
    carouselPreviewScrollNextTitle: 'Scroll next previews'
  };

  addRandomImage() {
    const imageToCopy: Image = this.imagesRect[Math.floor(Math.random() * this.imagesRect.length)];
    const newImage: Image = new Image(this.imagesRect.length - 1 + 1, imageToCopy.modal, imageToCopy.plain);
    this.imagesRect = [...this.imagesRect, newImage];
  }

  onChangeAutoPlay() {
    this.autoPlay = !this.autoPlay;
  }

  onChangeShowArrows() {
    this.showArrows = !this.showArrows;
  }

  onChangeShowDots() {
    this.showDots = !this.showDots;
  }

  // output evets
  onShow(event: ImageEvent) {
    console.log('show', event);
  }

  onFirstImage(event: ImageEvent) {
    console.log('firstImage', event);
  }

  onLastImage(event: ImageEvent) {
    console.log('lastImage', event);
  }
}
