import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasComponent } from './medias.component';
import { MediaComponent } from '../media/media.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('MediasComponent', () => {
  let component: MediasComponent;
  let fixture: ComponentFixture<MediasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediasComponent, MediaComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title in a h2 tag', () => {
    const element = fixture.debugElement.query(By.css('.medias__title'));
    expect(element.nativeElement.tagName).toBe('H2');
    expect(element.nativeElement.textContent).toBe('Related Posts');
  });
});
