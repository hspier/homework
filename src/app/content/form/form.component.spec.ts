import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';
import { SocialModule } from './../../social/social.module';
import { NetworksService } from 'src/app/social/networks.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [FormsModule, SocialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce search', fakeAsync(() => {
    fixture.componentInstance.onSymbolModelChanged('TEST');
    fixture.detectChanges();
    tick();

    const spy = spyOn(fixture.componentInstance.criteriaChange, 'emit');
    expect(fixture.componentInstance.symbol).toBe('TEST');
    expect(spy).not.toHaveBeenCalled();

    tick(1200);
    expect(spy).toHaveBeenCalled();
  }));

  it('should search instantly when pressing enter', fakeAsync(() => {
    fixture.componentInstance.onSymbolModelChanged('TEST');
    fixture.detectChanges();
    tick();

    const spy = spyOn(fixture.componentInstance.criteriaChange, 'emit');
    expect(fixture.componentInstance.symbol).toBe('TEST');
    fixture.componentInstance.onSymbolEnterPressed();
    expect(spy).toHaveBeenCalled();
  }));

  it('should limit time period between 1 and 999', () => {
    fixture.componentInstance.onTimePeriodModelChanged(-1);
    expect(fixture.componentInstance.timePeriod).toBe(1);
    fixture.componentInstance.onTimePeriodModelChanged(1000);
    expect(fixture.componentInstance.timePeriod).toBe(999);
  });

  it('should deactivate social network when active', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    const spy = spyOn(service, 'deactivate');

    fixture.componentInstance.onMediaClicked(fixture.componentInstance.networksInformation[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('should activate social network when unactive', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    const spy = spyOn(service, 'activate');

    fixture.componentInstance.onMediaClicked(fixture.componentInstance.networksInformation[0]);
    fixture.componentInstance.onMediaClicked(fixture.componentInstance.networksInformation[0]);
    expect(spy).toHaveBeenCalled();
  });
});
