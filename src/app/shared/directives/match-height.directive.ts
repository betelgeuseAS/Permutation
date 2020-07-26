import {
  Directive, ElementRef, AfterViewChecked,
  Input, HostListener
} from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

  // HTML:
  // <div appMatchHeight="card">
  //   <div class="card">
  //     <></>
  //   </div>
  //
  //   <div class="card">
  //     <></>
  //   </div>
  //
  //   <div class="card">
  //     <></>
  //   </div>
  // </div>

  @Input() appMatchHeight: string;

  constructor(private el: ElementRef) {}

  ngAfterViewChecked() {
    this.matchHeight(this.el.nativeElement, this.appMatchHeight);
  }

  @HostListener('window:resize')
  onResize() {
    this.matchHeight(this.el.nativeElement, this.appMatchHeight);
  }

  matchHeight(parent: HTMLElement, className: string) {
    if (!parent) {
      return;
    }

    const children = parent.getElementsByClassName(className);

    if (!children) {
      return;
    }

    // reset all children height
    Array.from(children).forEach((x: HTMLElement) => {
      x.style.height = 'initial';
    });

    // gather all height
    const itemHeights = Array.from(children)
      .map(x => x.getBoundingClientRect().height);

    // find max height
    const maxHeight = itemHeights.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    }, 0);

    console.log(maxHeight);
    // apply max height
    Array.from(children)
      .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);
  }
}
