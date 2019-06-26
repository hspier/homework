import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from '../loading.service';
import { DefaultAlgorithmComponent } from './default-algorithm/default-algorithm.component';
import { CustomAlgorithmComponent } from './custom-algorithm/custom-algorithm.component';
import { By } from '@angular/platform-browser';
import { Recommendation } from 'src/app/stock/stocks.service';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ResultsComponent, LoadingComponent, DefaultAlgorithmComponent, CustomAlgorithmComponent ],
      providers: [LoadingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title in a h2 tag', () => {
    fixture.componentInstance.stockResults = [];
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.header__title'));
    expect(element.nativeElement.tagName).toBe('H2');
    expect(element.nativeElement.textContent).toBe('Recommendations');
  });
});
