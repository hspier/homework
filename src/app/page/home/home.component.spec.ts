import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ContentModule } from './../../content/content.module';
import { StockModule } from './../../stock/stock.module';
import { SocialModule } from './../../social/social.module';
import { StocksService } from 'src/app/stock/stocks.service';
import { MockStocksService } from 'src/app/stock/mock-stocks.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ContentModule, StockModule, SocialModule],
      providers: [
        MockStocksService,
        {provide: StocksService, useExisting: MockStocksService}
      ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call stock service when criteria changes', fakeAsync(() => {
    fixture.componentInstance.onCriteriaChanged({
      symbol: 'TEST',
      period: 10
    });
    fixture.detectChanges();
    tick(2000);

    expect(fixture.componentInstance.prices).toBeDefined();
    expect(fixture.componentInstance.results).toBeDefined();
    expect(fixture.componentInstance.networks).toBeDefined();
  }));

  it('should call stock service when algorithm changes', fakeAsync(() => {
    fixture.componentInstance.onCriteriaChanged({
      symbol: 'TEST',
      period: 10
    });
    fixture.detectChanges();
    tick(2000);

    const recommendations = fixture.componentInstance.results;

    fixture.componentInstance.onAlgorithmChanged({
      id: 'default'
    });
    fixture.detectChanges();
    tick(1000);

    expect(fixture.componentInstance.results).not.toEqual(recommendations);
  }));
});
