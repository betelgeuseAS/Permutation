import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { getManager } from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  // HTML:
  // <ul cdkDropList (cdkDropListDropped)="dragDropEntities($event)">
  //   <li *ngFor="let item of items" cdkDrag>
  //     <h3>Header</h3>
  //     <div cdkDragHandle>Drag</div>
  //   <li>
  // </ul>

  // JS:
  // import { CdkDragDrop } from '@angular/cdk/drag-drop';
  // constructor(
  //   private dragAndDropService: DragAndDropService
  // ) {}
  // dragDropEntities(event: CdkDragDrop<string[]>) {
  //   this.dragAndDropService.dragDropEntities(event, this.books);
  // }
  // dragDropEntities(event: CdkDragDrop<string[]>) {
  //   this.dragAndDropService.dragDropEntities(event, this.heroes);
  // }

  dragDropEntities(event: CdkDragDrop<string[]>, entities) {
    moveItemInArray(entities, event.previousIndex, event.currentIndex);

    entities.forEach((book, index) => {
      book.position = index;
    });

    try {
      const entityManager = getManager();
      entityManager.save(entities);
    } catch (e) {
      console.log(e);
    }
  }
}
