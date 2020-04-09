import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { getManager } from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

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
