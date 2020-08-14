import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  private listeners = new Subject<any>();

  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  filter(filterBy: string) {
    this.listeners.next(filterBy);
  }
}
