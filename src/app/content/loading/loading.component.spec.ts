import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { LoadingService } from '../loading.service';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an indicator when loading', fakeAsync(() => {
    let styles = window.getComputedStyle(fixture.debugElement.nativeElement);
    expect(styles.display).toBe('none');

    const service = TestBed.get(LoadingService);
    service.active.next(true);
    fixture.detectChanges();

    styles = window.getComputedStyle(fixture.debugElement.nativeElement);
    expect(styles.display).toBe('flex');

    service.active.next(false);
    fixture.detectChanges();
  }));
});
