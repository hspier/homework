import { Component, OnInit, Input, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '../loading.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @HostBinding('class.loading--active') loading: boolean;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private loadingService: LoadingService, private changeDetector: ChangeDetectorRef) {
    this.loadingService.active.pipe(takeUntil(this.unsubscribe)).subscribe((active: boolean) => {
      this.loading = active;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
