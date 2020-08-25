import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgGraphService {

  // Links:
  // https://swimlane.github.io/ngx-graph/
  // https://swimlane.github.io/ngx-graph/demos/examples#examples
  // https://www.npmjs.com/package/@swimlane/ngx-graph
  // https://stackblitz.com/edit/angular-edligh?file=src%2Fapp%2Fapp.component.ts

  getLayoutSettings(): object {
    return {
      orientation: 'TB'
    };
  }
}
