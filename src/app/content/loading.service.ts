import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnDestroy {
  active: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnDestroy(): void {
    this.active.complete();
  }
}
