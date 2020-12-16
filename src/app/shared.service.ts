import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private search = new BehaviorSubject('');
  lastSearch = this.search.asObservable();

  constructor() { }

  nextMessage(message: string) {
    this.search.next(message)
  }

}

