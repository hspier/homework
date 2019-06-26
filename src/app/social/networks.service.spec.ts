import { TestBed } from '@angular/core/testing';

import { NetworksService } from './networks.service';
import { SocialModule } from './social.module';

describe('NetworksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SocialModule]
  }));

  it('should be created', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    expect(service).toBeTruthy();
  });

  it('should list registered social networks', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    expect(service.list()).toBeDefined();
  });

  it('should deactivate a network', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    const list = service.list();
    service.deactivate(list[0].id);
    expect(list[0].active).toBeFalsy();
    expect(service.isActive(list[0].id)).toBeFalsy();
  });

  it('should activate a network', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    const list = service.list();
    list[0].active  = false;
    service.activate(list[0].id);
    expect(list[0].active).toBeTruthy();
    expect(service.isActive(list[0].id)).toBeTruthy();
  });

  it('should request posts', () => {
    const service: NetworksService = TestBed.get(NetworksService);
    const list = service.list();
    expect(service.getPosts(list[0].id, 2)).toBeDefined();
  });
});
