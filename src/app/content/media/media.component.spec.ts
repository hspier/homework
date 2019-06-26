import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaComponent } from './media.component';
import { FormsModule } from '@angular/forms';
import { SocialModule } from './../../social/social.module';
import { NetworksService } from 'src/app/social/networks.service';
import { of } from 'rxjs';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaComponent ],
      imports: [FormsModule, SocialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request posts when changing post count', () => {
    const service = TestBed.get(NetworksService);
    const spy = spyOn(service, 'getPosts').and.returnValue(of([]));

    fixture.componentInstance.network = service.list()[0];
    fixture.componentInstance.onPostsCountChanged(5);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(fixture.componentInstance.network.id, 5);
  });
});
